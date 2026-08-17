from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path("whatsapp/", views.whatsapp_chat, name="whatsapp_chat"),
   
     path(
        "booking-whatsapp/",
        views.booking_whatsapp,
        name="booking_whatsapp"
    ),
    path('pamphlets/', views.pamphlets, name='pamphlets'),
   

]