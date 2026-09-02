

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



/* =========================================================
   FAMOUS PLACES POPUP
========================================================= */

function openFamousPlaces() {

    const popup = document.getElementById("famousPlacesPopup");

    if (popup) {
        popup.classList.add("show");

        // Reset city selection
        const citySelector =
            document.getElementById("citySelector");

        if (citySelector) {
            citySelector.value = "";
        }

        // Reset result
        const result =
            document.getElementById("famousPlacesResult");

        if (result) {
            result.innerHTML = `
                <p class="select-city-message">
                    👆 Please select a city to view famous places.
                </p>
            `;
        }
    }
}


/* =========================================================
   CLOSE FAMOUS PLACES POPUP
========================================================= */

function closeFamousPlaces() {

    const popup =
        document.getElementById("famousPlacesPopup");

    if (popup) {
        popup.classList.remove("show");
    }
}


/* =========================================================
   FAMOUS PLACES DATA
========================================================= */
const famousPlacesData = {

    /* =====================================================
       MAHABALESHWAR
    ===================================================== */

   /* =========================================================
   IMPORTANT: Image filenames neeche update kar diye hain
   taaki wo aapke folder (screenshot mein dikhe) ke actual
   filenames se match ho jayein — no hyphens, short names.

   Agar koi image phir bhi nahi dikh rahi, to us specific
   name ko apne folder mein dekh kar exact match kar lena
   (extension .jpg / .png bhi check kar lena, kyunki Windows
   Explorer extension hide karke rakhta hai by default).
========================================================= */


    /* =====================================================
       MAHABALESHWAR
    ===================================================== */

    mahabaleshwar: {

        title: "📍 Famous Places in Mahabaleshwar",

        places: [
            { name: "Venna Lake", image: "vennalake.jpg", description: "A beautiful lake surrounded by hills, popular for boating and peaceful views." },
            { name: "Mapro Garden", image: "maprogarden.jpg", description: "A popular tourist attraction known for strawberries, chocolates and scenic surroundings." },
            { name: "Arthur's Seat", image: "arthurseat.jpg", description: "One of Mahabaleshwar's famous viewpoints offering beautiful valley and mountain views." },
            { name: "Elephant's Head Point", image: "elephanthead.jpg", description: "A scenic viewpoint famous for its unique rock formation and panoramic mountain views." },
            { name: "Lingmala Waterfall", image: "lingmala.jpg", description: "A beautiful waterfall surrounded by lush greenery and natural scenery." },
            { name: "Pratapgad Fort", image: "pratapgad.jpg", description: "A historic hill fort surrounded by the beautiful Sahyadri mountain landscape." }
        ]
    },

    /* =====================================================
       LONAVALA & KHANDALA
    ===================================================== */

    lonavala: {

        title: "📍 Famous Places in Lonavala & Khandala",

        places: [
            { name: "Bhushi Dam", image: "bhushidam.jpg", description: "A popular monsoon destination known for its flowing water and beautiful surroundings." },
            { name: "Tiger Point", image: "tigerpoint.jpg", description: "A famous viewpoint offering beautiful valley and mountain views." },
            { name: "Rajmachi Point", image: "rajmachipoint.jpg", description: "A scenic viewpoint with spectacular views of Rajmachi Fort and surrounding valleys." },
            { name: "Karla Caves", image: "karlacaves.jpg", description: "Ancient Buddhist rock-cut caves known for their impressive architecture." },
            { name: "Lohagad Fort", image: "lohagad.jpg", description: "A historic hill fort popular among visitors for trekking and scenic views." },
            { name: "Khandala", image: "khandala.jpg", description: "A beautiful hill station surrounded by green valleys and mountain landscapes." }
        ]
    },

    /* =====================================================
       PUNE
    ===================================================== */

    pune: {

        title: "📍 Famous Places in Pune",

        places: [
            { name: "Shaniwar Wada", image: "shaniwarwada.jpg", description: "A historic fortification and one of Pune's most famous landmarks." },
            { name: "Aga Khan Palace", image: "agakhanpalace.jpg", description: "A historic palace known for its beautiful architecture and important history." },
            { name: "Sinhagad Fort", image: "sinhagad.jpg", description: "A historic hill fort offering beautiful views and a popular trekking experience." },
            { name: "Dagdusheth Halwai Temple", image: "dagdusheth.jpg", description: "A famous Ganpati temple located in the heart of Pune." },
            { name: "Saras Baug", image: "sarasbaug.jpg", description: "A peaceful garden and popular recreational spot in Pune." },
            { name: "Lal Mahal", image: "lalmahal.jpg", description: "A historic landmark associated with the history of Chhatrapati Shivaji Maharaj." }
        ]
    },

    /* =====================================================
       UJJAIN
    ===================================================== */

    ujjain: {

        title: "📍 Famous Places in Ujjain",

        places: [
            { name: "Mahakaleshwar Temple", image: "mahakaleshwar.jpg", description: "One of the most important Shiva temples and a major pilgrimage destination." },
            { name: "Kal Bhairav Temple", image: "kalbhairav.jpg", description: "A famous ancient temple dedicated to Lord Kal Bhairav." },
            { name: "Ram Ghat", image: "ramghat.jpg", description: "A famous riverside ghat on the banks of the Shipra River." },
            { name: "Harsiddhi Temple", image: "harsiddhi.jpg", description: "A historic and important temple located near the Mahakaleshwar area." },
            { name: "Mangalnath Temple", image: "mangalnath.jpg", description: "A popular temple and peaceful spiritual destination in Ujjain." },
            { name: "Vedh Shala", image: "vedhshala.jpg", description: "An historic astronomical observatory known for its traditional astronomical instruments." }
        ]
    },

    /* =====================================================
       BHIMASHANKAR
    ===================================================== */

    bhimashankar: {

        title: "📍 Famous Places in Bhimashankar",

        places: [
            { name: "Bhimashankar Temple", image: "bhimashankartemple.jpg", description: "A famous Jyotirlinga temple surrounded by the beautiful Sahyadri hills." },
            { name: "Bhimashankar Wildlife Sanctuary", image: "bhimashankarwildlife.jpg", description: "A beautiful forest area known for its rich greenery and wildlife." },
            { name: "Bhorgiri Waterfall", image: "bhorgiri.jpg", description: "A scenic waterfall surrounded by natural greenery." },
            { name: "Hanuman Lake", image: "hanumanlake.jpg", description: "A peaceful natural spot surrounded by greenery and hills." },
            { name: "Gupt Bhimashankar", image: "guptbhimashankar.jpg", description: "A peaceful natural and spiritual spot located in the Bhimashankar region." }
        ]
    },

    /* =====================================================
       TRIMBAKESHWAR
    ===================================================== */

    trimbakeshwar: {

        title: "📍 Famous Places in Trimbakeshwar",

        places: [
            { name: "Trimbakeshwar Temple", image: "trimbakeshwartemple.jpg", description: "A famous Jyotirlinga temple and important pilgrimage destination." },
            { name: "Brahmagiri Hills", image: "brahmagiri.jpg", description: "Beautiful hills associated with the origin of the Godavari River." },
            { name: "Kushavarta Kund", image: "kushavarta.jpg", description: "A sacred water tank located near the Trimbakeshwar Temple." },
            { name: "Gangadwar", image: "gangadwar.jpg", description: "A spiritual destination located in the Brahmagiri hill region." },
            { name: "Anjaneri Hills", image: "anjaneri.jpg", description: "A scenic hill region known for trekking, nature and religious significance." }
        ]
    },

    /* =====================================================
       AKKALKOT
    ===================================================== */

    akkalkot: {

        title: "📍 Famous Places in Akkalkot",

        places: [
            { name: "Swami Samarth Temple", image: "swamisamarth.jpg", description: "A major spiritual destination associated with Shri Swami Samarth." },
            { name: "Vatavruksha Mandir", image: "vatavruksha.jpg", description: "A famous spiritual place known for its sacred banyan tree." },
            { name: "Samadhi Math", image: "samadhimath.jpg", description: "An important spiritual place visited by devotees." },
            { name: "Akkalkot Temple", image: "akkalkotpalace.jpg", description: "A popular pilgrimage destination in Akkalkot." }
        ]
    },

    /* =====================================================
       KOLHAPUR
    ===================================================== */

    kolhapur: {

        title: "📍 Famous Places in Kolhapur",

        places: [
            { name: "Mahalaxmi Temple", image: "mahalaxmi.jpg", description: "One of Kolhapur's most famous religious and cultural landmarks." },
            { name: "Panhala Fort", image: "panhala.jpg", description: "A historic hill fort offering beautiful views of the surrounding region." },
            { name: "Jyotiba Temple", image: "jyotiba.jpg", description: "A popular hilltop temple and pilgrimage destination near Kolhapur." },
            { name: "Rankala Lake", image: "rankala.jpg", description: "A beautiful lake and popular evening destination in Kolhapur." },
            { name: "Balu Mama Temple", image: "balumama.jpg", description: "A spiritual destination visited by devotees in the region." }
        ]
    },

    /* =====================================================
       SAMBHAJI NAGAR
    ===================================================== */

    sambhajinagar: {

        title: "📍 Famous Places in Sambhaji Nagar",

        places: [
            { name: "Bibi Ka Maqbara", image: "bibikamaqbara.jpg", description: "A famous historical monument known for its beautiful Mughal-style architecture." },
            { name: "Daulatabad Fort", image: "daulatabad.jpg", description: "A historic hill fort famous for its impressive defensive architecture." },
            { name: "Ellora Caves", image: "ellora.jpg", description: "A UNESCO World Heritage Site featuring remarkable rock-cut monuments." },
            { name: "Grishneshwar Temple", image: "grishneshwar.jpg", description: "A famous Jyotirlinga temple located near the Ellora Caves." },
            { name: "Ajanta Caves", image: "ajanta.jpg", description: "Historic rock-cut caves famous for ancient Buddhist paintings and sculptures." }
        ]
    },

    /* =====================================================
       GOA
    ===================================================== */

    goa: {

        title: "📍 Famous Places in Goa",

        places: [
            { name: "Baga Beach", image: "baga.jpg", description: "A popular beach known for its lively atmosphere and beautiful coastline." },
            { name: "Calangute Beach", image: "calangute.jpg", description: "One of Goa's most popular beaches with a long sandy coastline." },
            { name: "Anjuna Beach", image: "anjuna.jpg", description: "A famous beach known for its scenic views and relaxed atmosphere." },
            { name: "Basilica of Bom Jesus", image: "bomjesus.jpg", description: "A historic church and important heritage attraction in Goa." },
            { name: "Palolem Beach", image: "palolem.jpg", description: "A beautiful beach known for its peaceful surroundings and scenic coastline." },
            { name: "Fort Aguada", image: "aguada.jpg", description: "A historic Portuguese fort overlooking the Arabian Sea." }
        ]
    },

    /* =====================================================
       AGRA
    ===================================================== */

    agra: {

        title: "📍 Famous Places in Agra",

        places: [
            { name: "Taj Mahal", image: "tajmahal.jpg", description: "One of India's most famous monuments and a UNESCO World Heritage Site." },
            { name: "Agra Fort", image: "agrafort.jpg", description: "A historic Mughal fort known for its impressive architecture." },
           
            { name: "Mehtab Bagh", image: "mehtabbagh.jpg", description: "A garden offering beautiful views of the Taj Mahal across the Yamuna River." },
            { name: "Fatehpur Sikri", image: "fatehpursikri.jpg", description: "A historic Mughal city known for its grand architectural monuments." }
        ]
    }

};


/* =========================================================
   SHOW FAMOUS PLACES AFTER CITY SELECTION
========================================================= */

function showFamousPlaces() {

    const citySelector = document.getElementById("citySelector");
    const result = document.getElementById("famousPlacesResult");

    if (!citySelector || !result) {
        return;
    }

    const selectedCity = citySelector.value;

    if (!selectedCity) {
        result.innerHTML = `
            <p class="select-city-message">
                👆 Please select a city to view famous places.
            </p>
        `;
        return;
    }

    const city = famousPlacesData[selectedCity];

    if (!city) {
        return;
    }

    let placesHTML = "";

    city.places.forEach(function (place) {

        placesHTML += `
            <div class="famous-place-card">
                <img
                    src="/static/myapp/images/famous_places/${place.image}"
                    alt="${place.name}"
                    class="famous-place-image"
                >
                <div class="famous-place-content">
                    <h4>${place.name}</h4>
                    <p>${place.description}</p>
                </div>
            </div>
        `;
    });

    result.innerHTML = `
        <h3 class="famous-city-title">${city.title}</h3>
        <div class="famous-place-grid">
            ${placesHTML}
        </div>
    `;
}


/* =========================================================
   CLOSE POPUP WHEN CLICKING OUTSIDE
========================================================= */

document.addEventListener("click", function (event) {
    const popup = document.getElementById("famousPlacesPopup");
    if (!popup) return;
    if (event.target === popup) {
        closeFamousPlaces();
    }
});


/* =========================================================
   ESC KEY CLOSE
========================================================= */

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeFamousPlaces();
    }
});