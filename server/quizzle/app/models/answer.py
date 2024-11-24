from django.db import models

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

class Answer(models.Model):
    quizID = models.CharField(max_length=20)
    attendeeID = models.CharField(max_length=20)
    quizTitle = models.CharField(max_length=150)
    quizDifficulty = models.CharField(max_length=6, choices=DIFFICULTY_LEVELS)
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