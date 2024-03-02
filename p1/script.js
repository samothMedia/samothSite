var isSpotlight = false;

window.onload = (event) => {
    // loading_anime();
    const pages = document.querySelectorAll("div.pages");
    // const wrappers = document.querySelectorAll(".img_wrapper");
    const gallery_imgs = document.querySelectorAll("img.gallery_img");
    var mask = document.querySelector("#gallery_focus");
    var header_items = document.querySelectorAll(".header_buttons")
    var header_title = document.querySelector(".header_title")
    var black_footer_items = document.querySelectorAll(".black_footer")
    var white_footer_items = document.querySelectorAll(".white_footer")
    var header = document.querySelector("header");

    gallery_imgs.forEach(function(img) {
        // console.log(img);
        img.addEventListener("mouseenter", function() {
            if (!isSpotlight) {
                gallery_focus_Layering(img, header, header_title, header_items);
                gallery_focus_imgAnime(img, mask);
                gallery_focus_headerAnime(header_items, header_title);
                gallery_focus_footerAnime(black_footer_items, white_footer_items);
            }
        });

        img.addEventListener("mouseleave", function() {
            if (!isSpotlight) {
                gallery_unfocus_Layering(gallery_imgs, header_items, header_title, header);
                gallery_unfocus_imgAnime(img, mask);
                gallery_unfocus_headerAnime(header_items, header_title);
                gallery_unfocus_footerAnime(white_footer_items, black_footer_items);
            }
        });

        img.addEventListener("click", function() {
            isSpotlight = true;
            gallery_spotlightLayering(img, header, mask);
            // gallery_spotlightAnime(img, mask);
            // gallery_unfocus(img, gallery_imgs, mask, header_title, header_items, black_footer_items, white_footer_items);
        });
    })
    header_items.forEach(function(header_item) {
        // console.log(header_item)
        header_item.addEventListener("click", function() {
            page_anime(header_item.id);

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

    $(document.querySelector('#' + starting_page + '_button')).addClass("active_page_button");
};

function loading_anime() {
    var loading_page = document.querySelector("#loading_page")
    var loading_counter = document.querySelector("#loading_progress_counter");
    var loading_samoth = document.querySelector("#loading_samoth")
    loading_samoth.style.display = "flex";
    // console.log(loading_counter);
    // loading_counter.innerHTML = "5%.";
    // setTimeout(function() {
    //     loading_counter.innerHTML = "25%.";
    // }, 1300);
    // setTimeout(function() {
    //     anime({
    //         targets: loading_counter,
    //         value: [50, 100],
    //         round: 1,
    //         duration: 800,
    //         easing:'easeInOutQuad',
    //         update: function(anim) {
    //             loading_counter.innerHTML = 50 + Math.round(anim.progress/2) + '%.';
    //
    //         },
    //     })
    // }, 3000);
    // setTimeout(function() {
    //     anime({
    //         targets: loading_counter,
    //         opacity: 0,
    //         duration: 500,
    //         easing:'easeInOutQuad',
    //         complete: function () {
    //             loading_counter.style.display = "none";
    //             loading_samoth.style.opacity = "0%";
    //             loading_samoth.style.display = "flex";
    //         }
    //     })
    // }, 5000);
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

    // console.log("???");
}

function page_anime(page_header_id) {
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

function gallery_scroll_anime_in(img) {
    anime({
        targets: img,
        scale: 1,
        opacity: 100,
        duration: 500,
        delay: 150,
    })
}

function gallery_scroll_anime_out(img) {
    anime({
        targets: img,
        scale: .2,
        opacity: 10,
        duration: 500,
        delay: 150,
    })
}

function sectionSwap(new_active) {
    let current_page = findCurrentActive();
    let target_page = document.getElementById(new_active + "_page");
    if (current_page !== target_page) {
        changeActivePage(target_page, current_page);

        currentButton = document.querySelector('.active_page_button');
        targetButton = document.getElementById(new_active + "_button");
        changeActiveButton(targetButton, currentButton);
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

function gallery_focus_Layering(target_img, header, header_title, header_items) {
    target_img.style.zIndex = 100;

    header_items.forEach(function(header_item) {
        header_item.style.zIndex = 100;
    })

    header_title.style.zIndex = 100;

    header.style.zIndex = 100;
    header.style.backgroundColor = "transparent";
}

function gallery_focus_imgAnime(img, mask) {
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
}

function gallery_focus_headerAnime(header_items, header_title) {
    header_items.forEach(function(header_item) {
        $(header_item).addClass("gallary_focus");
    })
    $(header_title).addClass("gallary_focus")
}

function gallery_focus_footerAnime(black_footer_items, white_footer_items) {
    anime({
        targets: black_footer_items,
        opacity: 0,
        duration: 100,
        easing:'linear',
        complete: function () {
            black_footer_items.forEach(function(footer_item) {
                footer_item.style.display = "none";
            })
            white_footer_items.forEach(function(footer_item) {
                footer_item.style.display = "flex";
            })
        }
    });
    black_footer_items.style.display = "none";
    white_footer_items.style.display = "flex";
    anime({
        targets: white_footer_items,
        opacity: 100,
        duration: 100,
        easing:'linear',
    });
}

function gallery_unfocus_Layering(all_imgs, header_items, header_title, header) {
    all_imgs.forEach(function(imgs) {
        imgs.style.zIndex = 0;
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
    // white_footer_items.style.display = "none";
    // black_footer_items.style.display = "flex";
    anime({
        targets: black_footer_items,
        opacity: 100,
        duration: 100,
        easing:'linear',
    });
}

function gallery_unfocus(img, all_imgs, mask, header_title, header_items, black_footer_items, white_footer_items) {
    all_imgs.forEach(function(all_img) {
       all_img.style.zIndex = 0;
    })
    header_items.forEach(function(header_item) {
        header_item.style.zIndex = 5;
    })
    header_title.style.zIndex = 5;

    var header = document.querySelector("header")
    header.style.zIndex = 5;
    header.style.backgroundColor = "eaeaea";

    anime({
        targets: img,
        scale: 1,
        duration: 200,
        easing:'easeInCubic',
    });
    anime({
        targets: mask,
        opacity: 0,
        duration: 200,
        easing:'linear',
    });

    header_items.forEach(function(header_item) {
        $(header_item).removeClass("gallary_focus");
    })
    $(header_title).removeClass("gallary_focus")

    // anime({
    //     targets: header_items,
    //     color: "#000000",
    //     // textShadow: '0',
    //     textShadow: [{"value": "none"}],
    //     duration: 200,
    //     easing:'easeInCubic',
    // });

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
    // white_footer_items.style.display = "none";
    // black_footer_items.style.display = "flex";
    anime({
        targets: black_footer_items,
        opacity: 100,
        duration: 100,
        easing:'linear',
    });
}


function disableScroll() {
    // Get the current page scroll position
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

        // if any scroll is attempted,
        // set this to the previous value
        window.onscroll = function () {
            window.scrollTo(scrollLeft, scrollTop);
        };
}

function enableScroll() {
    window.onscroll = function () { };
}

function gallery_spotlightLayering(target_img, header, mask) {
    disableScroll();

    target_img.style.zIndex = 100;

    var headerHeight = parseInt(window.getComputedStyle(header).getPropertyValue("height"))
    var spotlightMargin = headerHeight  * 1.5
    console.log(spotlightMargin)

    var windowHeight = parseInt(window.getComputedStyle(document.querySelector("#gallery_page")).getPropertyValue('height'));
    console.log(windowHeight)

    var newHeight = windowHeight - spotlightMargin * 2;
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
        translateX: '-50%',
        translateY: '-50%',
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

