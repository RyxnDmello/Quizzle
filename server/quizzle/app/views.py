from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from . models import CreatorModel, AttendeeModel

from . serializer import RegisterCreatorSerializer, RegisterAttendeeSerializer, LoginSerializer

class RegisterView(APIView):
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
        except CreatorModel.DoesNotExist and AttendeeModel.DoesNotExist:
            return Response({ "error": "User With Given Email Address Does Not Exist" }, status=status.HTTP_400_BAD_REQUEST)

        if password != db_user.password:
            return Response({ "error": "Password Is Incorrect" }, status=status.HTTP_400_BAD_REQUEST)
        
        return Response({
            "type": request.data.get("type"),
            "name": db_user.name,
            "email": db_user.email,
            "mobile": db_user.mobile,
        }, status=status.HTTP_200_OK)
            

            
        