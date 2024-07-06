// Author: Tony Ledoux R0982634
// Created: 2024-07-06

// Things to do when the page is loaded
document.addEventListener("DOMContentLoaded", function() {
    const myModal = new bootstrap.Modal(document.getElementById("fictional"));
    myModal.show();
    // add margin to the main content the size of the navbar
    const navbarHeight = document.getElementById("main_navigation").offsetHeight;
    const mainContent = document.getElementsByTagName("main")[0];
    mainContent.style.marginTop = navbarHeight + "px";
});

// add event listener to links in the navbar
const navLinks = document.getElementsByClassName("nav-link");
for (let i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener("click", function(event) {
        // prevent the default action
        event.preventDefault();
        console.log(event);
        // scroll to the section with the id of the href and add the offset of the navbar then close the navbar
        const sectionId = navLinks[i].getAttribute("href");
        const section = document.querySelector(sectionId);
        const navbarHeight = document.getElementById("main_navigation").offsetHeight;
        window.scrollTo({
            top: section.offsetTop - navbarHeight,
            behavior: "smooth"
        });
    });
}

// add event listener to set the active class on the navbar links
document.addEventListener("scroll", function() {
    const sections = document.getElementsByTagName("section");
    const navbarHeight = document.getElementById("main_navigation").offsetHeight;
    for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const sectionTop = section.offsetTop - navbarHeight;
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