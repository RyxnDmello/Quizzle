from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from .models import Creator, Attendee
from .models import Quiz, Question, Option
from .models import Answer

from .serializer import RegisterCreatorSerializer, RegisterAttendeeSerializer, LoginSerializer
from .serializer import CreateQuizSerializer, QuizSerializer
from .serializer import AnsweredQuizSerializer, GetAnsweredQuizSerializer

from .utils import getError

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
            error = getError(user_serializer.errors)
            return Response({ "error": error }, status=status.HTTP_400_BAD_REQUEST)
        
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
            error = getError(user.errors)
            return Response({ "error": error }, status=status.HTTP_400_BAD_REQUEST)
        
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

class QuizView(APIView):
    def get(self, request, id):
        if str(id).startswith("CID"):
            quizzes = Quiz.objects.filter(creator_id=id)
            
            if not quizzes.exists():
                return Response([], status=status.HTTP_200_OK)
            
            serializer = QuizSerializer(quizzes, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        elif str(id).startswith("QID"):
            try:
                quiz = Quiz.objects.get(id=id)
                serializer = QuizSerializer(quiz)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Quiz.DoesNotExist:
                return Response({"error": "Quiz Not Found"}, status=status.HTTP_404_NOT_FOUND)

        return Response({"error": "Invalid ID Provided"}, status=status.HTTP_400_BAD_REQUEST)
    
    def patch(self, request, id):
        try:
            quiz = Quiz.objects.get(id=id)
        except Quiz.DoesNotExist:
            return Response({ "error": "Failed To Update Quiz Due To Invalid ID" }, status=status.HTTP_404_NOT_FOUND)

        if not request.data.get("title"):
            return Response({ "error": "Title Must Be Provided" }, status=status.HTTP_400_BAD_REQUEST)
        
        if not request.data.get("difficulty"):
            return Response({ "error": "Difficulty Must Be Provided" }, status=status.HTTP_400_BAD_REQUEST)
        
        if not request.data.get("questions"):
            return Response({ "error": "Questions Must Be Provided" }, status=status.HTTP_400_BAD_REQUEST)

        quiz.title = request.data["title"]
        quiz.difficulty = request.data["difficulty"]
        
        total_points = 0

        quiz.__getattribute__("questions").all().delete()

        for question_data in request.data["questions"]:
            question = Question.objects.create(
                quiz=quiz,
                points=int(question_data["points"]),
                question=question_data["question"],
                correct=question_data["correct"]
            )

            total_points += int(question_data["points"])

            Option.objects.create(
                question=question,
                A=question_data["options"]["A"],
                B=question_data["options"]["B"],
                C=question_data["options"]["C"]
            )

        quiz.points = total_points
        quiz.save()

        return Response({ "message": "Quiz Updated Successfully" }, status=status.HTTP_200_OK)
    
    def delete(self, request, id):
        if str(id).startswith("QID"):
            try:
                Quiz.objects.get(id=id).delete()
                return Response(status=status.HTTP_200_OK)
            except Quiz.DoesNotExist:
                return Response({"error": "Failed To Delete Quiz"}, status=status.HTTP_404_NOT_FOUND)

        return Response({"error": "Invalid ID Provided"}, status=status.HTTP_400_BAD_REQUEST)
            
class QuizCreateView(APIView):
    def post(self, request):
        creator_id = request.data.get("creatorID")

        if not creator_id:
            return Response({ "error": "Creator ID Must Be Provided" }, status.HTTP_400_BAD_REQUEST)
        
        quiz_data = request.data.copy()
        quiz_data["creator_id"] = creator_id
        
        quiz = CreateQuizSerializer(data=quiz_data)

        if not quiz.is_valid():
            error = getError(quiz.errors)
            return Response({ "error": error }, status.HTTP_400_BAD_REQUEST)
        
        quiz.save()
        
        return Response(quiz.data, status=status.HTTP_201_CREATED)
        
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
            answered_quizzes = Answer.objects.filter(attendeeID=id)
            
            if not answered_quizzes.exists():
                return Response([], status=status.HTTP_200_OK)
            
            serialized_quizzes = GetAnsweredQuizSerializer(answered_quizzes, many=True)
            return Response(serialized_quizzes.data, status=status.HTTP_200_OK)
            
        return Response({"error": "Invalid Quiz ID Provided"}, status=status.HTTP_400_BAD_REQUEST)
    
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
            error = getError(dbQuiz.errors)
            return Response({ "error": error }, status=status.HTTP_400_BAD_REQUEST)
        
        dbQuiz.save()
        
        return Response(dbQuiz.data, status=status.HTTP_201_CREATED)

class AttendeeAnsweredQuizView(APIView):
    def get(self, request, attendee_id, id):
        try:
            answered_quiz = Answer.objects.get(attendeeID=attendee_id, quizID=id)
            serialized_quiz = GetAnsweredQuizSerializer(answered_quiz)
            return Response(serialized_quiz.data, status=status.HTTP_200_OK)
        except Answer.DoesNotExist:
            return Response({"error": "Invalid ID Provided"}, status=status.HTTP_404_NOT_FOUND)
        
        