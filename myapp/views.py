from django.shortcuts import render, redirect

from urllib.parse import quote

from .models import Booking
from django.http import JsonResponse
from django.shortcuts import redirect
from urllib.parse import quote



def home(request):
    return render(request, 'myapp/index.html')



# view of whatsappp chat on index.html page of religous ,airpirt etc
def whatsapp_chat(request):
    phone = "8767099642"
    message = "Hi, I want to book a tour. Please share details."
    url = f"https://wa.me/{phone}?text={quote(message)}"
    return redirect(url)





# Booking model ka import already hai to dobara mat karo
# from .models import Booking


def booking_whatsapp(request):

    if request.method == "POST":

        # =========================
        # GET FORM DATA
        # =========================

        full_name = request.POST.get("full_name")
        phone = request.POST.get("phone")
        travel_date = request.POST.get("booking_date")
        passengers = request.POST.get("passengers")
        trip_type = request.POST.get("trip_type")
        pickup = request.POST.get("pickup")
        destination = request.POST.get("destination")
        message = request.POST.get("message")

        # =========================
        # TOUR DATA
        # =========================

        tour_name = request.POST.get(
            "tour_name",
            "N/A"
        )

        duration = request.POST.get(
            "duration",
            "N/A"
        )

        price = request.POST.get(
            "price",
            "N/A"
        )

        # =========================
        # SAVE BOOKING
        # =========================

        booking = Booking.objects.create(

            full_name=full_name,

            phone=phone,

            pickup=pickup,

            destination=tour_name,

            booking_date=travel_date,

            trip_type=trip_type,

            passengers=passengers,

            route=duration,

            message=message,

        )

        # =========================
        # WHATSAPP MESSAGE
        # =========================

        whatsapp_message = f"""
*NEW BOOKING*

━━━━━━━━━━━━━━━━━━
*Tour Details*
━━━━━━━━━━━━━━━━━━

Tour: {tour_name}
Duration: {duration}
Price: {price}

━━━━━━━━━━━━━━━━━━
*Customer Details*
━━━━━━━━━━━━━━━━━━

Name: {full_name}
Phone: {phone}

Travel Date: {travel_date}
Passengers: {passengers}

Trip Type: {trip_type}

Pickup Location:
{pickup}

Destination:
{destination}

Additional Message:
{message if message else "None"}

━━━━━━━━━━━━━━━━━━

Jayshree Shyam Tours & Travels
"""

        # =========================
        # OWNER WHATSAPP NUMBER
        # =========================

        whatsapp_number = "918767099642"

        whatsapp_url = (
            f"https://wa.me/{whatsapp_number}"
            f"?text={quote(whatsapp_message)}"
        )

        # =========================
        # SEND WHATSAPP URL TO JS
        # =========================

        return JsonResponse({
            "success": True,
            "whatsapp_url": whatsapp_url
        })

    return JsonResponse({
        "success": False,
        "message": "Invalid request"
    }, status=400)


def pamphlets(request):
    return render(
        request,
        "myapp/pamphlets.html"
    )