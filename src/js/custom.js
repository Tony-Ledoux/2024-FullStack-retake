// Author: Tony Ledoux R0982634
// Created: 2024-07-06

//continue from line 240

// if host is localhost, use the local api url else use the production api url
let apiUrl = "https://2024-fullstack-retake-api-tony-ledouxs-projects.vercel.app";
if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
    apiUrl = "http://localhost:8080";
}

let navClicked = false;

function getNavbarHeight() {
    const navbar = document.getElementById("main_navigation");
    const menu = document.getElementById("navbarSupportedContent"); //menu.offsetHeight = 0 when the menu is collapsed
    return navbar.offsetHeight - menu.offsetHeight;
}

// Things to do when the page is loaded
document.addEventListener("DOMContentLoaded", function () {
    const myModal = new bootstrap.Modal(document.getElementById("fictional"));
    myModal.show();

    // if scrollY is greater than 0, add the navbar-scrolled class to the navbar
    const navbar = document.getElementById("main_navigation");
    if (window.scrollY > 0) {
        navbar.classList.add("navbar-scrolled");
    }

    // add padding to the first section to account for the navbar height
    const sections = document.getElementsByTagName("section");
    sections[0].style.paddingTop = getNavbarHeight() + "px";

    // load the pharmacist data from the server
    const pharmacistPlaceholder = document.getElementById("team-cards-placeholder");
    const pharmacistNavigation = document.getElementById("pharmacists-navigation");
    fetch(apiUrl + "/pharmacists/")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            // remove the loading card
            pharmacistPlaceholder.innerHTML = "";
            pharmacistNavigation.innerHTML = "";
            // create an empty array for the pagination Elements
            const pgElements = [];
            // add the pharmacist data to the page
            for (let i = 0; i < data.length; i++) {
                const pharmacist = data[i];
                const pharmacistCard = document.createElement("div");
                pharmacistCard.classList.add("col-lg-6");
                if (i != 0) {
                    pharmacistCard.classList.add("d-none");
                }
                if (i == 1) {
                    pharmacistCard.classList.add("d-lg-block");
                }
                pharmacistCard.innerHTML = `<div class="card h-100">
                        <div class="card-header">
                            <h5 class="card-title text-center">${pharmacist.name}</h5>
                        </div>
                        <div class="card-body row">
                            <img src="${pharmacist.image}" class="col-md-4 my-auto" alt="...">
                            <p class="col-md-8 card-text">${pharmacist.description}</p>
                        </div>
                        <div class="card-footer">
                            <p class="card-text">Employed since: ${pharmacist.start_date}</p>
                        </div>
                    </div>`;
                pharmacistPlaceholder.appendChild(pharmacistCard);
                pgElem = createPaginationLink(i + 1, "#");
                pgElements.push(pgElem);
                // set pagination because all is loaded
            }
            //if viewport is large display half of the items
            const p_html = document.createElement("ul");
            p_html.classList.add("pagination", "justify-content-center", "pagination-sm");
            let link = createPaginationLink("Previous", "#");
            link.addEventListener("click", clickOnpaginationLink);
            p_html.appendChild(link);
            const elemLength = pgElements.length;
            for (let i = 0; i < pgElements.length; i++) {
                link = pgElements[i];
                link.addEventListener("click", clickOnpaginationLink);
                p_html.appendChild(link);
            }
            link = createPaginationLink("Next", "#");
            link.addEventListener("click", clickOnpaginationLink);
            p_html.appendChild(link);
            pharmacistNavigation.appendChild(p_html);
        })
        .catch((error) => {
            console.error("Error:", error);
            // clear the loading card and add an alert
            pharmacistPlaceholder.innerHTML = "";
            pharmacistNavigation.innerHTML = "";
            const errorData = document.createElement("div");
            errorData.classList.add("alert", "alert-danger", "w-75", "mx-auto", "text-center");
            errorData.innerHTML = "Error loading our pharmacists <br> try to reload";
            pharmacistPlaceholder.appendChild(errorData);
        });
});
//createPagination Link
function createPaginationLink(name, href) {
    //li
    const el = document.createElement("li");
    el.classList.add("page-item");
    const link = document.createElement("a");
    link.classList.add("page-link");
    link.href = href;
    link.innerHTML = name;
    el.appendChild(link);
    return el;
}
// add event listener for the scroll event to change the background color of the navbar when scrolling
document.addEventListener("scroll", function () {
    const navbar = document.getElementById("main_navigation");
    if (window.scrollY > 0) {
        navbar.classList.add("navbar-scrolled");
    } else {
        navbar.classList.remove("navbar-scrolled");
    }
});

// add event listener for the click event on the navbar-toggler button to add the navbar-scrolled class to the navbar when the menu is open
const toggleButton = document.querySelector("button.navbar-toggler");
toggleButton.addEventListener("click", function () {
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
    navLinks[i].addEventListener("click", function (event) {
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
smProdTypeSelector.addEventListener("change", function () {
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
document.addEventListener("scroll", function (event) {
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
datePicker.addEventListener("change", function () {
    const booking_Error = document.getElementById("alert_booking");
    const consultant_placeholder = document.getElementById("consultants");
    const itemPlaceholder = consultant_placeholder.querySelector(".consultant-placeholder");
    try {
        const selectedDate = datePicker.value;
        const date = new Date(selectedDate);
        const today = new Date();
        if (date < today) {
            throw new Error("Date must be in the future");
        }
        booking_Error.classList.add("d-none");
        consultant_placeholder.classList.remove("d-none");
        // fetch the data from the server
        fetch(apiUrl + "/appointment?date=" + selectedDate)
            .then((response) => {
                console.log(response);
                if (response.ok) {
                    return response.json();
                }
                if (response.status == 400) {
                    throw new Error("Bad date format");
                }
                if (response.status == 404) {
                    throw new Error("Pharmacy is closed on this date");
                }
                throw new Error("Network response was not ok");
            })
            .then((data) => {
                console.log(data);
                itemPlaceholder.innerHTML = "";
                for (let i = 0; i < data.length; i++) {
                    const consultant = data[i];
                    const consultantItem = document.createElement("div");
                    consultantItem.classList.add("form-check");
                    consultantItem.innerHTML =
                        `<input class="form-check-input" type="radio" name="consultant" id="consultant${i}" value="${consultant.pharmacist_id}">
                        <label class="form-check-label" for="consultant${i}">` +
                        consultant.pharmacist +
                        "</label>";
                    consultantItem.addEventListener("change", function (event) {
                        //load available times for the selected consultant
                        const consultantId = event.target.value;
                        // get the selected consultant from the data
                        const selectedConsultant = data.find((consultant) => consultant.pharmacist_id == consultantId);
                        // clear previous slots

                        // display new time slots
                        showAvailableTimes(selectedConsultant);
                    });
                    itemPlaceholder.appendChild(consultantItem);
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                datePicker.value = "";
                // if typeError, show the error message for no network
                if (error instanceof TypeError) {
                    booking_Error.innerHTML = "Network error, please try again later";
                    //clear the consultant placeholder
                }
                if (error.message === "Bad date format") {
                    booking_Error.innerHTML = "Please select a valid date";
                }
                if (error.message === "Pharmacy is closed on this date") {
                    booking_Error.innerHTML = error.message;
                }
                booking_Error.classList.remove("d-none");
                consultant_placeholder.classList.add("d-none");
                itemPlaceholder.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';
            });
    } catch (error) {
        datePicker.value = "";
        if (error.message === "Date must be in the future") {
            booking_Error.innerHTML = error.message;
        }
        booking_Error.classList.remove("d-none");
        consultant_placeholder.classList.add("d-none");
        itemPlaceholder.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';
        console.error("Error:", error);
    }
});
// show available times for the selected consultant
function showAvailableTimes(times) {
    const timeslot_form = document.getElementById("form_slots");
    timeslot_form.classList.remove("d-none");
    const appointmentForm = document.getElementById("book_appointment_with_selected_consultant");
    appointmentForm.reset();
    // reset the alert
    const errorAlert = document.getElementById("alert_no_timeslot");
    errorAlert.classList.add("d-none");
    errorAlert.classList.remove("show");
    // set the value of the hidden input date to the selected date
    appointmentForm.querySelector("input[name='date_value']").value = datePicker.value;
    appointmentForm.querySelector("input[name='pharmacist_id']").value = times.pharmacist_id;
    // create a list of available times in the morning and afternoon
    const morningTimes = [];
    const afternoonTimes = [];
    for (let i = 0; i < times.timeslots.length; i++) {
        const timeslot = times.timeslots[i];
        if (timeslot.day_part === "morning") {
            morningTimes.push(timeslot);
        }
        if (timeslot.day_part === "afternoon") {
            afternoonTimes.push(timeslot);
        }
    }
    // clear the previous times
    const morningPlaceholder = document.getElementById("morning_consult");
    morningPlaceholder.innerHTML = "<h5>Morning</h5>";
    const afternoonPlaceholder = document.getElementById("afternoon_consult");
    afternoonPlaceholder.innerHTML = "<h5>Afternoon</h5>";
    const no_time_available = document.createElement("p");
    no_time_available.innerHTML = "No time slots available";
    // create a radio button for each time in the morning array and append it to the morningPlaceholder
    if (morningTimes.length == 0) {
        morningPlaceholder.appendChild(no_time_available);
    } else {
        for (let i = 0; i < morningTimes.length; i++) {
            const time = morningTimes[i];
            const timeItem = document.createElement("div");
            timeItem.classList.add("d-inline-block");
            timeItem.innerHTML = `<input class="btn-check" type="radio" name="time_slot" id="time${time.slot_id}" value="${time.slot_id}">
                <label class="btn btn-secondary" for="time${time.slot_id}">${time.timeslot}</label>`;
            morningPlaceholder.appendChild(timeItem);
        }
    }
    // create a radio button for each time in the afternoon array and append it to the afternoonPlaceholder
    for (let i = 0; i < afternoonTimes.length; i++) {
        const time = afternoonTimes[i];
        const timeItem = document.createElement("div");
        timeItem.classList.add("d-inline-block");
        timeItem.innerHTML = `<input class="btn-check" type="radio" name="time_slot" id="time${time.slot_id}" value="${time.slot_id}">
            <label class="btn btn-secondary" for="time${time.slot_id}">${time.timeslot}</label>`;
        afternoonPlaceholder.appendChild(timeItem);
    }
}
// submit function for the appointment form
const appointmentForm = document.getElementById("book_appointment_with_selected_consultant");
appointmentForm.addEventListener("submit", function (event) {
    const form = document.getElementById("form_slots");
    const consultant_placeholder = document.getElementById("consultants");
    const successAlert = document.getElementById("alert_booking_successfull");
    event.preventDefault();
    event.stopPropagation();
    // get the form data
    const formData = new FormData(appointmentForm);
    const formObject = {};
    formData.forEach((value, key) => {
        //if key is pharmacist_id or slot_id, convert the value to a number
        if (key === "pharmacist_id" || key === "time_slot") {
            value = parseInt(value);
        }
        formObject[key] = value;
    });
    // if formObject does not contain a time, show an error message
    if (!formObject.time_slot) {
        const errorAlert = document.getElementById("alert_no_timeslot");
        errorAlert.classList.remove("d-none");
        errorAlert.classList.add("show");
        return;
    }
    console.log(formObject);
    // send the form data to the server
    fetch(apiUrl + "/appointment/", {
        method: "POST",
        body: JSON.stringify(formObject),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            // if data containts status 500, show an error message

            if (data.status_code === 500) {
                throw new Error(data.detail);
            }
            successAlert.classList.remove("d-none");
            setTimeout(function () {
                successAlert.classList.add("d-none");
            }, 5000);
        })
        .catch((error) => {
            const errorAlert = document.getElementById("alert_booking");
            errorAlert.innerHTML = "Error booking appointment, please try again later";
            errorAlert.classList.remove("d-none");
            setTimeout(function () {
                errorAlert.classList.add("d-none");
            }, 5000);
            console.error("Error:", error);
        })
        .finally(() => {
            // clear the form
            appointmentForm.reset();
            // reset the date picker and hide the form and consultants
            datePicker.value = "";
            form.classList.add("d-none");
            consultant_placeholder.classList.add("d-none");
        });

    // TODO: send the form data to the server
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
function getAllCards() {
    const cards = document.querySelectorAll("#team-cards-placeholder .col-lg-6");
    return cards;
}

function clickOnpaginationLink(event) {
    event.preventDefault();
    event.stopPropagation();
    //get all cards
    const cards = getAllCards();
    // return the index of the element without d-none
    const getActiveCard = getActiveCardIndex(cards);
    let index = 0;
    let lScreen = isBreakpointActive();
    // hide all the cards
    hideAllCards();
    // Action
    switch (event.target.innerHTML) {
        case "Next":
            index = getActiveCard + 1;
            break;
        case "Previous":
            index = getActiveCard - 1;
            break;
        default:
            index = parseInt(event.target.innerHTML) - 1;
            break;
    }
    // check if the index is out of bounds, cant' be less than 0 and more than the length of the cards
    if (index < 0) {
        index = cards.length - 1;
    }
    if (index >= cards.length) {
        index = 0;
    }

    showCard(index);
    // remove the active class
    event.target.blur();
}

function getActiveCardIndex(cards) {
    for (let i = 0; i < cards.length; i++) {
        if (!cards[i].classList.contains("d-none")) {
            return i;
        }
    }
    return -1;
}

function hideAllCards() {
    const cards = getAllCards();
    for (let i = 0; i < cards.length; i++) {
        cards[i].classList.add("d-none");
        cards[i].classList.remove("d-lg-block");
    }
}

function showCard(index = 0) {
    const cards = getAllCards();
    const numberOfCards = cards.length;
    let nextIndex = index + 1;
    if (index > numberOfCards) {
        index = 0;
        nextIndex = 1;
    }
    if (nextIndex >= numberOfCards) {
        nextIndex = 0;
    }
    cards[index].classList.remove("d-none");
    // add d-lg-block to the next card
    cards[nextIndex].classList.add("d-lg-block");
}

// add event listener for the contact form progress bar
const contactForm = document.getElementById("contact-form");
const contactSubmit = contactForm.querySelector("button[type='submit']");
contactForm.addEventListener("change", function () {
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
messageInput.addEventListener("input", function () {
    const message = messageInput.value;
    const messageLength = message.length;
    const messageCount = document.getElementById("message-counter");
    messageCount.innerHTML = messageLength + "/" + messageInput.maxLength;
    if (messageLength < messageInput.minLength || messageLength > messageInput.maxLength) {
        messageCount.classList.add("text-danger");
    } else {
        messageCount.classList.remove("text-danger");
    }
});
// submit event listener for the contact form
contactForm.addEventListener("submit", async function (event) {
    const successAlert = document.querySelector("#Contact .alert-success");
    event.preventDefault();
    if (!contactForm.checkValidity()) {
        event.stopPropagation();
        contactForm.classList.add("was-validated");
        return;
    }

    const formData = new FormData(contactForm);
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });
    console.log(formObject);
    // send the form data to the server
    let posted = await fetch(apiUrl + "/questions/", {
        method: "POST",
        body: JSON.stringify(formObject),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    // if the server returns a success message, show a success message to the user
    successAlert.classList.remove("d-none");
    successAlert.classList.add("show");
    // if the server returns an error message, show an error message to the user
    // if the server returns a validation error, show the validation error to the user
    // remove the vallidations from the form
    contactForm.classList.remove("was-validated");
    // reset the form
    contactForm.reset();
});

function isLoggedIn() {
    // if there is a token in session storage, check if it is valid
    return true; // change to true if logged in
}

// on opening of the offcanvas, check if logged in
const offcanvas = document.getElementById("controlPanel");
offcanvas.addEventListener("show.bs.offcanvas", function (event) {
    const loggedIn = isLoggedIn();
    if (!loggedIn) {
        // prevent the offcanvas from opening
        event.preventDefault();
        // show the login modal
        const loginModal = new bootstrap.Modal(document.getElementById("loginModal"));
        loginModal.show();
        return;
    }
    // fetch questions from the server
    fetch(apiUrl + "/questions/")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            // add the questions to the offcanvas
            const questionList = document.getElementById("q_placeholder");
            questionList.innerHTML = "";
            for (let i = 0; i < data.length; i++) {
                const question = data[i];
                const questionItem = document.createElement("li");
                questionItem.classList.add("list-group-item");
                questionItem.innerHTML =
                    "recieved:" + question.received + "<br>from:" + question.from + " <br>message:" + question.question;
                questionList.appendChild(questionItem);
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
});

// event on CollapseTwo open
const collapseTwo = document.getElementById("collapseTwo");
collapseTwo.addEventListener("show.bs.collapse", function (event) {
    const placeholder_data = document.createElement("div");
    placeholder_data.setAttribute("id", "pharmacist-appointments");
    //get data from server
    const today = new Date().toISOString().split("T")[0];
    fetch(apiUrl + "/appointment/made?date=" + today)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            // get a list of pharmacists
            const pharmacistList = [...new Set(data.map((item) => item.pharmacist))];
            // create a select box with the pharmacist names
            const selectBox = document.createElement("select");
            selectBox.classList.add("form-select");
            selectBox.setAttribute("id", "pharmacist-select");
            selectBox.setAttribute("aria-label", "Select pharmacist");
            selectBox.innerHTML = "<option selected>Select a pharmacist</option>";
            for (let i = 0; i < pharmacistList.length; i++) {
                const pharmacist = pharmacistList[i];
                const option = document.createElement("option");
                option.value = pharmacist;
                option.innerHTML = pharmacist;
                selectBox.appendChild(option);
            }
            selectBox.addEventListener("change", function (event) {
                let pharmacist = event.target.value;
                let pharmacistAppointments = data.filter((item) => item.pharmacist === pharmacist);
                // clear the placeholder data
                placeholder_data.innerHTML = "";
                let ap_place_ul = document.createElement("ul");
                ap_place_ul.classList.add("list-group", "mt-3");
                // add the appointments to the page
                for (let i = 0; i < pharmacistAppointments.length; i++) {
                    const appointment = pharmacistAppointments[i];
                    const appointmentItem = document.createElement("li");
                    appointmentItem.classList.add("list-group-item");
                    appointmentItem.innerHTML =
                        "Date: " + appointment.date + "<br>Time: " + appointment.timeslot + "<br>Client: " + appointment.client;
                    ap_place_ul.appendChild(appointmentItem);
                }
                placeholder_data.appendChild(ap_place_ul);
                console.log(pharmacistAppointments);
            });
            // add the select box to the page
            let place = document.getElementById("collapseTwo").getElementsByClassName("accordion-body")[0];
            place.innerHTML = "";
            place.appendChild(selectBox);
            place.appendChild(placeholder_data);
            console.log(pharmacistList);
        })
        .catch((error) => {
            console.error("Error:", error);
        })
        .finally(() => {
            // cleanup that always needs to be done
        });
});

// event on CollapseThree open
const collapseThree = document.getElementById("collapseThree");
collapseThree.addEventListener("show.bs.collapse", function (event) {
    const main_content_for_configuration = document.getElementById("collapseThree").getElementsByClassName("accordion-body")[0];
    // clear the main content
    main_content_for_configuration.innerHTML = "";
    const configurationForm = document.createElement("form");
    configurationForm.setAttribute("id", "configuration-form");
    configurationForm.setAttribute("novalidate", "");
    configurationForm.setAttribute("method", "post");
    // get all pharmacists
    fetch(apiUrl + "/config/pharmacists")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            // create a select box with the pharmacist names and ids
            const selectBox = document.createElement("select");
            selectBox.classList.add("form-select");
            selectBox.setAttribute("id", "pharmacist-select");
            selectBox.setAttribute("aria-label", "Select pharmacist");
            selectBox.innerHTML = `<option value="" selected>Select a pharmacist</option>`;
            for (let i = 0; i < data.length; i++) {
                const pharmacist = data[i];
                const option = document.createElement("option");
                option.value = pharmacist.id;
                option.innerHTML = pharmacist.name;
                selectBox.appendChild(option);
            }
            selectBox.addEventListener("change", function (event) {
                let pharmacistId = event.target.value;
                console.log(pharmacistId);
                // clear the configuration form
                configurationForm.innerHTML = "";
                configurationForm.appendChild(selectBox);
                // filter the data for the selected pharmacist
                let pharmacistData = data.find((item) => item.id == pharmacistId);
                // set holiday checkbox
                const holidayCheckbox = document.createElement("div");
                holidayCheckbox.classList.add("form-check", "form-switch");
                let holidayLabel = document.createElement("label");
                holidayLabel.classList.add("form-check-label");
                holidayLabel.setAttribute("for", "holiday");
                holidayLabel.innerHTML = "On holiday";
                let holidayInput = document.createElement("input");
                holidayInput.setAttribute("type", "checkbox");
                holidayInput.setAttribute("role", "switch");
                holidayInput.setAttribute("id", "holiday");
                holidayInput.setAttribute("name", "on_holiday");
                if (pharmacistData.on_holidays) {
                    holidayInput.setAttribute("checked", "");
                }
                holidayInput.classList.add("form-check-input");
                holidayCheckbox.appendChild(holidayInput);
                holidayCheckbox.appendChild(holidayLabel);
                configurationForm.appendChild(holidayCheckbox);
                // get tghe availability data
                let table = create_availabitity_table(pharmacistData.available);
                configurationForm.appendChild(table);
                // add submit button to the form
                const submitButton = document.createElement("button");
                submitButton.setAttribute("type", "submit");
                submitButton.classList.add("btn", "btn-primary");
                submitButton.innerHTML = "Save";
                configurationForm.appendChild(submitButton);
                console.log(pharmacistData);
            });
            // add the select box to the form
            configurationForm.appendChild(selectBox);

            // add the event listener for the form submit
            configurationForm.addEventListener("submit", function (event) {
                event.preventDefault();
                event.stopPropagation();
                const formData = new FormData(configurationForm);
                const formObject = {};
                // add the pharmacist id to the form object
                formObject["pharmacist_id"] = parseInt(selectBox.value);
                formObject["on_holiday"] = formData.get("on_holiday") === "on" ? 1 : 0;
                formObject["morning"] = [];
                formObject["afternoon"] = [];
                formData.forEach((value, key) => {
                    if (key.endsWith("_morning")) {
                        formObject["morning"].push(key.split("_")[0]);
                    }
                    if (key.endsWith("_afternoon")) {
                        formObject["afternoon"].push(key.split("_")[0]);
                    }
                });
                let availability = {"morning":formObject["morning"],"afternoon": formObject["afternoon"]};
                formObject["availability"] = JSON.stringify(availability);
                delete formObject["morning"];
                delete formObject["afternoon"];
                // send the form data to the server
                fetch(apiUrl + "/config/pharmacists", {
                    method: "POST",
                    body: JSON.stringify(formObject),
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                    },
                }).then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                }).then((data) => {
                    console.log(data);
                }).catch((error) => {
                    console.error("Error:", error);
                });
                console.log(JSON.stringify(formObject));
            });

            main_content_for_configuration.appendChild(configurationForm);
            console.log(data);
        })
        .catch((error) => {
            console.error("Error:", error);
        })
        .finally(() => {
            // cleanup that always needs to be done
        });
});

function create_availabitity_table(data) {
    const table = document.createElement("table");
    const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
    const day_parts = ["morning", "afternoon"];
    table.classList.add("table");
    const thead = document.createElement("thead");
    thead.innerHTML = `<tr>
        <th scope="col">Day</th>
        <th scope="col">Morning</th>
        <th scope="col">Afternoon</th>
    </tr>`;
    table.appendChild(thead);
    const tbody = document.createElement("tbody");
    for (let i = 0; i < days.length; i++) {
        const day = days[i];
        const tr = document.createElement("tr");
        // create a row for each day
        let td = document.createElement("td");
        td.innerHTML = day;
        tr.appendChild(td);
        // create a checkbox for the morning
        td = document.createElement("td");
        let input = document.createElement("input");
        input.setAttribute("type", "checkbox");
        input.setAttribute("name", `${day}_morning`);
        input.setAttribute("id", `${day}_morning`);
        input.classList.add("form-check-input");
        //on sunday, disable the checkbox
        if (day === "sunday") {
            input.setAttribute("disabled", "");
        }
        if (data["morning"].includes(day)) {
            input.setAttribute("checked", "");
        }
        td.appendChild(input);
        tr.appendChild(td);
        // create a checkbox for the afternoon
        td = document.createElement("td");
        input = document.createElement("input");
        input.setAttribute("type", "checkbox");
        input.setAttribute("name", `${day}_afternoon`);
        input.setAttribute("id", `${day}_afternoon`);
        input.classList.add("form-check-input");
        //on saturday and sunday, disable the checkbox
        if (day === "saturday" || day === "sunday") {
            input.setAttribute("disabled", "");
        }
        if (data["afternoon"].includes(day)) {
            input.setAttribute("checked", "");
        }
        td.appendChild(input);
        tr.appendChild(td);
        tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    return table;
}
