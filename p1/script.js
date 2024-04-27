const pages = document.querySelectorAll("div.pages");
const gallery_imgs = document.querySelectorAll("img.gallery_img");
var mask = document.querySelector("#gallery_mask");
var navbar_items = document.querySelectorAll(".navbar_buttons")
var header_titles = document.querySelectorAll(".header_title")
var black_footer_header = document.querySelectorAll(".black")
var white_footer_header = document.querySelectorAll(".white")
var headers = document.querySelectorAll("#header, #mobile_footer");
var footers = document.querySelectorAll("#footer, #mobile_header");
var spotlightLayer = document.querySelector("#gallery_spotlight");
var spotlightImg = document.querySelector("#gallery_spotlight_img");
var homeLandingSection = document.querySelector("#landing_section");
var homeDisplaySection = document.querySelector("#display_section");
var isMobile = false;
var isSpotlight = false;

window.onload = () => {
    loading_anime()

    preReleaseTimer();

    windowResize();

    gallery_imgs.forEach(function(img) {
        // console.log(img);
        img.addEventListener("mouseenter", function() {
          if (!isSpotlight && !isMobile) {
            galleryFocus(img);
          }
        });

        img.addEventListener("mouseleave", function() {
          if (!isSpotlight && !isMobile) {
            galleryUnfocus(img);
          }
        });

        img.addEventListener("click", function () {
            gallery_spotlightLayering(img);
        })
    })

    navbar_items.forEach(function(navbar_item) {
        // console.log(header_item)
        navbar_item.addEventListener("click", function() {
            pageSwap(this);
            page_anime(navbar_item.value);
        });
    })

    const starting_page = "home";

    for (let i = 0; i < pages.length; i++) {
        if (pages[i].id === starting_page + "_page") {
            pages[i].style.display = "flex";
        } else {
            pages[i].style.display = "none";
        }
    }

    $(document.querySelectorAll('.' + starting_page)).addClass("active_page_button");
};

function loading_anime() {
    var loading_page = document.querySelector("#loading_page")
    var loading_counter = document.querySelector("#loading_progress_counter");
    var loading_samoth = document.querySelector("#loading_samoth")
    loading_samoth.style.display = "flex";

    anime({
        targets: loading_samoth,
        opacity: "100%",
        duration: 1200,
        easing:'easeInOutQuad',
    })
    setTimeout(function() {
        anime({
            targets: [loading_samoth, loading_page],
            opacity: ["100%", "0%"],
            duration: 1200,
            easing:'easeInOutQuad',
            complete: function () {
                loading_samoth.style.display = "none";
                loading_page.style.display = "none";
            }
        })
    }, 1500);
}

function pageSwap(newActiveButton) {
    let current_page = findCurrentActive();

    let target_page = document.getElementById(newActiveButton.value + "_page");
    if (current_page !== target_page) {
        changeActivePage(target_page, current_page);

        $(document.querySelectorAll('.active_page_button')).removeClass("active_page_button");
        $(document.querySelectorAll('.' + newActiveButton.value)).addClass("active_page_button");
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

function changeActivePage(target_page, current_page) {
    //set current active section invisible
    current_page.style.display = "none";
    //set new active section visible
    target_page.style.display = "flex";

}

function page_anime(navbar_button_value) {
    if (!(navbar_button_value === "home")) {
        $(white_footer_header).css("display", "none")
        $(black_footer_header).css("display", "flex")
        $(document.querySelector("#mobile_header_samoth")).removeClass("teaser_text")
        // $(document.querySelector("#mobile_header")).css("opacity", "100%")
    } else {
        $(white_footer_header).css("display", "flex")
        $(black_footer_header).css("display", "none")
        $(document.querySelector("#mobile_header_samoth")).addClass("teaser_text")
        // $(document.querySelector("#mobile_header")).css("opacity", "40%")
    }

    if (navbar_button_value === "gallery") {
        anime({
            targets: gallery_imgs,
            opacity: ["0%", "100%"],
            duration: 600,
            easing:'easeInOutQuad',
            delay: anime.stagger(100)
        })
    }
}

function galleryFocus(img) {
    //gallery image layering
    $(img).addClass("isFocus");
    otherImgs = document.querySelectorAll(".gallery_img:not(.isFocus)")
    $(otherImgs).addClass("notFocus");

    //header/footer layering
    $(headers).addClass("header-footer_gallery_focus");
    $(footers).addClass("header-footer_gallery_focus");

    //img & mask animations
    anime({
        targets: img,
        scale: 1.06,
        duration: 200,
        easing:'easeInCubic',
    });

    anime({
        targets: mask,
        opacity: .87,
        duration: 200,
        easing:'linear',
    });

    //header "animations"
    $(navbar_items).addClass("gallery_focus");
    $(header_titles).addClass("gallery_focus");

    //footer animations
    anime({
        targets: black_footer_header,
        opacity: 0,
        duration: 100,
        easing:'linear',
        complete: function () {
            $(black_footer_header).css("display", "none");
            $(white_footer_header).css("display", "flex");
        }
    });

    anime({
        targets: white_footer_header,
        opacity: 100,
        duration: 100,
        easing:'linear',
    });
}


function galleryUnfocus(img) {
    //gallery image layering
    $(img).removeClass("isFocus");
    $(gallery_imgs).removeClass("notFocus");

    //header/footer layering
    $(headers).removeClass("header-footer_gallery_focus");
    $(footers).removeClass("header-footer_gallery_focus");

    //img & mask animations
    anime({
        targets: img,
        scale: 1,
        duration: 200,
        easing: 'easeInCubic',
    });
    anime({
        targets: mask,
        opacity: 0,
        duration: 200,
        easing: 'linear',
    });

    //header "animations"
    $(navbar_items).removeClass("gallery_focus");
    $(header_titles).removeClass("gallery_focus");

    //footer animations
    anime({
        targets: white_footer_header,
        opacity: 0,
        duration: 100,
        easing:'linear',
        complete: function () {
            $(white_footer_header).css("display", "none");
            $(black_footer_header).css("display", "flex");
            $(white_footer_header).css("opacity", "");
        }
    });

    anime({
        targets: black_footer_header,
        opacity: 100,
        duration: 100,
        easing:'linear',
    });
}

function gallery_spotlightLayering(target_img) {
    $(document.querySelector("#gallery_content")).addClass("galleryContent-SpotlightEnabled");

    isSpotlight = true;

    //clear out galleryFocus and its layerings
    galleryUnfocus(target_img);

    //spotlight img assigned to clicked img
    spotlightImg.src = target_img.src;

    var targetScale;
    if (!isMobile) {
        var headerHeight = parseInt(window.getComputedStyle(headers[0]).getPropertyValue("height"))
        var newHeight = window.visualViewport.height - headerHeight;
        var currentHeight = parseInt(window.getComputedStyle(spotlightImg).getPropertyValue('height'))
        targetScale = newHeight / currentHeight
        // console.log("target height:" + newHeight)
        // console.log("current height:" + currentHeight)
        // console.log("target scale:" + targetScale)

    } else {
        var newWidth = window.visualViewport.width - 40;
        var currentWidth = parseInt(window.getComputedStyle(spotlightImg).getPropertyValue('width'))
        targetScale = newWidth / currentWidth;

        // $(spotlightEsc).addClass("gallery_spotlight_esc-isMobile");
    }
    $(spotlightImg).css('scale', targetScale);

    $(mask).addClass("galleryMask-SpotlightEnabled");

    var spotlightAnime = anime.timeline({
        duration: 0
    });
    spotlightAnime.add({ //spotlight layer anime
        targets: spotlightLayer,
        opacity: [0, 1],
        easing:'easeInCubic',
        duration: 400,
    }, 0).add({ //mask anime
        targets: mask,
        opacity: .96,
        easing:'linear',
        duration: 200,
    },  0)


    let escKeyHandler = function (e) {
        if (e.code === "Escape" || e.code === "Esc") {
            galleryUnspotlight();
            document.removeEventListener('keydown', escKeyHandler)
        }
    }
    document.addEventListener('keydown', escKeyHandler);

    let escClickHandler = function () {
        galleryUnspotlight();
        mask.removeEventListener('click', escClickHandler)
    }
    mask.addEventListener('click', escClickHandler);
}

function galleryUnspotlight() {
    var spotlightAnime = anime.timeline({
        duration: 0
    });
    spotlightAnime.add({ //spotlight layer anime
        targets: spotlightLayer,
        opacity: [1, 0],
        easing:'easeInCubic',
        duration: 400,
    }, 0).add({ //mask anime
        targets: mask,
        opacity: 0,
        easing:'linear',
        duration: 200,
    },  0)

    $(mask).removeClass("galleryMask-SpotlightEnabled");
    $(spotlightImg).css('scale', 0);
    spotlightImg.src = " ";

    isSpotlight = false;
    $(document.querySelector("#gallery_content")).removeClass("galleryContent-SpotlightEnabled");
}

function preReleaseTimer() {
    // set the date we're counting down to
    var countDownDate = new Date("April 29, 2024 10:00:00").getTime();

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

        // Display the result in the element with id="display_section_preRel_timer"
        if (days > 0) {
            document.getElementById("display_section_preRel_timer").innerHTML = days + 1 + " DAYS.";
            // console.log("hereDAYS");
        } else if (hours > 0) {
            document.getElementById("display_section_preRel_timer").innerHTML = hours + 1 + " HOURS.";
            // console.log("hereHRS");
        } else if (minutes > 0) {
            document.getElementById("display_section_preRel_timer").innerHTML = minutes + 1 + " MINUTES.";
            // console.log("hereMins");
        } else if (seconds > 0) {
            document.getElementById("display_section_preRel_timer").innerHTML = seconds + " SECONDS."
            // console.log("hereSeconds");
        } else {
            document.getElementById("display_section_preRel_timer").innerHTML = "OUT NOW :0"
            // console.log("hereLAST");
        }

        // If the count down is finished, write some text
        // if (distance < 0) {
        //     clearInterval(timer);
        //     document.getElementById("home_subtitle").innerHTML = "view on ig & in gallery.";
        //     document.getElementById("gallery_date").style.display = "none";
        // }
    }, 1000);
}

function windowResize() {
    var secondTimer = setInterval(function() {
        // var currentHeight = $(window).height();

        if (window.visualViewport.width < window.visualViewport.height) {
            isMobile = true;
        }
        var currentHeight = window.visualViewport.height;
        $(homeLandingSection).css("height",(currentHeight-55) + "px")
        $(homeDisplaySection).css("height",(currentHeight-55) + "px")

        if (isMobile) {
            $(homeLandingSection).css("margin", "0");
            $(homeDisplaySection).css("margin", "0 0 55px 0");
        } else {
            $(homeLandingSection).css("margin", "55px 0 0 0");
            $(homeDisplaySection).css("margin", "0");
        }
    }, 1000);
}