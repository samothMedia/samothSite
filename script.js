window.onload = (event) => {
    const pages = document.querySelectorAll("div.pages");
    const starting_page = "home_page";
    for (let i = 0; i < pages.length; i++) {
        if (pages[i].id === starting_page) {
            pages[i].style.display = "flex";
        } else {
            pages[i].style.display = "none";
        }
    }
};

function sectionSwap(new_active) {
    let current_page = findCurrentActive();
    let target_page = document.getElementById(new_active);
    if (current_page !== target_page) {
        changeActive(target_page, current_page);
    }
}

function findCurrentActive() {
    const pages = document.querySelectorAll("div.pages");
    for (let i = 0; i < pages.length; i++) {
        if (pages[i].style.display !== "none") {
            return pages[i]
        }
    }
}

function changeActive(target_page, current_page){
    //set current active section invisible
    current_page.style.display = "none";
    //set new active section visible
    target_page.style.display = "flex";
}


// set the date we're counting down to
var countDownDate = new Date("Sep 1, 2023 18:15:00").getTime();

// Update the count down every 1 second
var timer = setInterval(function() {
    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="demo"
    // document.getElementById("date").innerHTML = days + " days. " + hours + " hrs. "
    //     + minutes + " mins. " + seconds + " secs.";
    // document.getElementById("gallery_date").innerHTML = days + " days. " + hours + " hrs. "
    //     + minutes + " mins. " + seconds + " secs.";

    document.getElementById("home_subtitle").innerHTML = "view on ig.";
    document.getElementById("gallery_date").innerHTML = "9/1.";

    // If the count down is finished, write some text
    if (distance < 0) {
        clearInterval(timer);
        document.getElementById("home_subtitle").innerHTML = "view on ig & in gallery.";
        document.getElementById("gallery_date").style.display = "none";
    }
}, 1000);
//
// setTimeout(function() {
//     // do something after 1000 milliseconds
//     var target = document.getElementById("home_samoth");
//     var rect = target.getBoundingClientRect()
//     console.log(rect.left + ', ' + rect.top);
// }, 4000);

