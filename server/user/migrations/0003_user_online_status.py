# Generated by Django 5.0.3 on 2024-03-27 11:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0002_alter_user_id_42'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='online_status',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
