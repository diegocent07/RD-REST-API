from django.urls import path
from . import views
urlpatterns = [
    path('', views.index) #se carga el método index del archivo views.
]
