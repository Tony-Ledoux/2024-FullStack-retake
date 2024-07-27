// Author: Tony Ledoux R0982634
// Created: 2024-07-06

let navClicked = false;

function getNavbarHeight() {
    const navbar = document.getElementById("main_navigation");
    const menu = document.getElementById("navbarSupportedContent"); //menu.offsetHeight = 0 when the menu is collapsed
    return navbar.offsetHeight - menu.offsetHeight;
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

// add event listener for the click event on the navbar-toggler button to add the navbar-scrolled class to the navbar when the menu is open
const toggleButton = document.querySelector("button.navbar-toggler");
toggleButton.addEventListener("click", function() {
    const navbar = document.getElementById("main_navigation");
    if (toggleButton.getAttribute("aria-expanded") === "true") {
        navbar.classList.add("navbar-scrolled");
    } else {
        if (window.scrollY === 0) {
            navbar.classList.remove("navbar-scrolled");
        }
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

// add event linster for date-picker change
const datePicker = document.getElementById("date-picker");
datePicker.addEventListener("change", function() {
    const selectedDate = datePicker.value;
    //if date is 2 weeks from now appointments cannot be made
    const date = new Date(selectedDate);
    const today = new Date();
    const twoWeeks = new Date(today);
    twoWeeks.setDate(today.getDate() + 14);
    if (date > twoWeeks) {
        //alert the user that appointments cannot be made more than 2 weeks in advance
        // show no appointments available
    }
    //if date is on a sunday we are closed
    if (date.getDay() === 0) {
        //alert the user that we are closed on sundays
        // show no appointments available
        
    }
    console.log(selectedDate);
});

//About section
function isBreakpointActive(breakpoint) {
    // Create a temporary element
    var tempElement = document.createElement("div");
    tempElement.className = `d-${breakpoint}-none`; // Apply the breakpoint class
    document.body.appendChild(tempElement); // Append the element to the body

    // Check if the element is visible
    var isActive = window.getComputedStyle(tempElement).display === "none";

    // Remove the temporary element
    document.body.removeChild(tempElement);

    return isActive;
}    


    function hideCards(Cards) {
        for (let i = 0; i < Cards.length; i++) {
            const card = Cards[i];
            if (!card.classList.contains("d-none")) {
                card.classList.add("d-none");
            }
            card.classList.remove("d-lg-block");
        }
    }

    function showCard(Cards, index) {
        const card = Cards[index];
        if (card.classList.contains("d-none")) {
            card.classList.remove("d-none");
        }
        let next = index + 1;
        if (next >= Cards.length) {
            next = 0;
        }
        const nextCard = Cards[next];
        nextCard.classList.add("d-lg-block");
    }

    let activeCard = 0;

    const Cards = document.querySelectorAll("#About .col-lg-6 ");
    console.log(Cards);
  // disable nav links with event listener
    const aboutLinks = document.querySelectorAll("#About nav li");
    for (let i = 0; i < aboutLinks.length; i++) {
        aboutLinks[i].addEventListener("click", function(event) {
            event.preventDefault();
            event.stopPropagation();
            const action = event.target.innerHTML;
            console.log(action);
            hideCards(Cards);
            // clear the active class from all the nav links
            for (let j = 0; j < aboutLinks.length; j++) {
                aboutLinks[j].classList.remove("active");
            }
            switch (action) {
                case "Previous":
                    if (isBreakpointActive("lg")) {
                        activeCard -= 2;
                        // if card is less than 0, set it to the last card index
                        if (activeCard < 0) {
                            activeCard = Cards.length - 2;
                        }
                    }else{
                        activeCard -= 1;
                        // if card is less than 0, set it to the last card index
                        if (activeCard < 0) {
                            activeCard = Cards.length - 1;
                        }
                    } 
                    break;
                case "Next":
                    if (isBreakpointActive("lg")) {
                        activeCard += 2;
                    } else {
                        activeCard += 1; // if 2 cards visible, activeCard -= 2
                    }
                    // if card is greater than the last card index, set it to 0
                    if (activeCard >= Cards.length) {
                        activeCard = 0;
                    } 
                    break;
                default:
                    if (isBreakpointActive("lg")) {
                        switch (action) {
                            case "1":
                                activeCard = 0;
                                break;
                            case "2":
                                activeCard = 2;
                                break;
                            case "3":
                                activeCard = 4;
                                break;
                        }
                    } else {
                        activeCard = parseInt(action) - 1;
                    }
                    if (activeCard >= Cards.length) {
                        activeCard = 0;
                    }
                    if (activeCard < 0) {
                        activeCard = Cards.length - 1;
                    }
                    
                    
                    break;
            }
            showCard(Cards, activeCard);
            if(!isBreakpointActive("lg")){
                aboutLinks[activeCard+1].classList.add("active");
            }else{
                if(activeCard == 0 || activeCard == 1){
                    aboutLinks[1].classList.add("active");
                }
                if(activeCard == 2 || activeCard == 3){
                    aboutLinks[2].classList.add("active");
                }
                if(activeCard == 4 || activeCard == 5){
                    aboutLinks[3].classList.add("active");
                }
               console.log(activeCard);
               //aboutLinks[activeCard/2+1].classList.add("active");
            }
            
            
        });
    }
    



// add event listener for the contact form progress bar
const contactForm = document.getElementById("contact-form");
const contactSubmit = contactForm.querySelector("button[type='submit']");
contactForm.addEventListener("change", function() {
    const progressBar = document.getElementById("progress-bar");
    const inputs = document.querySelectorAll("#contact-form input, #contact-form textarea");
    let progress = 0;
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value !== "") {
            progress += 25;
        }
    }
    progressBar.style.width = progress + "%";
    progressBar.innerHTML = progress + "%";
    progressBar.setAttribute("aria-valuenow", progress);
    if (progress === 100) {
        progressBar.classList.add("success");
        contactSubmit.classList.remove("disabled");
    } else {
        progressBar.classList.remove("success");
        contactSubmit.classList.add("disabled");
    }
});

// event listener for keypress on message input
const messageInput = document.getElementById("message");
messageInput.addEventListener("input", function() {
    const message = messageInput.value;
    const messageLength = message.length;
    console.log(message,messageLength);
    const messageCount = document.getElementById("message-counter");
    messageCount.innerHTML = messageLength+"/" + messageInput.maxLength;
    if (messageLength  <messageInput.minLength || messageLength > messageInput.maxLength) {
        messageCount.classList.add("text-danger");
    } else {
        messageCount.classList.remove("text-danger");
    }
});
// stop form subission if not valid
(() => {
    "use strict";

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll(".needs-validation");

    // Loop over them and prevent submission
    Array.from(forms).forEach((form) => {
        form.addEventListener(
            "submit",
            (event) => {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                }

                form.classList.add("was-validated");
            },
            false
        );
    });
})();