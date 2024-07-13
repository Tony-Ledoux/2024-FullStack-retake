// Author: Tony Ledoux R0982634
// Created: 2024-07-06

// Things to do when the page is loaded
document.addEventListener("DOMContentLoaded", function() {
    const myModal = new bootstrap.Modal(document.getElementById("fictional"));
    //myModal.show();
    // add margin to the main content the size of the navbar
    const navbarHeight = document.getElementById("main_navigation").offsetHeight;
    document.getElementsByTagName("section")[0].style.paddingTop = navbarHeight + "px";
    // add the active class to the first tab
    const tabs = document.querySelectorAll("#collapseOTC .nav-tabs .nav-link");
    console.log(tabs);
    tabs[0].classList.add("active");
});



// add event listener to links in the navbar
const navLinks = document.querySelectorAll("header a.nav-link");
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