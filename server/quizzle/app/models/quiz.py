from django.db import models
from django.db.models import Count

from rest_framework.exceptions import NotFound

from .users import Creator

from ..utils import getUniqueQuizID

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
    
    @classmethod
    def get_quiz(cls, id):
        try:
            return cls.objects.get(id=id)
        except cls.DoesNotExist:
            raise NotFound("Quiz With Given ID Does Not Exist")
        
    @classmethod
    def get_quizzes_by_creator(cls, id, request):
        SORT = ["title_asc", "title_desc", "points_asc", "points_desc", "count_asc", "count_desc"]

        sort = request.query_params.get("sort", None)
        title = request.query_params.get("filter", None)

        quizzes = cls.objects.filter(creator_id=id).annotate(count=Count("questions"))

        if title:
            filtered = quizzes.filter(title__icontains=title)
            quizzes = quizzes if len(filtered) == 0 else filtered.order_by("title")

        if SORT.__contains__(sort):
            type, order = str(sort).split("_")
            order = "-" if order != "asc" else ""
            quizzes = quizzes.order_by(f"{order}{type}")

        if not SORT.__contains__(sort):
            return quizzes.order_by("title")

        return quizzes
    
    @classmethod
    def update_quiz(cls, id, request):
        try:
            quiz = cls.objects.get(id=id)
        except cls.DoesNotExist:
            raise NotFound("Invalid Quiz ID Provided")
        
        if not request.data.get("title"):
            raise Exception("Title Must Be Provided")
        
        if not request.data.get("difficulty"):
            raise Exception("Difficulty Must Be Provided")
        
        if not request.data.get("questions"):
            raise Exception("Questions Must Be Provided")
        
        quiz.title = request.data["title"]
        quiz.difficulty = request.data["difficulty"]
        
        total_points = 0

        quiz.__getattribute__("questions").all().delete()

        for question_data in request.data["questions"]:
            question = Question.objects.create(
                quiz=quiz,
                points=int(question_data["points"]),
                question=question_data["question"],
                correct=question_data["correct"]
            )

            total_points += int(question_data["points"])

            Option.objects.create(
                question=question,
                A=question_data["options"]["A"],
                B=question_data["options"]["B"],
                C=question_data["options"]["C"]
            )

        quiz.points = total_points
        quiz.save()

    @classmethod
    def delete_quiz(cls, id):
        try:
            cls.objects.get(id=id).delete()
        except Quiz.DoesNotExist:
            raise NotFound("Invalid Quiz ID Provided")

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