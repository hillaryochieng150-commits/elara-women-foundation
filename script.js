/* ==========================================
   ELARA WOMEN FOUNDATION
   JAVASCRIPT
========================================== */


/* ================= MOBILE MENU ================= */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        navMenu.classList.toggle("active");

        const icon = menuToggle.querySelector("i");

        if (navMenu.classList.contains("active")) {

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });


    /* Close mobile menu after clicking a link */

    navMenu.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("active");

            const icon = menuToggle.querySelector("i");

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        });

    });

}


/* ================= CONTACT FORM ================= */

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const subject =
            document.getElementById("subject").value.trim();

        const message =
            document.getElementById("message").value.trim();


        if (!name || !email || !subject || !message) {

            alert("Please complete all the fields.");

            return;
        }


        const emailSubject =
            encodeURIComponent(subject);

        const emailBody =
            encodeURIComponent(
                `Name: ${name}\n\n` +
                `Email: ${email}\n\n` +
                `Message:\n${message}`
            );


        const mailtoLink =
            `mailto:elarafoundation930@gmail.com?subject=${emailSubject}&body=${emailBody}`;


        window.location.href = mailtoLink;

    });

}


/* ================= CURRENT YEAR ================= */

const currentYear =
    document.getElementById("currentYear");

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* ================= SCROLL REVEAL ================= */

const revealElements =
    document.querySelectorAll(
        ".agenda-card, .impact-card, .story-card, .mission-box, .contact-item"
    );


const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("reveal", "active");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* ================= NAVBAR SCROLL ================= */

window.addEventListener("scroll", () => {

    const navbar =
        document.querySelector(".navbar");

    if (!navbar) return;

    if (window.scrollY > 50) {

        navbar.style.boxShadow =
            "0 10px 40px rgba(0,0,0,0.25)";

    } else {

        navbar.style.boxShadow = "none";

    }

});