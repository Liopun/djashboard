from django.contrib.auth.models import User, auth
from django.db import models

# Create your models here.
class Userprofile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default='')
    company = models.CharField(max_length=100, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    about = models.TextField(blank=True, null=True)
