from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from rest_framework_simplejwt.tokens import RefreshToken, AccessToken

from . models import UserModel

from . serializer import RegisterSerializer, LoginSerializer

class RegisterView(APIView):
    def post(self, request):
        print(request)
        user = RegisterSerializer(data=request.data)
        
        if request.data.get("confirmPassword") is None:
            return Response({ "error": "Confirm Password Must Be Provided" }, status=status.HTTP_400_BAD_REQUEST)
        
        if user.is_valid() == False:
            return Response(user.errors, status=status.HTTP_400_BAD_REQUEST)
        
        if request.data.get("password") != request.data.get("confirmPassword"):
            return Response({ "error": "Passwords Do Not Match" }, status=status.HTTP_400_BAD_REQUEST)
       
        user.save()
        
        accessToken = str(RefreshToken()),
        refreshToken = str(AccessToken()),
        
        return Response({
            "type": request.data.get("type"),
            "name": request.data.get("name"),
            "email": request.data.get("email"),
            "mobile": request.data.get("mobile"),
            "accessToken": accessToken[0],
            "refreshToken": refreshToken[0],
        }, status=status.HTTP_201_CREATED)
    
class LoginView(APIView):
    def post(self, request):
        user = LoginSerializer(data=request.data)

        if not user.is_valid():
            return Response(user.errors, status=status.HTTP_400_BAD_REQUEST)
        
        email = request.data.get("email")
        password = request.data.get("password")
        
        try:
            user = UserModel.objects.get(email=email)
        except UserModel.DoesNotExist:
            return Response({ "error": "User With Given Email Address Does Not Exist" }, status=status.HTTP_400_BAD_REQUEST)

        if password != user.password:
            return Response({ "error": "Password Is Incorrect" }, status=status.HTTP_400_BAD_REQUEST)
        
        accessToken = str(RefreshToken()),
        refreshToken = str(AccessToken()),
        
        return Response({
            "type": user.type,
            "name": user.name,
            "email": user.email,
            "mobile": user.mobile,
            "accessToken": accessToken[0],
            "refreshToken": refreshToken[0],
        }, status=status.HTTP_200_OK)
            

            
        