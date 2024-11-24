from django.db import models
from django.db.models import Count

from rest_framework.exceptions import NotFound

from .users import Attendee
from .quiz import Quiz, Question

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

SORT = [
    "quizTitle_asc",
    "quizTitle_desc",
    "totalPoints_asc",
    "totalPoints_desc",
    "count_asc",
    "count_desc"
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

    @classmethod
    def get_answers_by_quiz(cls, id):
        answer = cls.objects.filter(quizID=id)

        if not answer.exists():
            return NotFound("Answers With Quiz ID Do Not Exist")
        
        return answer
    
    @classmethod
    def get_answers_by_attendee(cls, id, request):
        sort = request.query_params.get("sort", None)
        title = request.query_params.get("filter", None)

        quizzes = cls.objects.filter(attendeeID=id).annotate(count=Count("questions"))

        if title:
            filtered = quizzes.filter(quizTitle__icontains=title)
            quizzes = quizzes if len(filtered) == 0 else filtered.order_by("quizTitle")

        if SORT.__contains__(sort):
            type, order = str(sort).split("_")
            order = "-" if order != "asc" else ""
            quizzes = quizzes.order_by(f"{order}{type}")

        if not SORT.__contains__(sort):
            return quizzes.order_by("quizTitle")

        return quizzes
    
    @classmethod
    def get_answer_by_attendee_and_quiz(cls, attendeeID, id):
        try:
            return Answer.objects.get(attendeeID=attendeeID, quizID=id)
        except Quiz.DoesNotExist:
            raise NotFound("Invalid Quiz/Attendee ID Provided")
            
    @classmethod
    def add_answer(cls, id, request):
        try:
            dbQuiz = Quiz.objects.get(id=id)
        except Quiz.DoesNotExist:
            raise NotFound("Quiz With Given ID Does Not Exist")
        
        name = request.data.get("name")
        questions = request.data.get("questions")
        
        try:
            dbAttendee = Attendee.objects.get(id=request.data.get("attendeeID"))
        except Attendee.DoesNotExist:
            raise NotFound("Attendee With Given ID Does Not Exist")
        
        dbQuestions = Question.objects.filter(quiz=dbQuiz)
            
        if len(questions) != len(dbQuestions):
            raise ValueError("Number Of Questions Mismatch")
        
        answeredQuestions = []
        totalPoints = 0
        finalPoints = 0

        for index, question in enumerate(questions):
            db_question = dbQuestions[index]
            
            totalPoints += db_question.points
            finalPoints += db_question.points if db_question.correct == question["selected"] else 0

            answeredQuestions.append({
                "question": db_question.question,
                "correct": db_question.correct,
                "selected": question["selected"],
                "points": db_question.points if db_question.correct == question["selected"] else 0
            })

        answer_data = {
            "quizID": dbQuiz.id,
            "attendeeID": dbAttendee.id,
            "quizTitle": dbQuiz.title,
            "quizDifficulty": dbQuiz.difficulty,
            "participantName": name,
            "totalPoints": totalPoints,
            "finalPoints": finalPoints,
            "questions": answeredQuestions
        }

        return answer_data
        
class AnswerQuestions(models.Model):
    quizAnswer = models.ForeignKey(Answer, related_name='questions', on_delete=models.CASCADE)
    question = models.CharField(max_length=150)
    correct = models.CharField(max_length=1, choices=CHOICES, null=False)
    selected = models.CharField(max_length=1, choices=CHOICES, null=False)
    points = models.IntegerField()