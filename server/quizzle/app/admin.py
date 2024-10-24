from django.contrib import admin

from .models import CreatorModel, AttendeeModel
from .models import QuizModel, QuestionModel, OptionsModel
from .models import AnswerModel, AnswerQuestionsModel

@admin.register(CreatorModel)
class CreatorAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "email", "mobile")

@admin.register(AttendeeModel)
class AttendeeAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "email", "mobile")

class OptionsInline(admin.StackedInline):
    model = OptionsModel

@admin.register(QuestionModel)
class QuestionAdmin(admin.ModelAdmin):
    inlines = [OptionsInline]
    list_display = ("id", "question", "quiz", "points", "correct")

@admin.register(QuizModel)
class QuizAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "creator", "difficulty")

@admin.register(AnswerModel)
class AnswerAdmin(admin.ModelAdmin):
    list_display = ("quiz_id", "title", "name", "date", "points")

@admin.register(AnswerQuestionsModel)
class AnswerQuestionAdmin(admin.ModelAdmin):
    list_display = ("quiz_answer", "question", "correct", "selected", "points")
