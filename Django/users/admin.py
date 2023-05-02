from django.contrib import admin
from users.models import NewUser
from django.contrib.auth.admin import UserAdmin
from django.forms import TextInput, Textarea, CharField
from django import forms
from django.db import models


class UserAdminConfig(UserAdmin):
    model = NewUser
    search_fields = ('email', 'user_name', 'first_name',)
    list_filter = ('email', 'user_name', 'first_name','password', 'is_active', 'is_staff','role','meta_address')
    ordering = ('-start_date',)
    list_display = ('email','id', 'user_name', 'first_name',
                    'is_active', 'is_staff','role','meta_address')
    fieldsets = (
        (None, {'fields': ('email', 'user_name', 'first_name','role','meta_address')}),
        ('Permissions', {'fields': ('is_staff', 'is_active')}),
        ('Personal', {'fields': ('about',)}),
    )
    formfield_overrides = {
        models.TextField: {'widget': Textarea(attrs={'rows': 20, 'cols': 60})},
    }
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'user_name', 'first_name', 'password1', 'password2', 'is_active', 'is_staff','role','meta_address')}
         ),
    )


admin.site.register(NewUser, UserAdminConfig)