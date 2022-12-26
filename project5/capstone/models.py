from django.db import models
# Create your models here.
from django.contrib.auth.models import AbstractUser



class User(AbstractUser):
    pass

class Article(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_newsfeeds", null=False)
    title = models.CharField(max_length=128, default=None)
    author = models.CharField(max_length=128, default=None)
    description = models.CharField(max_length=180, default=None)
    imgurl = models.URLField(max_length=1024, blank=True, null=True)
    image = models.URLField(max_length=1024, blank=True, null=True)
    source = models.CharField(max_length=128, default=None)
    # article_date =     content = models.TextField(verbose_name="Post", default="", max_length=2048, null=False)
    timestamps = models.DateTimeField(null=True)

    def __str__(self):
         return f'{self.title} by {self.author} from {self.source}'


    def serialize(self):
        return {
            "user": self.user,
            "title": self.title,
            "author": self.author,
            "timestamps": self.timestamps.strftime("%b %d %Y, %I:%M %p"),
            "image": self.image,
            "imgurl": self.imgurl,
            "source": self.source,
            "description": self.description 
        }
