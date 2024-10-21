from rest_framework.serializers import ValidationError
from rest_framework import serializers

import re

#----------------------------------------------------#
#----------------- USER VALIDATIONS -----------------#
#----------------------------------------------------#

def validate_name(value):
    value = str(value).strip()
    
    if len(value) > 50:
        raise ValidationError("Name Must Be A Maximum Of 50 Characters")

    if len(value) < 4:
        raise ValidationError("Name Must Be A Minimum Of 4 Characters")
    
    return value
    
def validate_email(value):
    value = str(value).lower().strip()
    
    if len(value) > 200:
        raise ValidationError("Email Address Must Be A Maximum Of 200 Characters")

    if len(value) < 4:
        raise ValidationError("Email Address Must Be A Minimum Of 4 Characters")
    
    return value
    
def validate_mobile(value):
    if value is None:
        return "NULL"
    
    if not str(value).isdigit():
        raise ValidationError("Mobile Number Must Contain Only Digits")
    
    if not ["6", "7", "8", "9"].__contains__(str(value)[0]):
        raise ValidationError("Mobile Number Must Start With 6, 7, 8, Or 9")
    
    if len(value) != 10:
        raise ValidationError("Mobile Number Must Be 10 Digits")
    
    return value

def validate_password(value):
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

#----------------------------------------------------#
#----------------- QUIZ VALIDATIONS -----------------#
#----------------------------------------------------#

def validate_title(value):
    value = str(value).strip()
    
    if len(value) < 4:
        raise serializers.ValidationError("Title Must Be A Minimum Of 4 Characters")
    
    if len(value) > 150:
        raise serializers.ValidationError("Title Must Be A Maximum Of 150 Characters")
    
    return value

def validate_difficulty(value):
    if value not in ["HARD", "MEDIUM", "EASY"]:
        raise serializers.ValidationError("Difficulty Must Be One Of HARD, MEDIUM, EASY")
        
    return value

def validate_questions(value):
    if len(value) == 0:
        raise serializers.ValidationError("Questions Must Be Provided")
        
    return value

def validate_question(value):
    value = str(value).strip()
    
    if len(value) < 4:
        raise serializers.ValidationError("Question Must Be A Minimum Of 4 Characters")
    
    if len(value) > 150:
        raise serializers.ValidationError("Question Must Be A Maximum Of 150 Characters")
    
    return value

def validate_points(value):
    value = int(value)
    
    if value < 1:
        raise serializers.ValidationError("Points Must Be A Minimum Of 1")
    
    if value > 100:
        raise serializers.ValidationError("Points Must Be A Maximum Of 100")
    
    return value

def validate_correct(value):
    if value not in ["A", "B", "C"]:
        raise serializers.ValidationError(f"Correct Option Must Be One Of A, B, C")
        
    return value

def validate_option(value):
    value = str(value).strip()
    
    if len(value) < 4:
        raise serializers.ValidationError("Option Must Be A Minimum Of 4 Characters")
    
    if len(value) > 25:
        raise serializers.ValidationError("Option Must Be A Maximum Of 25 Characters")
    
    return value