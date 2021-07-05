from django.db import models


class blog_data(models.Model):
    date = models.CharField(max_length=15)
    time = models.CharField(max_length=20)
    title = models.CharField(max_length=200)
    image_name = models.CharField(max_length=20)
    content_text = models.CharField(max_length=10000)
    link = models.CharField(max_length=1000, default='')
