window.onload = (event) => {
    loading_anime();
    const pages = document.querySelectorAll("div.pages");
    // const wrappers = document.querySelectorAll(".img_wrapper");
    const gallery_imgs = document.querySelectorAll("img.gallery_img");
    var mask = document.querySelector("#gallery_focus");
    var header_items = document.querySelectorAll(".header_buttons")
    var black_footer_items = document.querySelectorAll(".black_footer")
    var white_footer_items = document.querySelectorAll(".white_footer")
    gallery_imgs.forEach(function(img) {
        // console.log(img);
        img.addEventListener("mouseenter", function() {
            gallery_focus_fun(img, gallery_imgs, mask, header_items, black_footer_items, white_footer_items);
            // mask_in_transition(mask);
        });

        img.addEventListener("mouseleave", function() {
            gallery_unfocus_fun(img, gallery_imgs, mask, header_items, black_footer_items, white_footer_items);
        });

        img.oncontextmenu = function() {
            return false;
        };
    })
    header_items.forEach(function(header_item) {
        // console.log(header_item)
        header_item.addEventListener("click", function() {
            page_anime(header_item.id);
        });
    })

    const starting_page = "home_page";
    for (let i = 0; i < pages.length; i++) {
        if (pages[i].id === starting_page) {
            pages[i].style.display = "flex";
        } else {
            pages[i].style.display = "none";
        }
    }

};

function loading_anime() {
    var loading_page = document.querySelector("#loading_page")
    var loading_counter = document.querySelector("#loading_progress_counter");
    var loading_samoth = document.querySelector("#loading_samoth")
    // console.log(loading_counter);
    loading_counter.innerHTML = "5%.";
    setTimeout(function() {
        loading_counter.innerHTML = "25%.";
    }, 1300);
    setTimeout(function() {
        anime({
            targets: loading_counter,
            value: [50, 100],
            round: 1,
            duration: 800,
            easing:'easeInOutQuad',
            update: function(anim) {
                loading_counter.innerHTML = 50 + Math.round(anim.progress/2) + '%.';

            },
        })
    }, 3000);
    setTimeout(function() {
        anime({
            targets: loading_counter,
            opacity: 0,
            duration: 500,
            easing:'easeInOutQuad',
            complete: function () {
                loading_counter.style.display = "none";
                loading_samoth.style.opacity = "0%";
                loading_samoth.style.display = "flex";
            }
        })
    }, 5000);
    setTimeout(function() {
        anime({
            targets: loading_samoth,
            opacity: "100%",
            duration: 1200,
            easing:'easeInOutQuad',
        })
    }, 6000);
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
    }, 8500);

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

// setTimeout(function() {
//     // do something after 1000 milliseconds
//     var target = document.getElementById("home_samoth");
//     var rect = target.getBoundingClientRect()
//     console.log(rect.left + ', ' + rect.top);
// }, 4000);

// var controlsProgressEl = document.querySelector('.timeline-controls-demo .progress');
//
// var tl = anime.timeline({
//     direction: 'alternate',
//     loop: true,
//     duration: 500,
//     easing: 'easeInOutSine',
//     update: function(anim) {
//         controlsProgressEl.value = tl.progress;
//     }
// });
//
// tl
//     .add({
//         targets: '.timeline-controls-demo .square.el',
//         translateX: 270,
//     })
//     .add({
//         targets: '.timeline-controls-demo .circle.el',
//         translateX: 270,
//     }, '-=100')
//     .add({
//         targets: '.timeline-controls-demo .triangle.el',
//         translateX: 270,
//     }, '-=100');
//
// var gallery_focus = anime({
//     targets: '.css-selector-demo .el',
//     translateX: 250
// });

function gallery_focus_fun (img, all_imgs, mask, header_items, black_footer_items, white_footer_items) {
    all_imgs.forEach(function(other_img) {
        if (other_img === img) {
            other_img.style.zIndex = 10;
        }
        else {
            other_img.style.zIndex = -10;
        }
    })
    header_items.forEach(function(header_item) {
        header_item.style.zIndex = 20;
    })
    mask.style.zIndex = 5;

    // console.log(img)

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
        // loop: true,
        // update: function(anim) {
        //     if (Math.round(anim.progress) > 98) {
        //         mask.style.opacity = "85%";
        //         mask.style.display = "block"
        //     }
        // }
    });

    anime({
        targets: header_items,
        color: "#EAEAEA",
        // textShadow: [
        //     {
        //         "value": "0 0 10px #EAEAEA",
        //         "delay": 0,
        //     }],
        duration: 200,
        easing:'linear',
    });

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
    // black_footer_items.style.display = "none";
    // white_footer_items.style.display = "flex";
    anime({
        targets: white_footer_items,
        opacity: 100,
        duration: 100,
        easing:'linear',
    });
}

function gallery_unfocus_fun (img, all_imgs, mask, header_items, black_footer_items, white_footer_items) {
    all_imgs.forEach(function(all_img) {
       all_img.style.zIndex = 0;
    })
    header_items.forEach(function(header) {
        // header_items.style.zIndex = 5;
    })
    // header.style.zIndex = 0;

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
    anime({
        targets: header_items,
        color: "#000000",
        // textShadow: '0',
        textShadow: [{"value": "none"}],
        duration: 200,
        easing:'easeInCubic',
    });
    mask.style.zIndex = -10;

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



// for (var i = 0; i < gallery_imgs.length; i++) {
//     const img = gallery_imgs[i];
//     console.log(img);
    // img.addEventListener("onmouseover", function() {
    //     console.log(img);
    //     gallery_focus_fun(img);
    // });
// }


