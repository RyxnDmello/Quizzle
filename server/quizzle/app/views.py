from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from .models import Creator, Attendee
from .models import Quiz, Question
from .models import Answer

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
            user_serializer = RegisterCreatorSerializer(data=request.data)
        
        elif request.data.get("type") == "ATTENDEE":
            user_serializer = RegisterAttendeeSerializer(data=request.data)
        
        if not user_serializer.is_valid():
            return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        if request.data.get("confirmPassword") is None:
            return Response({ "error": "Confirm Password Must Be Provided" }, status=status.HTTP_400_BAD_REQUEST)
        
        if request.data.get("password") != request.data.get("confirmPassword"):
            return Response({ "error": "Passwords Do Not Match" }, status=status.HTTP_400_BAD_REQUEST)
       
        user_serializer.save()
        
        return Response(user_serializer.data, status=status.HTTP_201_CREATED)
    
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
                db_user = Creator.objects.get(email=email)
                serializer = RegisterCreatorSerializer(db_user)
                
            elif request.data.get("type") == "ATTENDEE":
                db_user = Attendee.objects.get(email=email)
                serializer = RegisterAttendeeSerializer(db_user)

        except (Creator.DoesNotExist, Attendee.DoesNotExist):
            return Response({ "error": "User With Given Email Address Does Not Exist" }, status=status.HTTP_400_BAD_REQUEST)

        if password != db_user.password:
            return Response({ "error": "Password Is Incorrect" }, status=status.HTTP_400_BAD_REQUEST)
        
        return Response(serializer.data, status=status.HTTP_200_OK)

#----------------------------------------------------#
#-------------------- QUIZ VIEWS --------------------#
#----------------------------------------------------#

class QuizFetchView(APIView):
    def get(self, request, id):
        if str(id).startswith("CID"):
            quizzes = Quiz.objects.filter(creator_id=id)
            
            if not quizzes.exists():
                return Response([], status=status.HTTP_200_OK)
            
            serializer = QuizSerializer(quizzes, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        if str(id).startswith("QID"):
            try:
                quiz = Quiz.objects.get(id=id)
                serializer = QuizSerializer(quiz)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Quiz.DoesNotExist:
                return Response({"error": "Quiz Not Found"}, status=status.HTTP_404_NOT_FOUND)

        return Response({"error": "Invalid ID Provided"}, status=status.HTTP_400_BAD_REQUEST)
            
class QuizCreateView(APIView):
    def post(self, request):
        creator_id = request.data.get("creatorID")
        
        try:
            creator = Creator.objects.get(id=creator_id)
            
            quiz_data = request.data.copy()
            quiz_data["creator_id"] = creator.id
            
            quiz = CreateQuizSerializer(data=quiz_data)

            if not quiz.is_valid():
                return Response({ "error": quiz.errors }, status.HTTP_400_BAD_REQUEST)
            
            quiz.save()
            
            return Response(quiz.data, status=status.HTTP_201_CREATED)
        
        except Creator.DoesNotExist:
            return Response({ "error": "Creator Does Not Exist" }, status=status.HTTP_404_NOT_FOUND)

#--------------------------------------------------------#
#-------------------- ANSWERED VIEWS --------------------#
#--------------------------------------------------------#

class AnsweredQuizView(APIView):
    def get(self, request, id):
        if str(id).startswith("QID"):
            answered_quizzes = Answer.objects.filter(quizID=id)
            if not answered_quizzes.exists():
                return Response([], status=status.HTTP_200_OK)
            serialized_quizzes = GetAnsweredQuizSerializer(answered_quizzes, many=True)
            return Response(serialized_quizzes.data, status=status.HTTP_200_OK)

        elif str(id).startswith("AID"):
            try:
                answered_quiz = Answer.objects.get(attendeeID=id)
                serialized_quiz = GetAnsweredQuizSerializer(answered_quiz)
                return Response(serialized_quiz.data, status=status.HTTP_200_OK)
            except Answer.DoesNotExist:
                return Response({"error": "No quiz found for the given attendee ID"}, status=status.HTTP_404_NOT_FOUND)

        return Response({"error": "Invalid ID Provided"}, status=status.HTTP_400_BAD_REQUEST)
    
    def post(self, request, id):
        name = request.data.get('name')
        questions = request.data.get('questions')
        
        try:
            dbQuiz = Quiz.objects.get(id=id)
        except Quiz.DoesNotExist:
            return Response({ "error": "Quiz Not Found" }, status=status.HTTP_404_NOT_FOUND)
        
        try:
            dbAttendee = Attendee.objects.get(id=request.data.get("attendeeID"))
        except Attendee.DoesNotExist:
            return Response({ "error": "Attendee Does Not Exist" }, status=status.HTTP_404_NOT_FOUND)
        
        dbQuestions = Question.objects.filter(quiz=dbQuiz)
            
        if len(questions) != len(dbQuestions):
            return Response({ "error": "Number Of Questions Mismatch" }, status=status.HTTP_400_BAD_REQUEST)
        
        answeredQuestions = []
        totalPoints = 0
        finalPoints = 0

        for index, question in enumerate(questions):
            db_question = dbQuestions[index]
            
            totalPoints += db_question.points
            finalPoints += db_question.points if db_question.correct == question["selected"] else 0

            answeredQuestions.append({
                "question": db_question.question,
                "correct": db_question.correct,
                "selected": question["selected"],
                "points": db_question.points if db_question.correct == question["selected"] else 0
            })

        quiz_answer_data = {
            "quizID": dbQuiz.id,
            "attendeeID": dbAttendee.id,
            "quizTitle": dbQuiz.title,
            "quizDifficulty": dbQuiz.difficulty,
            "participantName": name,
            "totalPoints": totalPoints,
            "finalPoints": finalPoints,
            "questions": answeredQuestions
        }

        dbQuiz = AnsweredQuizSerializer(data=quiz_answer_data)
        
        if not dbQuiz.is_valid():
            return Response(dbQuiz.errors, status=status.HTTP_400_BAD_REQUEST)
        
        dbQuiz.save()
        
        return Response(dbQuiz.data, status=status.HTTP_201_CREATED)

        
            
        