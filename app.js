/* =========================================================
   IVAN'S PORTFOLIO
   JAVASCRIPT
   ========================================================= */


/* ---------------------------------------------------------
   ELEMENTEN
--------------------------------------------------------- */

const mobileMenuButton =
    document.getElementById("mobileMenuButton");

const mobileMenu =
    document.getElementById("mobileMenu");

const backToTop =
    document.getElementById("backToTop");

const yearElement =
    document.getElementById("year");

const navLinks =
    document.querySelectorAll(".nav-link");

const sections =
    document.querySelectorAll("section[id]");

const projectOpenButtons =
    document.querySelectorAll("[data-open-project]");

const closeButtons =
    document.querySelectorAll("[data-close-modal]");

const modals =
    document.querySelectorAll(".modal");


/* ---------------------------------------------------------
   JAARTAL
--------------------------------------------------------- */

if (yearElement) {
    yearElement.textContent =
        new Date().getFullYear();
}


/* ---------------------------------------------------------
   MOBIEL MENU
--------------------------------------------------------- */

function toggleMobileMenu() {

    if (!mobileMenu) return;

    mobileMenu.classList.toggle("open");

}


if (mobileMenuButton) {

    mobileMenuButton.addEventListener(
        "click",
        toggleMobileMenu
    );

}


/* Sluit mobiel menu wanneer een link wordt aangeklikt */

if (mobileMenu) {

    const mobileLinks =
        mobileMenu.querySelectorAll("a");

    mobileLinks.forEach(link => {

        link.addEventListener(
            "click",
            () => {
                mobileMenu.classList.remove("open");
            }
        );

    });

}


/* ---------------------------------------------------------
   MODALS
--------------------------------------------------------- */

function openModal(number) {

    const modal =
        document.getElementById(
            `modal${number}`
        );

    if (!modal) return;

    modal.classList.add("open");

    modal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add(
        "modal-open"
    );

}


function closeModal(modal) {

    if (!modal) return;

    modal.classList.remove("open");

    modal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove(
        "modal-open"
    );

}


/* Open project */

projectOpenButtons.forEach(button => {

    button.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            const number =
                button.dataset.openProject;

            openModal(number);

        }
    );

});


/* Klik op projectkaart */

document
    .querySelectorAll(".project-card[data-project]")
    .forEach(card => {

        card.addEventListener(
            "click",
            event => {

                if (
                    event.target.closest(
                        "button"
                    )
                ) {
                    return;
                }

                const number =
                    card.dataset.project;

                /*
                 * Project 4 = coming soon.
                 * Daar openen we geen modal.
                 */

                if (number === "4") {
                    return;
                }

                openModal(number);

            }
        );

    });


/* Sluiten */

closeButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const modal =
                button.closest(".modal");

            closeModal(modal);

        }
    );

});


/* Klik buiten het venster */

modals.forEach(modal => {

    modal.addEventListener(
        "click",
        event => {

            if (
                event.target.classList.contains(
                    "modal"
                )
            ) {
                closeModal(modal);
            }

        }
    );

});


/* Escape om te sluiten */

document.addEventListener(
    "keydown",
    event => {

        if (event.key !== "Escape") {
            return;
        }

        const openModalElement =
            document.querySelector(
                ".modal.open"
            );

        if (openModalElement) {
            closeModal(openModalElement);
        }

        if (
            mobileMenu &&
            mobileMenu.classList.contains("open")
        ) {
            mobileMenu.classList.remove("open");
        }

    }
);


/* ---------------------------------------------------------
   FOTO'S
--------------------------------------------------------- */

/*
 * Als een foto niet gevonden wordt,
 * laten we geen lelijk kapot afbeeldings-icoon zien.
 */

document
    .querySelectorAll(".project-image img")
    .forEach(image => {

        image.addEventListener(
            "error",
            () => {

                image.style.display =
                    "none";

                const wrapper =
                    image.closest(
                        ".project-image"
                    );

                if (wrapper) {

                    wrapper.classList.add(
                        "image-missing"
                    );

                }

            }
        );

    });


/* ---------------------------------------------------------
   SCROLL EFFECT
--------------------------------------------------------- */

function handleScroll() {

    const scrollY =
        window.scrollY;

    /* Back to top */

    if (backToTop) {

        if (scrollY > 500) {

            backToTop.classList.add(
                "show"
            );

        } else {

            backToTop.classList.remove(
                "show"
            );

        }

    }


    /* Navbar */

    const navbar =
        document.getElementById(
            "navbar"
        );

    if (navbar) {

        if (scrollY > 40) {

            navbar.style.background =
                "rgba(7, 10, 18, 0.88)";

        } else {

            navbar.style.background =
                "rgba(7, 10, 18, 0.72)";

        }

    }


    /* Actieve navigatie */

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 180;

        const sectionBottom =
            sectionTop +
            section.offsetHeight;

        if (
            scrollY >= sectionTop &&
            scrollY < sectionBottom
        ) {
            currentSection =
                section.id;
        }

    });


    navLinks.forEach(link => {

        link.classList.remove(
            "active"
        );

        const href =
            link.getAttribute("href");

        if (
            href ===
            `#${currentSection}`
        ) {
            link.classList.add(
                "active"
            );
        }

    });

}


window.addEventListener(
    "scroll",
    handleScroll,
    {
        passive: true
    }
);

handleScroll();


/* ---------------------------------------------------------
   BACK TO TOP
--------------------------------------------------------- */

if (backToTop) {

    backToTop.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* ---------------------------------------------------------
   SCROLL REVEAL
--------------------------------------------------------- */

const revealElements = [

    ...document.querySelectorAll(
        ".project-card"
    ),

    ...document.querySelectorAll(
        ".about-grid"
    ),

    ...document.querySelectorAll(
        ".cta-box"
    )

];


revealElements.forEach(
    element => {

        element.classList.add(
            "reveal"
        );

    }
);


if ("IntersectionObserver" in window) {

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

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


    revealElements.forEach(
        element => {

            observer.observe(
                element
            );

        }
    );

} else {

    revealElements.forEach(
        element => {

            element.classList.add(
                "visible"
            );

        }
    );

}


/* ---------------------------------------------------------
   MUIS EFFECT OP HERO
--------------------------------------------------------- */

const heroVisual =
    document.querySelector(
        ".hero-visual"
    );

if (heroVisual) {

    heroVisual.addEventListener(
        "mousemove",
        event => {

            const rect =
                heroVisual.getBoundingClientRect();

            const x =
                (event.clientX - rect.left)
                / rect.width
                - 0.5;

            const y =
                (event.clientY - rect.top)
                / rect.height
                - 0.5;

            const center =
                heroVisual.querySelector(
                    ".visual-center"
                );

            if (center) {

                center.style.transform =
                    `translate(${x * 10}px, ${y * 10}px)`;

            }

        }
    );


    heroVisual.addEventListener(
        "mouseleave",
        () => {

            const center =
                heroVisual.querySelector(
                    ".visual-center"
                );

            if (center) {

                center.style.transform =
                    "translate(0, 0)";

            }

        }
    );

}


/* ---------------------------------------------------------
   PROJECT HOVER
--------------------------------------------------------- */

document
    .querySelectorAll(".project-card")
    .forEach(card => {

        card.addEventListener(
            "mouseenter",
            () => {

                card.style.setProperty(
                    "--mouse-x",
                    "50%"
                );

                card.style.setProperty(
                    "--mouse-y",
                    "50%"
                );

            }
        );

    });


/* ---------------------------------------------------------
   LINK ANIMATIE
--------------------------------------------------------- */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute(
                        "href"
                    );

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(
                        targetId
                    );

                if (!target) {
                    return;
                }

                event.preventDefault();

                const navbar =
                    document.getElementById(
                        "navbar"
                    );

                const offset =
                    navbar
                        ? navbar.offsetHeight + 25
                        : 25;

                const targetPosition =
                    target.getBoundingClientRect()
                        .top +
                    window.scrollY -
                    offset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });

            }
        );

    });


/* ---------------------------------------------------------
   START
--------------------------------------------------------- */

console.log(
    "Ivan's Portfolio is geladen."
);
