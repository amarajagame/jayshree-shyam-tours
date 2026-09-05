from django.shortcuts import render, redirect

from urllib.parse import quote

from .models import Booking
from django.http import JsonResponse
from django.shortcuts import redirect
from urllib.parse import quote
from .models import IndexBooking

import os
import requests





def home(request):
    return render(request, 'myapp/index.html')



# view of whatsappp chat on index.html page of religous ,airpirt etc
def whatsapp_chat(request):
    phone = "9527825967"
    message = "Hi, I want to book a tour. Please share details."
    url = f"https://wa.me/{phone}?text={quote(message)}"
    return redirect(url)

def send_brevo_email(subject, message, to_email):
    url = "https://api.brevo.com/v3/smtp/email"

    headers = {
        "accept": "application/json",
        "api-key": os.environ.get("BREVO_API_KEY"),
        "content-type": "application/json",
    }

    data = {
        "sender": {
            "name": "Jayshree Shyam Tours & Travels",
            "email": "amarajagame1510@gmail.com"
        },
        "to": [{"email": to_email}],
        "subject": subject,
        "textContent": message,
    }

    response = requests.post(url, json=data, headers=headers)
    return response


def index_booking_whatsapp(request):

    if request.method == "POST":

        full_name = request.POST.get("full_name")
        phone = request.POST.get("phone")
        email = request.POST.get("email")
        booking_date = request.POST.get("booking_date")
        pickup = request.POST.get("pickup")
        destination = request.POST.get("destination")
        trip_type = request.POST.get("trip_type")
        passengers = request.POST.get("passengers")
        route = request.POST.get("route")
        message = request.POST.get("message")

        IndexBooking.objects.create(
            full_name=full_name,
            phone=phone,
            email=email,
            pickup=pickup,
            destination=destination,
            booking_date=booking_date,
            trip_type=trip_type,
            passengers=passengers,
            route=route,
            message=message,
        )

        admin_email_subject = "New Tour Booking Received"

        admin_email_message = f"""
NEW TOUR BOOKING

Customer Details

Name: {full_name}
Phone: {phone}
Email: {email}

Travel Date: {booking_date}
Passengers: {passengers}

Trip Type: {trip_type}

Pickup Location:
{pickup}

Destination:
{destination}

Route:
{route}

Additional Message:
{message if message else "None"}

Jayshree Shyam Tours & Travels
"""

        send_brevo_email(
            admin_email_subject,
            admin_email_message,
            "amarajagame1510@gmail.com"
        )

        customer_email_subject = (
            "Booking Received - Jayshree Shyam Tours & Travels"
        )

        customer_email_message = f"""
Hello {full_name},

Thank you for choosing Jayshree Shyam Tours & Travels.

Your booking request has been received successfully.

Booking Details

Travel Date: {booking_date}
Passengers: {passengers}
Trip Type: {trip_type}

Pickup Location:
{pickup}

Destination:
{destination}

Our team will review your booking details and contact you shortly.

If you have any questions, please feel free to contact us.

Thank you for choosing
Jayshree Shyam Tours & Travels.

Regards,
Jayshree Shyam Tours & Travels
"""

        send_brevo_email(
            customer_email_subject,
            customer_email_message,
            email
        )

        whatsapp_message = f"""
*NEW BOOKING*

*Customer Details*

Name: {full_name}
Phone: {phone}
Email: {email}

Travel Date: {booking_date}
Passengers: {passengers}

Trip Type: {trip_type}

Pickup Location:
{pickup}

Destination:
{destination}

Route:
{route}

Additional Message:
{message if message else "None"}

Jayshree Shyam Tours & Travels
"""

        whatsapp_number = "9527825967"

        whatsapp_url = (
            f"https://wa.me/{whatsapp_number}"
            f"?text={quote(whatsapp_message)}"
        )

        return redirect(whatsapp_url)

    return redirect("home")
def booking_whatsapp(request):

    if request.method == "POST":

        full_name = request.POST.get("full_name")
        phone = request.POST.get("phone")
        email = request.POST.get("email")
        travel_date = request.POST.get("booking_date")
        passengers = request.POST.get("passengers")
        trip_type = request.POST.get("trip_type")
        pickup = request.POST.get("pickup")
        destination = request.POST.get("destination")
        message = request.POST.get("message")

        tour_name = request.POST.get("tour_name", "N/A")
        duration = request.POST.get("duration", "N/A")
        price = request.POST.get("price", "N/A")

        booking = Booking.objects.create(
            full_name=full_name,
            phone=phone,
            email=email,
            pickup=pickup,
            destination=tour_name,
            booking_date=travel_date,
            trip_type=trip_type,
            passengers=passengers,
            route=duration,
            message=message,
        )

        admin_email_subject = "New Tour Booking Received"

        admin_email_message = f"""
NEW TOUR BOOKING

TOUR DETAILS

Tour: {tour_name}
Duration: {duration}
Price: {price}

CUSTOMER DETAILS

Name: {full_name}
Phone: {phone}
Email: {email}

Travel Date: {travel_date}
Passengers: {passengers}

Trip Type: {trip_type}

Pickup Location:
{pickup}

Destination:
{destination}

Additional Message:
{message if message else "None"}

Jayshree Shyam Tours & Travels
"""

        send_brevo_email(
            admin_email_subject,
            admin_email_message,
            "amarajagame1510@gmail.com"
        )

        customer_email_subject = (
            "Booking Received - Jayshree Shyam Tours & Travels"
        )

        customer_email_message = f"""
Hello {full_name},

Thank you for choosing Jayshree Shyam Tours & Travels.

Your booking request has been received successfully.

BOOKING DETAILS

Tour: {tour_name}
Duration: {duration}

Travel Date: {travel_date}
Passengers: {passengers}

Trip Type: {trip_type}

Pickup Location:
{pickup}

Destination:
{destination}

Our team will review your booking details
and contact you shortly.

If you have any questions, please feel free
to contact us.

Thank you for choosing
Jayshree Shyam Tours & Travels.

Regards,
Jayshree Shyam Tours & Travels
"""

        send_brevo_email(
            customer_email_subject,
            customer_email_message,
            email
        )

        whatsapp_message = f"""
*NEW BOOKING*

*Tour Details*

Tour: {tour_name}
Duration: {duration}
Price: {price}

*Customer Details*

Name: {full_name}
Phone: {phone}
Email: {email}

Travel Date: {travel_date}
Passengers: {passengers}

Trip Type: {trip_type}

Pickup Location:
{pickup}

Destination:
{destination}

Additional Message:
{message if message else "None"}

Jayshree Shyam Tours & Travels
"""

        whatsapp_number = "919527825967"

        whatsapp_url = (
            f"https://wa.me/{whatsapp_number}"
            f"?text={quote(whatsapp_message)}"
        )

        return JsonResponse({
            "success": True,
            "whatsapp_url": whatsapp_url
        })

    return JsonResponse({
        "success": False,
        "message": "Invalid request"
    }, status=400)