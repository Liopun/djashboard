from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User, auth
from django.contrib import messages
from django.template import loader, Context
from django.http import HttpResponse
import logging

from . models import Userprofile

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

# Create your views here.
@login_required(login_url="login")
def index(request):
    return redirect('/core/dashboard.html')

@login_required(login_url="login")
def dashboard(request):
  return redirect('/core/dashboard.html')

@login_required(login_url="login")
def pages(request):
  
  context = dict({'user_data': Userprofile.objects.all()})
  # All resource paths end in .html.
  # Pick out the html file name from the url. And load that template.
  data = Userprofile.objects.get(user_id=request.user.id)
  # logger.info()
  try:
    load_template = request.path.split('/')[-1]
    # template = loader.get_template('core/' + load_template)
    # return HttpResponse(template.render(context, request))
    # return render(request, 'core/' + load_template, {'user_data': user_data[0]})
    return render(request, 'core/' + load_template, {'profile': data})
  except:
    return render(request, '/')

@login_required(login_url="login")
def updest(request):
    messages.info(request, '')
    context = {
      'output' : False,
      'message' : 'Invalid Credentials'
    }
    if request.method == 'POST':
        company = request.POST['company']
        firstname = request.POST['firstname']
        lastname = request.POST['lastname']
        email = request.POST['email']
        address = request.POST['address']
        aboutme = request.POST['aboutme']

        usr, boolCreated = Userprofile.objects.update_or_create(user_id=request.user.id, defaults={'company': company, 'address': address, 'about': aboutme})

        if boolCreated:
            messages.info(request, 'Something went wrong, try again!')
        else:
            messages.info(request, 'Profile Updated!')

        return redirect('./user.html')
    else:
        return redirect('./user.html')
