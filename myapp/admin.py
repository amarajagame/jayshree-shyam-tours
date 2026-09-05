from django.contrib import admin
from .models import Booking


from .models import IndexBooking


# =====================================================
# INDEX BOOKING ADMIN
# =====================================================

@admin.register(IndexBooking)
class IndexBookingAdmin(admin.ModelAdmin):

    list_display = (
        "full_name",
        "phone",
        "email",
        "booking_date",
        "pickup",
        "destination",
        "trip_type",
        "passengers",
        "created_at",
    )

    list_filter = (
        "booking_date",
        "trip_type",
        "created_at",
    )

    search_fields = (
        "full_name",
        "phone",
        "email",
        "pickup",
        "destination",
    )

    ordering = (
        "-created_at",
    )


# =====================================================
# PAMPHLET BOOKING ADMIN


#booking of both whatsapp chat also the booking of pamplate 
@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):

    list_display = (
        "full_name",
        "phone",
        "pickup",
        "destination",
        "booking_date",
        "trip_type",
        "passengers",
        "route",
        "created_at",
    )

    search_fields = (
        "full_name",
        "phone",
        "pickup",
        "destination",
        "route",
    )

    list_filter = (
        "booking_date",
        "trip_type",
        "created_at",
    )

    ordering = (
        "-created_at",
    )