/* =========================================================
   IVAN'S O&O PORTFOLIO
   Simpele JavaScript
========================================================= */


/* =========================================================
   JAARTAL
========================================================= */

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


/* =========================================================
   MOBIEL MENU
========================================================= */

const menuButton = document.getElementById("menuButton");
const navMenu = document.getElementById("navMenu");

if (menuButton && navMenu) {

    menuButton.addEventListener("click", () => {
        navMenu.classList.toggle("open");
    });


    const navLinks = navMenu.querySelectorAll("a");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {
            navMenu.classList.remove("open");
        });

    });

}


/* =========================================================
   PROJECT MODALS OPENEN
========================================================= */

const openButtons = document.querySelectorAll("[data-open-project]");

openButtons.forEach(button => {

    button.addEventListener("click", () => {

        const modalId = button.getAttribute("data-open-project");

        const modal = document.getElementById(modalId);

        if (!modal) {
            return;
        }

        modal.classList.add("show");

        document.body.style.overflow = "hidden";

    });

});


/* =========================================================
   MODALS SLUITEN
========================================================= */

const modals = document.querySelectorAll(".modal");

modals.forEach(modal => {

    const closeButton = modal.querySelector(".modal-close");

    if (closeButton) {

        closeButton.addEventListener("click", () => {
            closeModal(modal);
        });

    }


    modal.addEventListener("click", event => {

        if (event.target === modal) {
            closeModal(modal);
        }

    });

});


function closeModal(modal) {

    modal.classList.remove("show");

    document.body.style.overflow = "";

}


/* =========================================================
   ESCAPE OM MODAL TE SLUITEN
========================================================= */

document.addEventListener("keydown", event => {

    if (event.key !== "Escape") {
        return;
    }

    modals.forEach(modal => {

        if (modal.classList.contains("show")) {
            closeModal(modal);
        }

    });

});


/* =========================================================
   AFBEELDINGEN
   Als een afbeelding niet bestaat, laten we een nette
   melding zien in plaats van een kapot plaatje.
========================================================= */

const images = document.querySelectorAll("img");

images.forEach(image => {

    image.addEventListener("error", () => {

        image.style.display = "none";

        const container = image.parentElement;

        if (container) {

            container.style.display = "flex";
            container.style.alignItems = "center";
            container.style.justifyContent = "center";

            if (!container.querySelector(".image-error")) {

                const message = document.createElement("div");

                message.className = "image-error";

                message.innerHTML = `
                    <div style="
                        text-align:center;
                        color:#68758a;
                        padding:20px;
                    ">
                        <div style="
                            font-size:2rem;
                            margin-bottom:8px;
                        ">📷</div>

                        <strong>Afbeelding niet gevonden</strong>

                        <div style="
                            font-size:0.85rem;
                            margin-top:4px;
                        ">
                            Controleer de bestandsnaam.
                        </div>
                    </div>
                `;

                container.appendChild(message);

            }

        }

    });

});


/* =========================================================
   KLEINE SCROLL ANIMATIE
========================================================= */

const animatedItems = document.querySelectorAll(
    ".project-card, .learning-card, .about-box, .final-card"
);


const observer = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.08
    }
);


animatedItems.forEach(item => {

    item.style.opacity = "0";
    item.style.transform = "translateY(12px)";
    item.style.transition =
        "opacity 0.5s ease, transform 0.5s ease";

    observer.observe(item);

});


/* =========================================================
   SMOOTH SCROLL VOOR ANKERS
========================================================= */

const anchorLinks = document.querySelectorAll('a[href^="#"]');

anchorLinks.forEach(link => {

    link.addEventListener("click", event => {

        const targetId = link.getAttribute("href");

        if (!targetId || targetId === "#") {
            return;
        }

        const target = document.querySelector(targetId);

        if (!target) {
            return;
        }

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


/* =========================================================
   PROJECT HOVER
========================================================= */

const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.classList.add("is-hovered");

    });

    card.addEventListener("mouseleave", () => {

        card.classList.remove("is-hovered");

    });

});


/* =========================================================
   KLAAR
========================================================= */

console.log("Ivan's O&O portfolio is geladen!");
