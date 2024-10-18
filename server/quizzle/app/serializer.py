from rest_framework.serializers import ModelSerializer
from rest_framework.serializers import ValidationError
from rest_framework import serializers

from django.contrib.auth.hashers import make_password

import re

from . models import UserModel

class RegisterSerializer(ModelSerializer):
    type = serializers.ChoiceField(
        choices=[('CREATOR', 'Creator'), ('ATTENDEE', 'Attendee')],
        error_messages={
            'invalid_choice': 'Invalid User Type Provided'
        }
    )
    
    name = serializers.CharField(
        error_messages={
            'required': 'Name Must Be Provided',
            'blank': 'Name Must Be Provided',
        }
    )

    email = serializers.EmailField(
        error_messages={
            'required': 'Email Address Must Be Provided',
            'blank': 'Email Address Must Be Provided',
        }
    )

    password = serializers.CharField(
        error_messages={
            'required': 'Password Must Be Provided',
            'blank': 'Password Must Be Provided'
        }
    )

    class Meta:
        model=UserModel
        fields=("type", "name", "email", "mobile", "password")
        
    def validate_name(self, value):
        if len(value) > 50:
            raise ValidationError("Name Must Be A Maximum Of 50 Characters")
    
        if len(value) < 4:
            raise ValidationError("Name Must Be A Minimum Of 4 Characters")
        
        return value
    
    def validate_email(self, value):
        value = str(value).lower().strip()
        
        if not value.__contains__("@"):
            raise ValidationError("Invalid Email Address")
        
        if len(value) > 200:
            raise ValidationError("Email Address Must Be A Maximum Of 200 Characters")
    
        if len(value) < 4:
            raise ValidationError("Email Address Must Be A Minimum Of 4 Characters")
        
        return value
    
    def validate_mobile(self, value):
        if not str(value).isdigit():
            raise ValidationError("Mobile Number Must Contain Only Digits")
        
        if not ["6", "7", "8", "9"].__contains__(str(value)[0]):
            raise ValidationError("Mobile Number Must Start With 6, 7, 8, Or 9")
        
        if len(value) != 10:
            raise ValidationError("Mobile Number Must Be 10 Digits")
        
        return value

    def validate_password(self, value):
        if not re.match(r'^[0-9a-zA-Z!@#$%]*$', value):
            raise serializers.ValidationError("Password Contains An Invalid Character")
        
        if not re.search(r'(?=.*[A-Z])', value):
            raise serializers.ValidationError("Password Must Contain One Uppercase Letter")
        
        if not re.search(r'(?=.*[a-z])', value):
            raise serializers.ValidationError("Password Must Contain One Lowercase Letter")
        
        if not re.search(r'(?=.*\d)', value):
            raise serializers.ValidationError("Password Must Contain One Number.")
        
        if not re.search(r'(?=.*[!@#$%])', value):
            raise serializers.ValidationError("Password Must Contain One Special Character.")
        
        if len(value) < 8:
            raise serializers.ValidationError("Password Must Be A Minimum Of 8 Characters")
        
        if len(value) > 50:
            raise serializers.ValidationError("Password Must Be A Maximum Of 50 Characters")
        
        return value
        
    def register(self, validated_data):
        user = UserModel(
            type=validated_data['type'],
            name=validated_data['name'],
            email=validated_data['email'],
            mobile=validated_data['mobile'],
        )
    
        user.password = make_password(validated_data['password'])
        user.save()
        return user
    
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(
        error_messages={
            'required': 'Email Address Must Be Provided',
            'blank': 'Email Address Must Be Provided',
            'unique': 'User With Given Email Address Already Exists'
        }
    )

    password = serializers.CharField(
        error_messages={
            'required': 'Password Must Be Provided',
            'blank': 'Password Must Be Provided'
        }
    )
        