# Generated by Django 4.1.6 on 2023-03-10 12:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='newuser',
            name='role',
            field=models.CharField(choices=[('client', 'Client'), ('service', 'Service'), ('admin', 'Admin')], default='client', max_length=50),
        ),
    ]
