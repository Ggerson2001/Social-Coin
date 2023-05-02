from django.contrib import admin

# Register your models here.

from django.contrib import admin
from . import models


@admin.register(models.JobPost)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ('title', 'id', 'status', 'slug', 'author','reward')
    prepopulated_fields = {'slug': ('title',), }

@admin.register(models.JobVerification)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ('id','author_id','job_post','time_created')
    