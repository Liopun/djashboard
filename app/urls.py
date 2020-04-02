from django.urls import path, re_path
from . import views

urlpatterns = [
  path('', views.index, name='index'),
	path('dashboard/', views.dashboard, name='dashboard'),
  path('core/updest', views.updest, name='updest'),
  re_path(r'^.*\.html', views.pages, name='pages')
]
