from django.contrib import admin
from .models import CreatorModel, AttendeeModel

@admin.register(CreatorModel)
class CreatorAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'mobile')
    search_fields = ('name', 'email')

@admin.register(AttendeeModel)
class AttendeeAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'mobile')
    search_fields = ('name', 'email')