const pages = document.querySelectorAll("div.pages");
const gallery_imgs = document.querySelectorAll("img.gallery_img");
var mask = document.querySelector("#gallery_focus");
var navbar_items = document.querySelectorAll(".navbar_buttons")
var header_titles = document.querySelectorAll(".header_title")
var black_footer_header = document.querySelectorAll(".black")
var white_footer_header = document.querySelectorAll(".white")
var headers = document.querySelectorAll("#header, #mobile_footer");
var footers = document.querySelectorAll("#footer, #mobile_header");
var isSpotlight = false;

window.onload = (event) => {
    // loading_anime();

    gallery_imgs.forEach(function(img) {
        // console.log(img);
        img.addEventListener("mouseenter", function() {
          if (!isSpotlight) {
            galleryFocus(img);
          }
        });

        img.addEventListener("mouseleave", function() {
          if (!isSpotlight) {
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
            page_anime(navbar_item.id);
        });
    })

    const starting_page = "gallery";

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

function page_anime(page_header_id) {
    if (!(page_header_id === "home_button" || page_header_id === "mobile_home_button")) {
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

    if (page_header_id === "gallery_button") {
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
            $(white_footer_header).css("opacity", "40%");
        }
    });

    anime({
        targets: black_footer_header,
        opacity: 100,
        duration: 100,
        easing:'linear',
    });
}


function disableScroll() {
    // Get the current page scroll position
    const viewport = window.visualViewport;
    scrollTop = window.pageYOffset || document.querySelector("#gallery_content").scrollTop;
    scrollLeft = window.pageXOffset || document.querySelector("#gallery_content").scrollLeft;

        // if any scroll is attempted,
        // set this to the previous value
    document.querySelector("#gallery_content").onscroll = function () {
        console.log("scroll attempt")
        window.scrollTo(scrollLeft, scrollTop);
    };
}

function enableScroll() {
    window.onscroll = function () { };
}

function gallery_spotlightLayering(target_img) {
    // disableScroll();
    $(document.querySelector("#gallery_content")).addClass("gallerySpotlightEnabled");

    isSpotlight = true;

    //header/footer layering
    // $(headers).addClass("header-footer_gallery_focus");
    $(headers).removeClass("header-footer_gallery_focus");
    $(footers).removeClass("header-footer_gallery_focus");
    // $(navbar_items).removeClass("gallery_focus");
    // $(header_titles).addClass("gallery_focus");
    $(target_img).addClass("isFocus");

    var headerHeight = parseInt(window.getComputedStyle(headers[0]).getPropertyValue("height"))

    var windowHeight = parseInt(window.getComputedStyle(document.querySelector("#gallery_page")).getPropertyValue('height'));
    console.log(windowHeight)

    var newHeight = windowHeight - headerHeight * 1.5;
    var currentHeight = parseInt(window.getComputedStyle(target_img).getPropertyValue('height'))

    var targetScale = Math.round(newHeight / currentHeight * 100)
    console.log(parseInt(window.getComputedStyle(target_img).getPropertyValue('height')))
    console.log(targetScale)

    // target_img.style.position = 'absolute';

    //calculate translateX & Y values that will center target_img based on current X & Y instead of moving img

    anime({
        targets: target_img,
        scale: targetScale.toString() + '%',
        // top: '50%',
        // left: '50%',
        // translateX: '-50%',
        // translateY: '-50%',
        duration: 400,
        easing:'easeInCubic',
    });

    anime({
        targets: mask,
        opacity: .96,
        duration: 400,
        easing:'linear',
    });
}

