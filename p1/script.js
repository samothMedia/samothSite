const pages = document.querySelectorAll("div.pages");
const gallery_imgs = document.querySelectorAll("img.gallery_img");
var mask = document.querySelector("#gallery_focus");
var navbar_items = document.querySelectorAll(".navbar_buttons")
var header_titles = document.querySelectorAll(".header_title")
var black_footer_header = document.querySelectorAll(".black")
var white_footer_header = document.querySelectorAll(".white")
var headers = document.querySelectorAll("#header, #mobile_footer");
var footers = document.querySelectorAll("#footer, #mobile_header");
window.onload = (event) => {
    // loading_anime();

    gallery_imgs.forEach(function(img) {
        // console.log(img);
        img.addEventListener("mouseenter", function() {
            galleryFocus(img);
        });

        img.addEventListener("mouseleave", function() {
            console.log("mouse leave")
            galleryUnfocus(img);
        });

        img.oncontextmenu = function() {
            return false;
        };
    })

    navbar_items.forEach(function(navbar_item) {
        // console.log(header_item)
        navbar_item.addEventListener("click", function() {
            pageSwap(this);
            page_anime(navbar_item.id);
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
            $(white_footer_header).css("opacity", "40");
        }
    });

    anime({
        targets: black_footer_header,
        opacity: 100,
        duration: 100,
        easing:'linear',
    });
}
