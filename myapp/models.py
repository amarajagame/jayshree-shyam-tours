from django.db import models

from django.db import models


# =====================================================
# INDEX PAGE BOOKING
# =====================================================

class IndexBooking(models.Model):

    full_name = models.CharField(max_length=100)

    phone = models.CharField(max_length=15)

    pickup = models.CharField(max_length=100)

    destination = models.CharField(max_length=100)

    booking_date = models.DateField()

    trip_type = models.CharField(
        max_length=50,
        default="One Way"
    )

    passengers = models.IntegerField(
        default=1
    )

    route = models.CharField(
        max_length=200,
        default="N/A"
    )

    message = models.TextField(
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.full_name


# =====================================================
# PAMPHLET PAGE BOOKING
# =====================================================



class Booking(models.Model):

    full_name = models.CharField(max_length=100)

    phone = models.CharField(max_length=15)

    pickup = models.CharField(max_length=100)

    destination = models.CharField(max_length=100)

    booking_date = models.DateField()

    trip_type = models.CharField(
        max_length=50,
        default="One Way"
    )

    passengers = models.IntegerField(
        default=1
    )

    route = models.CharField(
        max_length=200,
        default="N/A"
    )

    message = models.TextField(
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )
    

def __str__(self):
        return self.full_name