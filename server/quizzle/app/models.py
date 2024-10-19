from django.db import models

class CreatorModel(models.Model):
    name = models.CharField(max_length=50)
    email = models.EmailField(unique=True, max_length=200)
    mobile = models.CharField(blank=True, max_length=10, default="NULL")
    password = models.CharField(max_length=255)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)  

class AttendeeModel(models.Model):
    name = models.CharField(max_length=50)
    email = models.EmailField(unique=True, max_length=200)
    mobile = models.CharField(blank=True, max_length=10, default="NULL")
    password = models.CharField(max_length=255)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)  
