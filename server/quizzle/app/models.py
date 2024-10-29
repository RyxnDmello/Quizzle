from django.db import models

from .utils import getUniqueCreatorID, getUniqueAttendeeID, getUniqueQuizID 

#----------------------------------------------------#
#----------------- USER SERIALIZERS -----------------#
#----------------------------------------------------#

class Creator(models.Model):
    id = models.CharField(max_length=20, primary_key=True, editable=False, default=getUniqueCreatorID)
    name = models.CharField(max_length=50)
    email = models.EmailField(unique=True, max_length=200)
    mobile = models.CharField(blank=True, max_length=10, default="NULL")
    password = models.CharField(max_length=255)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

class Attendee(models.Model):
    id = models.CharField(max_length=20, primary_key=True, editable=False, default=getUniqueAttendeeID)
    name = models.CharField(max_length=50)
    email = models.EmailField(unique=True, max_length=200)
    mobile = models.CharField(blank=True, max_length=10, default="NULL")
    password = models.CharField(max_length=255)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)
    
#----------------------------------------------------#
#----------------- QUIZ SERIALIZERS -----------------#
#----------------------------------------------------#
    
DIFFICULTY_LEVELS = [
    ("HARD", "Hard"),
    ("MEDIUM", "Medium"),
    ("EASY", "Easy"),
]
    
CHOICES = [
    ("A", "A"),
    ("B", "B"),
    ("C", "C"),
]
    
class Quiz(models.Model):
    creator = models.ForeignKey(Creator, related_name="quizzes", on_delete=models.CASCADE)
    id = models.CharField(max_length=20, primary_key=True, unique=True, editable=False, default=getUniqueQuizID)
    title = models.CharField(max_length=150)
    difficulty = models.CharField(max_length=6, choices=DIFFICULTY_LEVELS)
    points = models.IntegerField(default=0)

    def __str__(self):
        return self.title

class Question(models.Model):
    quiz = models.ForeignKey(Quiz, related_name="questions", on_delete=models.CASCADE)
    points = models.IntegerField()
    question = models.CharField(max_length=150)
    correct = models.CharField(max_length=1, choices=CHOICES, null=False)

    def __str__(self):
        return self.question

class Option(models.Model):
    question = models.OneToOneField(Question, related_name="options", on_delete=models.CASCADE)
    A = models.CharField(max_length=25)
    B = models.CharField(max_length=25)
    C = models.CharField(max_length=25)

    def __str__(self):
        return f"Options for {self.question.question}"
    
#------------------------------------------------------#
#----------------- ANSWER SERIALIZERS -----------------#
#------------------------------------------------------#
    
class Answer(models.Model):
    quizID = models.CharField(max_length=20)
    attendeeID = models.CharField(max_length=20)
    quizTitle = models.CharField(max_length=150)
    difficulty = models.CharField(max_length=6, choices=DIFFICULTY_LEVELS)
    totalPoints = models.IntegerField(default=0)
    finalPoints = models.IntegerField(default=0)
    participantName = models.CharField(max_length=50)
    completionDate = models.DateTimeField(auto_now_add=True)

class AnswerQuestions(models.Model):
    quizAnswer = models.ForeignKey(Answer, related_name='questions', on_delete=models.CASCADE)
    question = models.CharField(max_length=150)
    correct = models.CharField(max_length=1, choices=CHOICES, null=False)
    selected = models.CharField(max_length=1, choices=CHOICES, null=False)
    points = models.IntegerField()