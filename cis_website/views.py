from django.shortcuts import render, redirect
from django.core.mail import send_mail
from .models import blog_data
from django.http import HttpResponse
from datetime import datetime, timedelta, timezone
from django.core.files.storage import FileSystemStorage


def index(request):
    return redirect('home')
def home(request):
    response = render(request, 'cis_website/home.html')
    return response
def events(request):
    return render(request, 'cis_website/events.html')
def board(request):
    return render(request, 'cis_website/boards.html')
    
def blog(request):
    blog_database = blog_data.objects.all()
    return render(request, 'cis_website/blog.html', {'data': blog_database[::-1]})
def contact(request):
    if request.method == 'POST':
        if not request.session.session_key:
            request.session.save()
        body = '<html><p>You have a new contact request</p><h3>Contact Details</h3><ul> <li>Name:' + request.POST[
            'name'] + '</li><li>Email:' + request.POST['email'] + '</li><li>Phone:' + request.POST[
                'subject'] + '</li></ul><h3>Message</h3><p>' + request.POST['message'] + '</p></html>'
        print(body)
        send_mail(subject="Guest Request", message="", from_email='"VIT LEO CLUB" <leoclub.vit21@gmail.com>',
                recipient_list=["muppurub@gmail.com"],
                html_message=body)
        msg = 1
    else:
        msg = 0
    return render(request, 'cis_website/contact.html', {'msg': msg})


def privacy(request):
    return render(request, 'cis_website/boards.html')



def upload_blog(request):
    msg = ""
    request.session.save()
    if request.method == 'POST' and request.session.has_key('login'):
        upload_image = request.FILES['image']
        fs = FileSystemStorage('media/blog_uploads')
        filename = fs.save(upload_image.name, upload_image)
        time_now = return_date_time()
        blog_data(date=time_now[0], time=time_now[1], image_name=filename, content_text=request.POST['content'],
                  title=request.POST['title'], link=request.POST['link']).save()
        msg = 'blog successfully uploaded'
        return render(request, 'cis_website/upload_blog.html', {'msg': msg})
    elif request.session.has_key('login'):
        return render(request, 'cis_website/upload_blog.html')
    elif request.method == 'POST':
        uname = request.POST['username']
        password = request.POST['password']
        if uname == "LEO" and password == 'vitleoclub':
            request.session['login'] = 1
            return render(request, 'cis_website/upload_blog.html', {'msg': msg})
        else:
            return render(request, 'cis_website/blog_login.html', {'msg': "Username or password are incorrect"})
    else:
        return render(request, 'cis_website/blog_login.html')

def return_date_time():
    now = datetime.now()
    return now.strftime("%d/%m/%Y %H:%M:%S").split()

def robots(request):
    f = open('./templates/robots.txt', 'r')
    file = f.read()
    f.close()
    return HttpResponse(open('./templates/robots.txt', 'r'), content_type="text/plain")

def sitemap(request):
    return HttpResponse(open('./templates/sitemap.xml', 'r').read(), content_type='text/xml')
