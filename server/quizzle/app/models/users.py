from django.db import models

from ..utils import getUniqueCreatorID, getUniqueAttendeeID

class Creator(models.Model):
    id = models.CharField(max_length=20, primary_key=True, editable=False, default=getUniqueCreatorID)
    name = models.CharField(max_length=50)
    email = models.EmailField(unique=True, max_length=200)
    mobile = models.CharField(blank=True, null=True, max_length=10)
    password = models.CharField(max_length=255)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

class Attendee(models.Model):
    id = models.CharField(max_length=20, primary_key=True, editable=False, default=getUniqueAttendeeID)
    name = models.CharField(max_length=50)
    email = models.EmailField(unique=True, max_length=200)
    mobile = models.CharField(blank=True, null=True, max_length=10)
    password = models.CharField(max_length=255)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)