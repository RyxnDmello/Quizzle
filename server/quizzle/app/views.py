from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework.permissions import AllowAny
from rest_framework.exceptions import NotFound
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from .models import Creator, Attendee
from .models import Quiz
from .models import Answer

from .serializer import RegisterCreatorSerializer, RegisterAttendeeSerializer, LoginSerializer
from .serializer import QuizSerializer, CreateQuizSerializer
from .serializer import AnsweredQuizSerializer, CreateAnsweredQuizSerializer

from .pagination import QuizPagination

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
        if str(id).startswith("QID"):
            try:
                quiz = Quiz.get_quiz(id)
                serialized_quiz = QuizSerializer(quiz)
                return Response(serialized_quiz.data, status=status.HTTP_200_OK)
            except NotFound as error:
                return Response({ "error": str(error) }, status=status.HTTP_404_NOT_FOUND)
            except Exception as error:
                return Response({ "error": str(error) }, status=status.HTTP_400_BAD_REQUEST)
        
        elif str(id).startswith("CID"):
            quizzes = Quiz.get_quizzes_by_creator(id, request)
            
            paginator = QuizPagination()
            paginated_quizzes = paginator.paginate_queryset(quizzes, request)
            
            serializer = QuizSerializer(paginated_quizzes, many=True)
            return paginator.get_paginated_response(serializer.data)

        return Response({ "error": "Invalid ID Provided" }, status=status.HTTP_400_BAD_REQUEST)
    
    def patch(self, request, id):
        try:
            Quiz.update_quiz(id, request)
        except NotFound as error:
            return Response({ "error": str(error) }, status=status.HTTP_404_NOT_FOUND)
        except Exception as error:
            return Response({ "error": str(error) }, status=status.HTTP_400_BAD_REQUEST)

        return Response(status=status.HTTP_200_OK)
    
    def delete(self, _, id):
        try:
            Quiz.delete_quiz(id)
            return Response(status=status.HTTP_200_OK)
        except NotFound as error:
            return Response({ "error": str(error) }, status=status.HTTP_404_NOT_FOUND)
        except Exception as error:
            return Response({ "error": str(error) }, status=status.HTTP_400_BAD_REQUEST)

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
            answers = Answer.get_answers_by_quiz(id)
            serialized_answers = AnsweredQuizSerializer(answers, many=True)
            return Response(serialized_answers.data, status=status.HTTP_200_OK)

        elif str(id).startswith("AID"):
            try:
                answers = Answer.get_answers_by_attendee(id, request)
                
                paginator = QuizPagination()
                paginated_answers = paginator.paginate_queryset(answers, request)
                
                serializer = AnsweredQuizSerializer(paginated_answers, many=True)
                return paginator.get_paginated_response(serializer.data)
            except NotFound as error:
                return Response({ "error": str(error) }, status=status.HTTP_404_NOT_FOUND)

        return Response({"error": "Invalid ID Provided"}, status=status.HTTP_400_BAD_REQUEST)
    
    def post(self, request, id):
        try:
            answer_data = Answer.add_answer(id, request)
            answer = CreateAnsweredQuizSerializer(data=answer_data)
        
            if not answer.is_valid():
                error = getError(answer.errors)
                return Response({ "error": error }, status=status.HTTP_400_BAD_REQUEST)
        
            answer.save()
            return Response(status=status.HTTP_201_CREATED)
        
        except NotFound as error:
            return Response({ "error": str(error) }, status=status.HTTP_404_NOT_FOUND)
        except ValueError as error:
            return Response({ "error": str(error) }, status=status.HTTP_404_NOT_FOUND)
        except Exception as error:
            return Response({ "error": str(error) }, status=status.HTTP_400_BAD_REQUEST)

class AttendeeAnsweredQuizView(APIView):
    def get(self, _, attendee_id, id):
        try:
            answer = Answer.get_answer_by_attendee_and_quiz(attendee_id, id)
            serialized_quiz = AnsweredQuizSerializer(answer)
            return Response(serialized_quiz.data, status=status.HTTP_200_OK)
        except NotFound as error:
            return Response({ "error": str(error) }, status=status.HTTP_404_NOT_FOUND)
        except Exception as error:
            return Response({ "error": str(error) }, status=status.HTTP_400_BAD_REQUEST)
        
        