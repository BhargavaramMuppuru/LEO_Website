from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('home', views.home, name='home'),
    path('events', views.about, name='events'),
    path('blog', views.blog, name='blog'),
     path('boards', views.blog, name='boards'),
    path('contact_us', views.contact, name='contact'),
    path('upload_blog', views.upload_blog, name='upload_blog'),
    path('robots.txt', views.robots),
    path('sitemap.xml', views.sitemap),
    
    
]
