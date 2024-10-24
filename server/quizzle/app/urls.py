from django.urls import path

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .views import RegisterView, LoginView
from .views import QuizView, AnswerQuizView

urlpatterns = [
    path("api/register/", RegisterView.as_view(), name="register"),
    path("api/login/", LoginView.as_view(), name="login"),
    
    path("api/quiz/", QuizView.as_view(), name="quiz"),
    path("api/quiz/<str:id>", AnswerQuizView.as_view(), name="quiz_id"),
    
    path("api/token/", TokenObtainPairView.as_view(), name="token_pair"),
    path("api/token/access/", TokenRefreshView.as_view(), name="token_access"),
]