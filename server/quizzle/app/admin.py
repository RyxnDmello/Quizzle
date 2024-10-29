from django.contrib import admin
from .models import Creator, Attendee, Quiz, Question, Option, Answer, AnswerQuestions

#----------------------------------------------------#
#----------------- USER SERIALIZERS -----------------#
#----------------------------------------------------#

@admin.register(Creator)
class CreatorAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'email', 'mobile', 'createdAt', 'updatedAt')
    search_fields = ('name', 'email')
    list_filter = ('createdAt', 'updatedAt')

@admin.register(Attendee)
class AttendeeAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'email', 'mobile', 'createdAt', 'updatedAt')
    search_fields = ('name', 'email')
    list_filter = ('createdAt', 'updatedAt')
    
#----------------------------------------------------#
#----------------- QUIZ SERIALIZERS -----------------#
#----------------------------------------------------#

class OptionsInline(admin.TabularInline):
    model = Option
    extra = 1
    readonly_fields = ('A', 'B', 'C')

class QuestionInline(admin.TabularInline):
    model = Question
    extra = 1
    readonly_fields = ('question', 'points', 'correct')
    inlines = [OptionsInline]
    
@admin.register(Quiz)
class QuizAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'creator', 'difficulty', 'points')
    search_fields = ('title', 'creator__name')
    list_filter = ('difficulty',)
    inlines = [QuestionInline]

@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ('id', 'quiz', 'question', 'points', 'correct')
    search_fields = ('question', 'quiz__title')
    list_filter = ('quiz',)
    inlines = [OptionsInline]
    
@admin.register(Option)
class OptionsAdmin(admin.ModelAdmin):
    list_display = ('id', 'question', 'A', 'B', 'C')
    search_fields = ('question__question',)

#------------------------------------------------------#
#----------------- ANSWER SERIALIZERS -----------------#
#------------------------------------------------------#

class AnswerQuestionsInline(admin.TabularInline):
    model = AnswerQuestions
    extra = 1
    readonly_fields = ('question', 'correct', 'selected', 'points')

@admin.register(Answer)
class AnswerAdmin(admin.ModelAdmin):
    list_display = ('quizID', 'attendeeID', 'quizTitle', 'difficulty', 'totalPoints', 'finalPoints', 'participantName', 'completionDate')
    search_fields = ('quizTitle', 'participantName')
    list_filter = ('difficulty', 'completionDate')
    inlines = [AnswerQuestionsInline]
