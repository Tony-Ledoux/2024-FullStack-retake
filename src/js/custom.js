// Author: Tony Ledoux R0982634
// Created: 2024-07-06

let navClicked = false;

function getNavbarHeight() {
    const navbarHeight = document.getElementById("main_navigation").offsetHeight;
    return navbarHeight;
}

// Things to do when the page is loaded
document.addEventListener("DOMContentLoaded", function() {
    const myModal = new bootstrap.Modal(document.getElementById("fictional"));
    //myModal.show();

    // if scrollY is greater than 0, add the navbar-scrolled class to the navbar
    const navbar = document.getElementById("main_navigation");
    if (window.scrollY > 0) {
        navbar.classList.add("navbar-scrolled");
    }
    // add padding to the first section to account for the navbar height
    const sections = document.getElementsByTagName("section");
    sections[0].style.paddingTop = getNavbarHeight() + "px";
});

// add event listener for the scroll event to change the background color of the navbar when scrolling
document.addEventListener("scroll", function() {
    const navbar = document.getElementById("main_navigation");
    if (window.scrollY > 0) {
        navbar.classList.add("navbar-scrolled");
    } else {
        navbar.classList.remove("navbar-scrolled");
    }
});


// add event listener to links in the navbar
const navLinks = document.querySelectorAll("header a.nav-link");
for (let i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener("click", function(event) {
        navClicked = true;
        // prevent the default action
        event.preventDefault();
        event.stopPropagation();
        // scroll to the section with the id of the href and add the offset of the navbar then close the navbar
        const sectionId = navLinks[i].getAttribute("href");
        const section = document.querySelector(sectionId);
        //close the navbar if it is open to get the correct offset
        const toggleButton = document.querySelector("button.navbar-toggler");
        toggleButton.click();
        window.scrollTo({
            top: section.offsetTop - getNavbarHeight(),
            behavior: "smooth",
        });

    });
}

const smProdTypeSelector = document.getElementById("small-screen-product-type-selector");
smProdTypeSelector.addEventListener("change", function() {
    // remove the active and show classes from all the product tab-pane divs
    const tabPanes = document.querySelectorAll("#otcProducts .tab-pane");
    for (let i = 0; i < tabPanes.length; i++) {
        tabPanes[i].classList.remove("active", "show");
    }
    // get the selected value from the select element
    const selectedValue = smProdTypeSelector.value;
    // add the active and show classes to the selected tab-pane div
    const selectedTabPane = document.querySelector("#otcProducts #" + selectedValue);
    selectedTabPane.classList.add("active", "show");
});

// add event listener to set the active class on the navbar links
document.addEventListener("scroll", function(event) {
        const sections = document.getElementsByTagName("section");
        for (let i = 0; i < sections.length; i++) {
            const section = sections[i];
            const sectionTop = section.offsetTop - getNavbarHeight();
            const sectionBottom = sectionTop + section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                const sectionId = "#" + section.id;
                const navLinks = document.querySelectorAll("header a.nav-link");
                    for (let j = 0; j < navLinks.length; j++) {
                        navLinks[j].classList.remove("active");
                        if (navLinks[j].getAttribute("href") === sectionId) {
                             navLinks[j].classList.add("active");
                        }
                    }
            }
        }
});