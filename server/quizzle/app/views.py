from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from .models import CreatorModel, AttendeeModel
from .models import QuizModel, QuestionModel
from .models import AnswerModel

from .serializer import RegisterCreatorSerializer, RegisterAttendeeSerializer, LoginSerializer
from .serializer import CreateQuizSerializer, QuizSerializer
from .serializer import AnsweredQuizSerializer, GetAnsweredQuizSerializer

#----------------------------------------------------#
#-------------------- USER VIEWS --------------------#
#----------------------------------------------------#

@method_decorator(csrf_exempt, name='dispatch')
class RegisterView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        if request.data.get("type") is None:
            return Response({ "error": "User Type Must Be Provided" }, status=status.HTTP_400_BAD_REQUEST)
        
        if request.data.get("type") not in ["CREATOR", "ATTENDEE"]:
            return Response({ "error": "User Type Is Invalid" }, status=status.HTTP_400_BAD_REQUEST)
        
        if request.data.get("type") == "CREATOR":
            user = RegisterCreatorSerializer(data=request.data)
        
        if request.data.get("type") == "ATTENDEE":
            user = RegisterAttendeeSerializer(data=request.data)
        
        if user.is_valid() == False:
            return Response(user.errors, status=status.HTTP_400_BAD_REQUEST)
        
        if request.data.get("confirmPassword") is None:
            return Response({ "error": "Confirm Password Must Be Provided" }, status=status.HTTP_400_BAD_REQUEST)
        
        if request.data.get("password") != request.data.get("confirmPassword"):
            return Response({ "error": "Passwords Do Not Match" }, status=status.HTTP_400_BAD_REQUEST)
       
        user.save()
        
        return Response({
            "type": request.data.get("type"),
            "name": request.data.get("name"),
            "email": request.data.get("email"),
            "mobile": request.data.get("mobile"),    
        }, status=status.HTTP_201_CREATED)
    
class LoginView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        if request.data.get("type") is None:
            return Response({ "error": "User Type Must Be Provided" }, status=status.HTTP_400_BAD_REQUEST)
        
        if request.data.get("type") not in ["CREATOR", "ATTENDEE"]:
            return Response({ "error": "User Type Is Invalid" }, status=status.HTTP_400_BAD_REQUEST)
        
        user = LoginSerializer(data=request.data)

        if not user.is_valid():
            return Response(user.errors, status=status.HTTP_400_BAD_REQUEST)
        
        email = request.data.get("email")
        password = request.data.get("password")
        
        try:
            if request.data.get("type") == "CREATOR":
                db_user = CreatorModel.objects.get(email=email)
            
            if request.data.get("type") == "ATTENDEE":
                db_user = AttendeeModel.objects.get(email=email)
        except CreatorModel.DoesNotExist or AttendeeModel.DoesNotExist:
            return Response({ "error": "User With Given Email Address Does Not Exist" }, status=status.HTTP_400_BAD_REQUEST)

        if password != db_user.password:
            return Response({ "error": "Password Is Incorrect" }, status=status.HTTP_400_BAD_REQUEST)
        
        return Response({
            "type": request.data.get("type"),
            "name": db_user.name,
            "email": db_user.email,
            "mobile": db_user.mobile,
        }, status=status.HTTP_200_OK)

#----------------------------------------------------#
#-------------------- QUIZ VIEWS --------------------#
#----------------------------------------------------#
            
class QuizView(APIView):
    def get(self, request):
        db_quizzes = QuizModel.objects.all()
        quizzes = QuizSerializer(db_quizzes, many=True)
        return Response(quizzes.data, status=status.HTTP_200_OK) 
    
    def post(self, request):
        creator_id = request.data.get("creatorID")
        
        try:
            creator = CreatorModel.objects.get(id=creator_id)
            
            quiz_data = request.data.copy()
            quiz_data["creator_id"] = creator.id
            
            quiz = CreateQuizSerializer(data=quiz_data)

            if quiz.is_valid() == False:
                return Response({ "error": quiz.errors }, status.HTTP_400_BAD_REQUEST)
            
            quiz.save()
            
            return Response(quiz.data, status=status.HTTP_201_CREATED)
        
        except CreatorModel.DoesNotExist:
            return Response({ "error": "Creator Does Not Exist" }, status=status.HTTP_404_NOT_FOUND)

#--------------------------------------------------------#
#-------------------- ANSWERED VIEWS --------------------#
#--------------------------------------------------------#
    
class AnswerQuizView(APIView):
    def get(self, request, id):
        answered_quizzes = None

        if str(id).startswith("QID"):
            answered_quizzes = AnswerModel.objects.filter(quiz_id=id)

        if str(id).startswith("AID"):
            answered_quizzes = AnswerModel.objects.filter(attendee_id=id)

        if answered_quizzes is None:
            return Response({ "error": "Invalid ID Provided" }, status=status.HTTP_400_BAD_REQUEST)

        if not answered_quizzes.exists():
            return Response({ "error": "No Quizzes Found" }, status=status.HTTP_404_NOT_FOUND)

        serialized_quizzes = GetAnsweredQuizSerializer(answered_quizzes, many=True)

        return Response(serialized_quizzes.data, status=status.HTTP_200_OK)
    
    def post(self, request, id):
        name = request.data.get('name')
        questions = request.data.get('questions')
        
        try:
            db_quiz = QuizModel.objects.get(id=id)
        except QuizModel.DoesNotExist:
            return Response({ "error": "Quiz Not Found" }, status=status.HTTP_404_NOT_FOUND)
        
        try:
            db_attendee = AttendeeModel.objects.get(id=request.data.get("attendeeID"))
        except AttendeeModel.DoesNotExist:
            return Response({ "error": "Attendee Does Not Exist" }, status=status.HTTP_404_NOT_FOUND)
        
        db_questions = QuestionModel.objects.filter(quiz=db_quiz)
            
        if len(questions) != len(db_questions):
            return Response({ "error": "Number Of Questions Mismatch" }, status=status.HTTP_400_BAD_REQUEST)
        
        answered_questions = []
        total_points = 0

        for index, question in enumerate(questions):
            db_question = db_questions[index]
            
            total_points += question['points']

            answered_questions.append({
                "question": db_question.question,
                "correct": db_question.correct,
                "selected": question["selected"],
                "points": question["points"] if db_question.correct == question["selected"] else 0
            })

        quiz_answer_data = {
            "quiz_id": db_quiz.id,
            "attendee_id": db_attendee.id,
            "title": db_quiz.title,
            "name": name,
            "points": total_points,
            "questions": answered_questions
        }

        db_quiz = AnsweredQuizSerializer(data=quiz_answer_data)
        
        if not db_quiz.is_valid():
            return Response(db_quiz.errors, status=status.HTTP_400_BAD_REQUEST)
        
        db_quiz.save()
        
        return Response(db_quiz.data, status=status.HTTP_201_CREATED)

        
            
        