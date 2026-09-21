// ========================================
// FRICAN DESIGNS
// PUBLIC WEBSITE JAVASCRIPT
// ========================================


// ========================================
// PRELOADER
// ========================================

window.addEventListener("load", function () {

    const preloader =
        document.getElementById("preloader");

    if (!preloader) return;

    setTimeout(function () {

        preloader.classList.add("hide");

    }, 900);

});


// ========================================
// PAGE READY
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {


        // ====================================
        // MOBILE MENU
        // ====================================

        const menuBtn =
            document.getElementById("menuBtn");

        const mobileMenu =
            document.getElementById("mobileMenu");


        if (menuBtn && mobileMenu) {

            menuBtn.addEventListener(
                "click",
                function () {

                    mobileMenu.classList.toggle(
                        "active"
                    );

                }
            );


            const mobileLinks =
                mobileMenu.querySelectorAll("a");


            mobileLinks.forEach(
                function (link) {

                    link.addEventListener(
                        "click",
                        function () {

                            mobileMenu.classList.remove(
                                "active"
                            );

                        }
                    );

                }
            );

        }


        // ====================================
        // SHOPPING BAG COUNTER
        // ====================================

        updateBagCount();


        // ====================================
        // NAVBAR SCROLL
        // ====================================

        const navbar =
            document.querySelector(".navbar");


        function updateNavbar() {

            if (!navbar) return;


            if (window.scrollY > 40) {

                navbar.style.background =
                    "rgba(5,5,5,0.94)";

            } else {

                navbar.style.background =
                    "rgba(5,5,5,0.75)";

            }

        }


        window.addEventListener(
            "scroll",
            updateNavbar
        );


        updateNavbar();


        // ====================================
        // SMOOTH SCROLLING
        // ====================================

        const internalLinks =
            document.querySelectorAll(
                'a[href^="#"]'
            );


        internalLinks.forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function (event) {

                        const targetId =
                            this.getAttribute("href");


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


                        if (!target) return;


                        event.preventDefault();


                        target.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }
                );

            }
        );


        // ====================================
        // LOAD FIREBASE PRODUCTS
        // ====================================

        waitForFirebaseProducts();

    }
);


// ========================================
// SHOPPING BAG COUNTER
// ========================================

let bagCount = 0;


function updateBagCount() {

    const counter =
        document.getElementById("bagCount");


    if (!counter) return;


    counter.textContent = bagCount;

}


// ========================================
// WAIT FOR FIREBASE
// ========================================

function waitForFirebaseProducts() {

    let attempts = 0;

    const maxAttempts = 50;


    const checkFirebase =
        setInterval(function () {

            attempts++;


            if (
                window.loadFricanBagsFromFirebase
            ) {

                clearInterval(checkFirebase);


                console.log(
                    "FRICAN: Starting Firebase products..."
                );


                window.loadFricanBagsFromFirebase();


                return;
            }


            if (attempts >= maxAttempts) {

                clearInterval(checkFirebase);


                console.error(
                    "FRICAN: Firebase product loader was not found."
                );

            }

        }, 100);

}


// ========================================
// DISPLAY FIREBASE PRODUCTS
// ========================================

window.displayFricanProducts =
    function (bags) {

        const grid =
            document.getElementById(
                "productGrid"
            );


        if (!grid) {

            console.error(
                "FRICAN: productGrid not found."
            );

            return;
        }


        // No products

        if (!bags || bags.length === 0) {

            grid.innerHTML = `

                <article class="product-card coming-soon">

                    <div class="product-image">

                        <div class="placeholder-symbol">
                            F
                        </div>

                        <span class="product-status">
                            NEW DROP
                        </span>

                    </div>

                    <div class="product-info">

                        <h3>
                            FRICAN STATEMENT BAG
                        </h3>

                        <p>
                            NEW COLLECTION COMING SOON
                        </p>

                    </div>

                </article>

            `;

            return;
        }


        // Products exist

        grid.innerHTML =
            bags.map(function (bag) {

                const sold =
                    bag.status === "sold";


                const image =
                    bag.image
                    ? `
                        <img
                            src="${bag.image}"
                            alt="${bag.name || "FRICAN bag"}"
                            class="frican-product-image"
                        >
                    `
                    : `
                        <div class="placeholder-symbol">
                            F
                        </div>
                    `;


                return `

                    <article class="product-card">

                        <div class="product-image">

                            ${image}

                            <span class="product-status">

                                ${
                                    sold
                                    ? "SOLD OUT"
                                    : "AVAILABLE"
                                }

                            </span>

                        </div>


                        <div class="product-info">

                            <h3>
                                ${bag.name || "FRICAN BAG"}
                            </h3>


                            <p>
                                KSh
                                ${Number(
                                    bag.price || 0
                                ).toLocaleString()}
                            </p>


                            ${
                                bag.description
                                ?
                                `
                                <p>
                                    ${bag.description}
                                </p>
                                `
                                :
                                ""
                            }


                            ${
                                sold

                                ?

                                `
                                <button
                                    type="button"
                                    class="order-btn"
                                    disabled>

                                    SOLD OUT

                                </button>
                                `

                                :

                                `
                                <button
                                    type="button"
                                    class="order-btn"
                                    onclick="orderFricanBag('${bag.id}')">

                                    ORDER NOW

                                </button>
                                `
                            }

                        </div>

                    </article>

                `;

            }).join("");

    };


// ========================================
// PREVENT BROKEN # LINKS
// ========================================

document.addEventListener(
    "click",
    function (event) {

        const link =
            event.target.closest(
                'a[href="#"]'
            );


        if (!link) return;


        if (
            link.classList.contains(
                "primary-btn"
            ) ||
            link.classList.contains(
                "secondary-btn"
            ) ||
            link.classList.contains(
                "outline-btn"
            ) ||
            link.classList.contains(
                "order-btn"
            )
        ) {

            return;

        }


        event.preventDefault();

    }
);


// ========================================
// READY
// ========================================

console.log(
    "FRICAN DESIGNS public website ready!"
);