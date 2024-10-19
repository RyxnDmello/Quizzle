from rest_framework.serializers import ModelSerializer
from rest_framework import serializers

from django.contrib.auth.hashers import make_password

from . models import CreatorModel, AttendeeModel

from . validations import validate_name, validate_email, validate_mobile, validate_password

class RegisterCreatorSerializer(ModelSerializer):
    name = serializers.CharField(
        required=True,
        error_messages={ 
            'required': 'Name Must Be Provided', 
            'blank': 'Name Must Be Provided' 
        },
        validators = [validate_name]
    )
    
    email = serializers.EmailField(
        required=True,
        error_messages={ 
            "required": "Email Address Must Be Provided", 
            "blank": "Email Address Must Be Provided",
            "invalid": "Enter A Valid Email Address",
        },
        validators = [validate_email]
    )
    
    mobile = serializers.CharField(
        required=False,
        allow_blank=True,
        error_messages={ 
            "required": "Mobile Number Must Be Provided", 
            "blank": "Mobile Number Cannot Be Blank",
        },
        validators = [validate_mobile]
    )
    
    password = serializers.CharField(
        required=True,
        error_messages={ 
            "required": "Password Must Be Provided", 
            "blank": "Password Must Be Provided",
        },
        validators = [validate_password]
    )
    
    class Meta:
        model = CreatorModel
        fields = ("name", "email", "mobile", "password")
    
    def validate_email(self, value):
        if CreatorModel.objects.filter(email=value).exists():
            raise serializers.ValidationError("User With Given Email Address Already Exists")
        
        return value
        
    def register(self, validated_data):
        user = CreatorModel(
            name=validated_data['name'],
            email=validated_data['email'],
            mobile=validated_data['mobile'],
        )
    
        user.password = make_password(validated_data['password'])
        user.save()
        return user

class RegisterAttendeeSerializer(ModelSerializer):
    name = serializers.CharField(
        required=True,
        error_messages={ 
            'required': 'Name Must Be Provided', 
            'blank': 'Name Must Be Provided' 
        },
        validators = [validate_name]
    )
    
    email = serializers.EmailField(
        required=True,
        error_messages={ 
            "required": "Email Address Must Be Provided", 
            "blank": "Email Address Must Be Provided",
            "invalid": "Enter A Valid Email Address",
        },
        validators = [validate_email]
    )
    
    mobile = serializers.CharField(
        required=False,
        allow_blank=True,
        error_messages={ 
            "required": "Mobile Number Must Be Provided", 
            "blank": "Mobile Number Cannot Be Blank",
        },
        validators = [validate_mobile]
    )
    
    password = serializers.CharField(
        required=True,
        error_messages={ 
            "required": "Password Must Be Provided", 
            "blank": "Password Must Be Provided",
        },
        validators = [validate_password]
    )
    
    class Meta:
        model = AttendeeModel
        fields = ("name", "email", "mobile", "password")
    
    def validate_email(self, value):
        if AttendeeModel.objects.filter(email=value).exists():
            raise serializers.ValidationError("User With Given Email Address Already Exists")
        
        return value
        
    def register(self, validated_data):
        user = AttendeeModel(
            name=validated_data['name'],
            email=validated_data['email'],
            mobile=validated_data['mobile'],
        )
    
        user.password = make_password(validated_data['password'])
        user.save()
        return user

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(
        required=True,
        error_messages={ 
            "required": "Email Address Must Be Provided", 
            "blank": "Email Address Must Be Provided",
            "invalid": "Enter A Valid Email Address",
        },
        validators = [validate_email]
    )

    password = serializers.CharField(
        required=True,
        error_messages={ 
            "required": "Password Must Be Provided", 
            "blank": "Password Must Be Provided",
        },
        validators = [validate_password]
    )