// ===============================================
// Part 3: Advanced Functionality & Validation
// ===============================================

// -----------------------------------------------
// 1. MOBILE NAVIGATION MENU
// -----------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.createElement("div");
    menuBtn.id = "menuBtn";
    menuBtn.innerHTML = `<i class="fas fa-bars"></i>`;
    menuBtn.setAttribute("aria-label", "Toggle navigation menu");
    menuBtn.setAttribute("tabindex", "0");
    document.body.appendChild(menuBtn);

    const sideNav = document.createElement("div");
    sideNav.id = "sideNav";
    sideNav.innerHTML = `
        <nav>
            <ul>
                <li><a href="home.html">Home</a></li>
                <li><a href="about.html">About Us</a></li>
                <li><a href="services.html">Services</a></li>
                <li><a href="enquiry.html">Enquiry</a></li>
                <li><a href="contact.html">Contact</a></li>
            </ul>
        </nav>
    `;
    document.body.appendChild(sideNav);
    sideNav.style.right = "-250px";

    function toggleMenu() {
        if (sideNav.style.right === "-250px") {
            sideNav.style.right = "0";
            menuBtn.innerHTML = `<i class="fas fa-times"></i>`;
            menuBtn.setAttribute("aria-expanded", "true");

            // Focus first link
            setTimeout(() => {
                const firstLink = sideNav.querySelector("a");
                if (firstLink) firstLink.focus();
            }, 300);
        } else {
            closeMenu();
        }
    }

    function closeMenu() {
        sideNav.style.right = "-250px";
        menuBtn.innerHTML = `<i class="fas fa-bars"></i>`;
        menuBtn.setAttribute("aria-expanded", "false");
    }

    menuBtn.addEventListener("click", toggleMenu);

    menuBtn.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleMenu();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && sideNav.style.right === "0") {
            closeMenu();
            menuBtn.focus();
        }
    });

    document.addEventListener("click", (e) => {
        if (!sideNav.contains(e.target) && !menuBtn.contains(e.target)) {
            closeMenu();
        }
    });

    sideNav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            closeMenu();
        });
    });

    trapFocus(sideNav);
});

// Focus trap
function trapFocus(element) {
    element.addEventListener('keydown', function(e) {
        const focusable = element.querySelectorAll('a[href], button, textarea, input, select');
        if (!focusable.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.key === 'Tab') {
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }
    });
}

// -----------------------------------------------
// 2. SMOOTH SCROLL FOR ANCHORS
// -----------------------------------------------
document.addEventListener("click", function (e) {
    if (e.target.tagName === "A" && e.target.hash.startsWith("#")) {
        const section = document.querySelector(e.target.hash);
        if (section) {
            e.preventDefault();
            section.scrollIntoView({ behavior: "smooth" });
        }
    }
});

// -----------------------------------------------
// 3. SCROLL TO TOP BUTTON
// -----------------------------------------------
function createScrollToTopButton() {
    const scrollBtn = document.createElement("button");
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.id = "scrollToTop";
    scrollBtn.setAttribute("aria-label", "Scroll to top");

    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: #009688;
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 20px;
        cursor: pointer;
        display: none;
        z-index: 998;
        box-shadow: 0 4px 8px rgba(0,0,0,0.3);
        transition: all 0.3s ease;
    `;
    document.body.appendChild(scrollBtn);

    window.addEventListener("scroll", () => {
        scrollBtn.style.display = window.pageYOffset > 300 ? "block" : "none";
    });

    scrollBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
};
createScrollToTopButton();

