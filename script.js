// const anime = require('animejs');

window.onload = (event) => {
    const pages = document.querySelectorAll("div.pages");
    const gallery_imgs = document.querySelectorAll("img.gallery_img");
    var mask = document.querySelector("#gallery_focus");
    var header = document.querySelectorAll("header")
    var header_items = document.querySelectorAll(".header_buttons")
    gallery_imgs.forEach(function(img) {
        console.log(img);
        img.addEventListener("mouseenter", function() {
            gallery_focus_fun(img, gallery_imgs, mask, header, header_items);
            // mask_in_transition(mask);
        });

        img.addEventListener("mouseleave", function() {
            gallery_unfocus_fun(img, gallery_imgs, mask, header, header_items);
        });
    })
    header_items.forEach(function(header_item) {
        console.log(header_item)
        header_item.addEventListener("click", function() {
            console.log("lol");
        });
    })

    const starting_page = "gallery_page";
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
    // console.log("tehe")
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

function gallery_focus_fun (img, all_imgs, mask, header, header_items) {
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

    console.log(img)

    anime({
        targets: img,
        scale: 1.06,
        duration: 200,
        easing:'easeInCubic',
    });

    var focus_filter = anime({
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
    console.log("focusing img, mask opacity: " + mask.style.opacity);
}

function mask_in_transition(mask){
    mask.style.opacity = "85%";
}

function gallery_unfocus_fun (img, all_imgs, mask, header, header_items) {
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
    console.log("de-focusing img, mask opacity: " + mask.style.opacity);
}



// for (var i = 0; i < gallery_imgs.length; i++) {
//     const img = gallery_imgs[i];
//     console.log(img);
    // img.addEventListener("onmouseover", function() {
    //     console.log(img);
    //     gallery_focus_fun(img);
    // });
// }


    //
    // mouseBlue.addEventListener("mouseout", function(e) {
    //     console.log("e.target.classList mouseBlue :", e.target.classList);
    //     mouseBlue.classList.toggle("open");
    // })
// })


// function gallery_focus()
//
// document.querySelector('img.gallery').onhover = tl.play;
// document.querySelector('.timeline-controls-demo .pause').onclick = tl.pause;
// document.querySelector('.timeline-controls-demo .restart').onclick = tl.restart;
//
// controlsProgressEl.addEventListener('input', function() {
//     tl.seek(tl.duration * (controlsProgressEl.value / 100));
// });