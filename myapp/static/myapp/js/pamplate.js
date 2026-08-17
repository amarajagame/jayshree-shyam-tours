

document.addEventListener("DOMContentLoaded", function () {

    const popup =
        document.getElementById("bookingPopup");

    const closeButton =
        document.getElementById("closeBooking");

    const bookButtons =
        document.querySelectorAll(".book-now-btn");

    const selectedTourName =
        document.getElementById("selectedTourName");

    const selectedTourDuration =
        document.getElementById("selectedTourDuration");

    const selectedTourPrice =
        document.getElementById("selectedTourPrice");

    const tourNameInput =
        document.getElementById("tourNameInput");

    const tourDurationInput =
        document.getElementById("tourDurationInput");

    const tourPriceInput =
        document.getElementById("tourPriceInput");

    const bookingForm =
        document.getElementById("bookingForm");

    const successPopup =
        document.getElementById("bookingSuccessPopup");

    const closeSuccessPopup =
        document.getElementById("closeSuccessPopup");


    console.log(
        "Book Now buttons:",
        bookButtons.length
    );


    /* =========================
       BOOK NOW
    ========================= */

    bookButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const tourCard =
                button.closest(".tour-row");


            if (!tourCard) {

                console.error(
                    "Tour card not found"
                );

                return;
            }


            /* GET TOUR DATA */

            const tourName =
                tourCard.dataset.tour || "";

            const duration =
                tourCard.dataset.duration || "";

            const price =
                tourCard.dataset.price || "";


            console.log(
                "Tour:",
                tourName
            );

            console.log(
                "Duration:",
                duration
            );

            console.log(
                "Price:",
                price
            );


            /* SHOW SELECTED TOUR */

            if (selectedTourName) {

                selectedTourName.textContent =
                    tourName ||
                    "Your Selected Tour";
            }


            if (selectedTourDuration) {

                selectedTourDuration.textContent =
                    duration || "--";
            }


            if (selectedTourPrice) {

                selectedTourPrice.textContent =
                    price || "₹0";
            }


            /* HIDDEN FORM DATA */

            if (tourNameInput) {

                tourNameInput.value =
                    tourName;
            }


            if (tourDurationInput) {

                tourDurationInput.value =
                    duration;
            }


            if (tourPriceInput) {

                tourPriceInput.value =
                    price;
            }


            /* OPEN BOOKING POPUP */

            if (popup) {

                popup.classList.add("active");

                document.body.style.overflow =
                    "hidden";
            }

        });

    });


    /* =========================
       CLOSE BOOKING POPUP
    ========================= */

    if (closeButton) {

        closeButton.addEventListener(
            "click",
            function () {

                popup.classList.remove(
                    "active"
                );

                document.body.style.overflow =
                    "";

            }
        );

    }


    /* =========================
       OUTSIDE CLICK
    ========================= */

    if (popup) {

        popup.addEventListener(
            "click",
            function (event) {

                if (event.target === popup) {

                    popup.classList.remove(
                        "active"
                    );

                    document.body.style.overflow =
                        "";

                }

            }
        );

    }


    /* =========================
       ESC KEY
    ========================= */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                if (
                    popup &&
                    popup.classList.contains("active")
                ) {

                    popup.classList.remove(
                        "active"
                    );

                    document.body.style.overflow =
                        "";

                }

            }

        }
    );


    /* =========================
       BOOKING FORM SUBMIT
    ========================= */

    if (bookingForm) {

        bookingForm.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();


                /* =====================
                   OPEN BLANK TAB FIRST
                   ===================== */

                const whatsappWindow =
                    window.open(
                        "",
                        "_blank"
                    );


                /* =====================
                   FORM DATA
                   ===================== */

                const formData =
                    new FormData(
                        bookingForm
                    );


                try {

                    /* =====================
                       SEND TO DJANGO
                       ===================== */

                    const response =
                        await fetch(
                            bookingForm.action,
                            {
                                method: "POST",
                                body: formData,
                                headers: {
                                    "X-Requested-With":
                                        "XMLHttpRequest"
                                }
                            }
                        );


                    const data =
                        await response.json();


                    /* =====================
                       SUCCESS
                       ===================== */

                    if (
                        data.success &&
                        data.whatsapp_url
                    ) {

                        /* OPEN WHATSAPP */

                        if (whatsappWindow) {

                            whatsappWindow.location.href =
                                data.whatsapp_url;

                        } else {

                            window.open(
                                data.whatsapp_url,
                                "_blank"
                            );

                        }


                        /* CLOSE BOOKING POPUP */

                        if (popup) {

                            popup.classList.remove(
                                "active"
                            );

                        }


                        /* SHOW SUCCESS POPUP */

                        if (successPopup) {

                            successPopup.classList.add(
                                "active"
                            );

                        }


                        document.body.style.overflow =
                            "hidden";


                        /* RESET FORM */

                        bookingForm.reset();

                    } else {

                        /* CLOSE EMPTY WHATSAPP TAB */

                        if (whatsappWindow) {

                            whatsappWindow.close();

                        }

                        alert(
                            "Booking failed. Please try again."
                        );

                    }

                } catch (error) {

                    console.error(
                        "Booking Error:",
                        error
                    );


                    if (whatsappWindow) {

                        whatsappWindow.close();

                    }


                    alert(
                        "Something went wrong. Please try again."
                    );

                }

            }
        );

    }


    /* =========================
       CLOSE SUCCESS POPUP
    ========================= */

    if (closeSuccessPopup) {

        closeSuccessPopup.addEventListener(
            "click",
            function () {

                successPopup.classList.remove(
                    "active"
                );

                document.body.style.overflow =
                    "";

            }
        );

    }


    /* =========================
       SUCCESS POPUP OUTSIDE CLICK
    ========================= */

    if (successPopup) {

        successPopup.addEventListener(
            "click",
            function (event) {

                if (
                    event.target === successPopup
                ) {

                    successPopup.classList.remove(
                        "active"
                    );

                    document.body.style.overflow =
                        "";

                }

            }
        );

    }


    /* =========================
       ESC SUCCESS POPUP
    ========================= */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                successPopup &&
                successPopup.classList.contains("active")
            ) {

                successPopup.classList.remove(
                    "active"
                );

                document.body.style.overflow =
                    "";

            }

        }
    );

});