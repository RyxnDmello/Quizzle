from rest_framework.serializers import ValidationError
from rest_framework import serializers

import re

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