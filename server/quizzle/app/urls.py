from django.urls import path

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from . views import RegisterView, LoginView

urlpatterns = [
    path('api/register/', RegisterView.as_view(), name="register"),
    path('api/login/', LoginView.as_view(), name="login"),
    
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]