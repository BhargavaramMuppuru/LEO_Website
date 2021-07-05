from django.contrib import admin
from .models import blog_data


class blog_data_1(admin.ModelAdmin):
    list_display = ('id', 'date', 'title', 'image_name', 'link','content_text')
    list_editable = ('date' , 'link' , 'title' , 'content_text' ,)

admin.site.register(blog_data, blog_data_1)
