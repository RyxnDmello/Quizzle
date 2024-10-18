from django.db import models

USER_TYPE_CHOICES = [
    ('CREATOR', '1'),
    ('ATTENDEE', '2'),
]

class UserModel(models.Model):
    type = models.CharField(choices=USER_TYPE_CHOICES, max_length=8, default="1")
    name = models.CharField(max_length=50)
    email = models.EmailField(unique=True, max_length=200)
    mobile  = models.CharField(unique=True, max_length=10)
    password = models.CharField(max_length=255)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)  
