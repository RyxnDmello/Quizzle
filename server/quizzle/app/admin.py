from django.contrib import admin
from .models import CreatorModel, AttendeeModel
from . models import QuizModel, QuestionModel, OptionsModel

@admin.register(CreatorModel)
class CreatorAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'mobile')
    search_fields = ('name', 'email')

@admin.register(AttendeeModel)
class AttendeeAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'mobile')
    search_fields = ('name', 'email')
    

class OptionsInline(admin.StackedInline):
    model = OptionsModel

@admin.register(QuestionModel)
class QuestionAdmin(admin.ModelAdmin):
    inlines = [OptionsInline]
    list_display = ('question', 'quiz', 'points', 'correct', 'selected')

@admin.register(QuizModel)
class QuizAdmin(admin.ModelAdmin):
    list_display = ('title', 'difficulty')