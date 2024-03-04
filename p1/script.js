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
            galleryFocus(img, mask);
        });

        img.addEventListener("mouseleave", function() {
            gallery_unfocus_Layering(gallery_imgs, navbar_items, header_titles, headers, footers);
            gallery_unfocus_imgAnime(img, mask);
            gallery_unfocus_headerAnime(navbar_items, header_titles);
            gallery_unfocus_footerAnime(white_footer_items, black_footer_items);

            // gallery_unfocus(img, gallery_imgs, mask, header_title, header_items, black_footer_items, white_footer_items);
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
        // targetButton = document.getElementById(new_active + "_button");
        // changeActiveButton(newActiveButton, currentButton);
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

function changeActiveButton(target_button, current_button) {
    // $(current_button).css("color", 'black');
    // $(target_button).css("color", 'red');

    $(current_button).removeClass("active_page_button");
    $(target_button).addClass("active_page_button");
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
        var gallery_imgs = document.querySelectorAll("img.gallery_img");
        const width = window.innerWidth;
        // gallery_imgs.forEach((img) => {
        //     img.style.translateX = width;
        //     // img.style.opacity = 0;
        // })
        anime({
            targets: gallery_imgs,
            // translateX: [-width, 0],
            opacity: ["0%", "100%"],
            duration: 600,
            easing:'easeInOutQuad',
            delay: anime.stagger(100)
        })
    }
}

function galleryFocus(img, mask) {
    //gallery image layering
    $(img).addClass("isFocus");
    $(gallery_imgs).addClass("notFocus");

    //header layering
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


function gallery_unfocus_Layering(all_imgs, header_items, header_title, header) {
    all_imgs.forEach(function(all_img) {
        all_img.style.zIndex = 0;
    })
    header_items.forEach(function(header_item) {
        header_item.style.zIndex = 5;
    })
    header_title.style.zIndex = 5;

    header.style.zIndex = 10;
    header.style.backgroundColor = "#eaeaea";
}

function gallery_unfocus_imgAnime(img, mask) {
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
}

function gallery_unfocus_headerAnime(header_items, header_title) {
    header_items.forEach(function(header_item) {
        $(header_item).removeClass("gallary_focus");
    })
    $(header_title).removeClass("gallary_focus")
}

function gallery_unfocus_footerAnime(white_footer_items, black_footer_items) {
    anime({
        targets: white_footer_items,
        opacity: 0,
        duration: 100,
        easing:'linear',
        complete: function () {
            white_footer_items.forEach(function(footer_item) {
                footer_item.style.display = "none";
            })
            black_footer_items.forEach(function(footer_item) {
                footer_item.style.display = "flex";
            })
        }
    });

    anime({
        targets: black_footer_items,
        opacity: 100,
        duration: 100,
        easing:'linear',
    });
}