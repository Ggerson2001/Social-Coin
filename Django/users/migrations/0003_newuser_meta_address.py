# Generated by Django 4.1.6 on 2023-05-02 13:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_newuser_role'),
    ]

    operations = [
        migrations.AddField(
            model_name='newuser',
            name='meta_address',
            field=models.CharField(blank=True, max_length=350),
        ),
    ]
