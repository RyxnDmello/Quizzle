from django.db import models

from . utils import getUniqueID

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
    
class QuizModel(models.Model):
    DIFFICULTY_LEVELS = [
        ("HARD", "Hard"),
        ("MEDIUM", "Medium"),
        ("EASY", "Easy"),
    ]

    id = models.CharField(max_length=20, primary_key=True, unique=True, editable=False, default=getUniqueID)
    title = models.CharField(max_length=150)
    difficulty = models.CharField(max_length=6, choices=DIFFICULTY_LEVELS)

    def __str__(self):
        return self.title

class QuestionModel(models.Model):
    A = "A"
    B = "B"
    C = "C"
    
    CHOICES = [
        (A, "A"),
        (B, "B"),
        (C, "C"),
    ]

    quiz = models.ForeignKey(QuizModel, related_name="questions", on_delete=models.CASCADE)
    points = models.IntegerField()
    question = models.CharField(max_length=150)
    correct = models.CharField(max_length=1, choices=CHOICES, null=True)
    selected = models.CharField(max_length=1, choices=CHOICES, null=True)

    def __str__(self):
        return self.question

class OptionsModel(models.Model):
    question = models.OneToOneField(QuestionModel, related_name="options", on_delete=models.CASCADE)
    A = models.CharField(max_length=25)
    B = models.CharField(max_length=25)
    C = models.CharField(max_length=25)

    def __str__(self):
        return f"Options for {self.question.question}"
