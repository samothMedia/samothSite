// const anime = require('animejs');

window.onload = (event) => {
    const pages = document.querySelectorAll("div.pages");
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

function gallery_focus_fun (img) {
    console.log(img);
    var gallery_focus = anime({
        targets: img,
        scale: 105,
        duration: 400,
        easing:'easeInCubic',
    });
}

const gallery_imgs = document.querySelectorAll("img.gallery_img");

// for (var i = 0; i < gallery_imgs.length; i++) {
//     const img = gallery_imgs[i];
//     console.log(img);
//     img.addEventListener("onmouseover", function() {
//         console.log(img);
//         gallery_focus_fun(img);
//     });
// }
// gallery_imgs.forEach(function(img) {
//     img.addEventListener("mouseenter", function() {
//         gallery_focus_fun(img);
//     });
// })

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