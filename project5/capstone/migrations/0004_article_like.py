# Generated by Django 4.1.4 on 2022-12-28 21:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('capstone', '0003_article_author_article_timestamps'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='like',
            field=models.BooleanField(default=False),
        ),
    ]
