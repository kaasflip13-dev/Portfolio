/* =========================================================
   IVAN'S PORTFOLIO
   APP.JS
   ========================================================= */


/* =========================================================
   JAAR
   ========================================================= */

const year = document.getElementById("year");

if (year) {
    year.textContent = "© " + new Date().getFullYear();
}


/* =========================================================
   MOBIEL MENU
   ========================================================= */

const menuButton =
    document.getElementById("menuButton");

const navMenu =
    document.getElementById("navMenu");


function closeMenu() {

    if (!navMenu) {
        return;
    }

    navMenu.classList.remove("open");

}


if (menuButton && navMenu) {

    menuButton.addEventListener("click", function () {

        navMenu.classList.toggle("open");

    });


    navMenu.querySelectorAll("a").forEach(function (link) {

        link.addEventListener("click", function () {

            closeMenu();

        });

    });

}


/* =========================================================
   NAVIGATIE ACTIVE LINK
   ========================================================= */

const sections =
    document.querySelectorAll("main section[id]");

const navLinks =
    document.querySelectorAll(".nav-link");


function updateActiveLink() {

    let currentSection = "home";

    const scrollPosition =
        window.scrollY + 180;

    sections.forEach(function (section) {

        const sectionTop =
            section.offsetTop;

        const sectionHeight =
            section.offsetHeight;

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navLinks.forEach(function (link) {

        const href =
            link.getAttribute("href");

        if (href === "#" + currentSection) {

            link.classList.add("active");

        } else {

            link.classList.remove("active");

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveLink,
    { passive: true }
);

updateActiveLink();


/* =========================================================
   PROJECT MODALS
   ========================================================= */

const projectButtons =
    document.querySelectorAll(".project-link");

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

    closeMenu();

    modal.classList.add("show");

    document.body.classList.add("modal-open");

}


function closeModals() {

    modals.forEach(function (modal) {

        modal.classList.remove("show");

    });

    document.body.classList.remove("modal-open");

}


/* OPEN */

projectButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const project =
            button.getAttribute("data-project");

        openModal(project);

    });

});


/* CLOSE BUTTON */

closeButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        closeModals();

    });

});


/* CLICK OUTSIDE */

modals.forEach(function (modal) {

    modal.addEventListener("click", function (event) {

        if (event.target === modal) {

            closeModals();

        }

    });

});


/* ESC */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            closeModals();

            closeMenu();

        }

    }
);


/* =========================================================
   SMOOTH SCROLL
   ========================================================= */

document.querySelectorAll(
    'a[href^="#"]'
).forEach(function (link) {

    link.addEventListener(
        "click",
        function (event) {

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

        }
    );

});


/* =========================================================
   SCROLL ANIMATIES
   ========================================================= */

const animatedElements =
    document.querySelectorAll(
        ".project-card, .learning-card, .about-card, .process"
    );


animatedElements.forEach(function (element) {

    element.classList.add("reveal");

});


const observer =
    new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


animatedElements.forEach(function (element) {

    observer.observe(element);

});


/* =========================================================
   PROJECT HOVER
   ========================================================= */

const projectCards =
    document.querySelectorAll(".project-card");


projectCards.forEach(function (card) {

    card.addEventListener(
        "mouseenter",
        function () {

            card.classList.add("is-hovered");

        }
    );


    card.addEventListener(
        "mouseleave",
        function () {

            card.classList.remove("is-hovered");

        }
    );

});


/* =========================================================
   MENU BUITEN KLIKKEN
   ========================================================= */

document.addEventListener(
    "click",
    function (event) {

        if (!navMenu || !menuButton) {
            return;
        }

        const clickedInsideMenu =
            navMenu.contains(event.target);

        const clickedButton =
            menuButton.contains(event.target);

        if (
            navMenu.classList.contains("open") &&
            !clickedInsideMenu &&
            !clickedButton
        ) {

            closeMenu();

        }

    }
);


/* =========================================================
   CONSOLE
   ========================================================= */

console.log(
    "Ivan's O&O portfolio is succesvol geladen!"
);
