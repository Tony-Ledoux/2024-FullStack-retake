// Author: Tony Ledoux R0982634
// Created: 2024-07-06

// Things to do when the page is loaded
document.addEventListener("DOMContentLoaded", function() {
    const myModal = new bootstrap.Modal(document.getElementById("fictional"));
    //myModal.show();
    // add margin to the main content the size of the navbar
    const navbarHeight = document.getElementById("main_navigation").offsetHeight;
    sessionStorage.setItem("navbarHeight", navbarHeight);
    console.log("navbarHeight: " + navbarHeight);
    const mainContent = document.getElementsByTagName("main")[0];
    mainContent.style.marginTop = navbarHeight + "px";
    // alter the section heights to be the window height minus the navbar height
    const sections = document.getElementsByTagName("section");
    for (let i = 0; i < sections.length; i++) {
        sections[i].style.minHeight = window.innerHeight - navbarHeight + "px";
    }
});

// add event listener to links in the navbar
const navLinks = document.getElementsByClassName("nav-link");
for (let i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener("click", function(event) {
        // prevent the default action
        event.preventDefault();
        // scroll to the section with the id of the href and add the offset of the navbar then close the navbar
        const sectionId = navLinks[i].getAttribute("href");
        const section = document.querySelector(sectionId);
        //close the navbar if it is open to get the correct offset
        const toggleButton = document.querySelector("button.navbar-toggler");
        toggleButton.click();
        window.scrollTo({
            top: section.offsetTop - sessionStorage.getItem("navbarHeight"),
            behavior: "smooth"
        });
    });
}

// add event listener to set the active class on the navbar links
document.addEventListener("scroll", function() {
    const sections = document.getElementsByTagName("section");
    for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const sectionTop = section.offsetTop - sessionStorage.getItem("navbarHeight");
        const sectionBottom = sectionTop + section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
            const sectionId = "#" + section.id;
            const navLinks = document.getElementsByClassName("nav-link");
            for (let j = 0; j < navLinks.length; j++) {
                navLinks[j].classList.remove("active");
                if (navLinks[j].getAttribute("href") === sectionId) {
                    navLinks[j].classList.add("active");
                }
            }
        }
    }
});