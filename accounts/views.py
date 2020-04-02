from django.shortcuts import render, redirect
from django.contrib.auth.models import User, auth
from django.contrib import messages
from django.template import loader
from django.http import HttpResponse, JsonResponse
import logging

from app.models import Userprofile

logging.config.dictConfig({
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'console': {
            'format': '%(name)-12s %(levelname)-8s %(message)s'
        },
        'file': {
            'format': '%(asctime)s %(name)-12s %(levelname)-8s %(message)s'
        }
    },
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'formatter': 'console'
        },
        'file': {
            'level': 'DEBUG',
            'class': 'logging.FileHandler',
            'formatter': 'file',
            'filename': '/tmp/debug.log'
        }
    },
    'loggers': {
        '': {
            'level': 'DEBUG',
            'handlers': ['console', 'file']
        }
    }
})

logger = logging.getLogger(__name__)

def login(request):
  
  if request.method == 'POST':
    logger.info(request.POST)
    username = request.POST['lg_username']
    password = request.POST['lg_password']

    user = auth.authenticate(username=username, password=password)

    if user is not None:
        auth.login(request, user)
        context = {
          'output' : True,
          'message' : 'Success'
        }
        return JsonResponse(context)
        # return redirect('./dashboard.html')
    else:
        context = {
          'output' : False,
          'message' : 'Invalid Credentials'
        }
        return JsonResponse(context)
  else:
    return render(request, 'accounts/login.html')

def register(request):
  
  if request.method == 'POST':
      username = request.POST['reg_username']
      password = request.POST['reg_password']
      password1 = request.POST['reg_password_confirm']
      email = request.POST['reg_email']
      firstname = request.POST['reg_firstname']
      lastname = request.POST['reg_lastname']

      context = {
        'output' : False,
        'message' : 'Invalid Credentials'
      }

      if password == password1:
          if User.objects.filter(username=username).exists():
              messages.info(request, 'Username Taken')
              context['output'] = False
              context['message'] = 'Username Taken'
              return JsonResponse(context)
          else:
              user = User.objects.create_user(username=username, password=password1, first_name=firstname, last_name=lastname, email=email)
              user.save()

              usr = Userprofile.objects.create(user_id=user.id)
              usr.save()

              context['output'] = True
              context['message'] = 'User Created'
              
              return JsonResponse(context)
      else:
          context['output'] = False
          context['message'] = 'Password Not Matching'
          
          return JsonResponse(context)
      
  else:
      return render(request, 'accounts/register.html')

def logout(request):
    auth.logout(request)
    return redirect('accounts/login.html')
