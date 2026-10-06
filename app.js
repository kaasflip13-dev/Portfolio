/* =========================================================
   IVAN'S PORTFOLIO
   APP.JS
   ========================================================= */


/* -------------------------
   JAAR IN FOOTER
------------------------- */

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = "© " + new Date().getFullYear();
}


/* -------------------------
   MOBIEL MENU
------------------------- */

const menuButton = document.getElementById("menuButton");
const navMenu = document.getElementById("navMenu");

if (menuButton && navMenu) {

    menuButton.addEventListener("click", function () {

        navMenu.classList.toggle("open");

        if (navMenu.classList.contains("open")) {
            menuButton.textContent = "✕";
        } else {
            menuButton.textContent = "☰";
        }

    });


    const navLinks = navMenu.querySelectorAll("a");

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            navMenu.classList.remove("open");

            menuButton.textContent = "☰";

        });

    });

}


/* -------------------------
   PROJECT MODALS
------------------------- */

const projectButtons =
    document.querySelectorAll(".project-button");

const modals =
    document.querySelectorAll(".modal");

const closeButtons =
    document.querySelectorAll(".close-modal");


function openModal(number) {

    const modal =
        document.getElementById("modal" + number);

    if (!modal) {
        return;
    }

    modal.classList.add("show");

    document.body.style.overflow = "hidden";

}


function closeAllModals() {

    modals.forEach(function (modal) {

        modal.classList.remove("show");

    });

    document.body.style.overflow = "";

}


/* Openen */

projectButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const projectNumber =
            button.getAttribute("data-project");

        openModal(projectNumber);

    });

});


/* Sluiten */

closeButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        closeAllModals();

    });

});


/* Klik naast venster */

modals.forEach(function (modal) {

    modal.addEventListener("click", function (event) {

        if (event.target === modal) {

            closeAllModals();

        }

    });

});


/* ESCAPE */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        closeAllModals();

    }

});


/* -------------------------
   SMOOTH SCROLL
------------------------- */

document.querySelectorAll('a[href^="#"]').forEach(function (link) {

    link.addEventListener("click", function (event) {

        const targetId =
            link.getAttribute("href");

        if (
            !targetId ||
            targetId === "#"
        ) {
            return;
        }

        const target =
            document.querySelector(targetId);

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


/* -------------------------
   KLEINE HOVER EFFECTEN
------------------------- */

const cards =
    document.querySelectorAll(
        ".project-card, .learning-card"
    );

cards.forEach(function (card) {

    card.addEventListener("mouseenter", function () {

        card.classList.add("hovered");

    });

    card.addEventListener("mouseleave", function () {

        card.classList.remove("hovered");

    });

});


/* -------------------------
   ESCAPE VOOR MENU
------------------------- */

document.addEventListener("keydown", function (event) {

    if (
        event.key === "Escape" &&
        navMenu
    ) {

        navMenu.classList.remove("open");

        if (menuButton) {
            menuButton.textContent = "☰";
        }

    }

});


/* -------------------------
   STARTMELDING
------------------------- */

console.log(
    "Ivan's O&O Portfolio is geladen!"
);
