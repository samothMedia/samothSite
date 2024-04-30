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
var aboutAboutSection = document.querySelector("#about_section");
var aboutAboutSectionText = document.querySelector("#about_text_container")
var aboutMemberSection = document.querySelector("#member_section");
var aboutMemberBlocker = document.querySelector('#members_dev_blocker')
var displayImgs = document.querySelectorAll(".p2_display_imgs");
var displayGrid = document.querySelector("#display_img_container");
var memberNameDiv = document.querySelector("#member_name_div");
var memberDetails = document.querySelector("#member_details_div")
var memberNames;
var memberTitle = document.querySelector("#member_section_title");
let memberNameArray = [];
const nametoDataMap = new Map;

var isMobile = window.visualViewport.width < 769;
var isSpotlight = false;

window.onload = () => {
    loading_anime()

    // preReleaseTimer();

    windowResize();
    // console.log(isMobile);
    // buildLandingDisplay();
    // buildAboutMembers();

    allImgs = [gallery_imgs];
    // allImgs = [gallery_imgs, displayImgs];
    allImgs.forEach(function(imgList) {
        imgList.forEach(function (img ) {
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
                gallerySpotlight(img);
            })
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

function gallerySpotlight(target_img) {
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
    var countDownDate = new Date("April 30, 2024 10:00:00").getTime();

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
            document.getElementById("display_section_preRel_timer").innerHTML = days + " DAY.";
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
    }, 1000);
}

function windowResize() {
    var secondTimer = setInterval(function() {
        // var currentHeight = $(window).height();

        // console.log(window.visualViewport.width)

        if (window.visualViewport.width < 769) {
            isMobile = true;
        }
        var currentHeight = window.visualViewport.height;
        $(homeLandingSection).css("height",(currentHeight-55) + "px")
        $(aboutAboutSection).css("height",(currentHeight-55) + "px")
        $(aboutMemberSection).css("height",(currentHeight-55) + "px")
        $(aboutMemberBlocker).css("height",(currentHeight-55) + "px")
        $(aboutAboutSection).css("margin", "55px 0 0 0");

        if (isMobile) {
            $(homeLandingSection).css("margin", "0");
            $(homeDisplaySection).css("margin", "0 0 55px 0");

            // $(aboutAboutSection).css("margin", "0");
            $(aboutMemberSection).css("margin", "0 0 55px 0");

            // $(aboutAboutSectionText).css("margin", "55px 0 0 0");
        } else {
            $(homeLandingSection).css("margin", "55px 0 0 0");
            $(homeDisplaySection).css("margin", "0");

            // $(aboutAboutSection).css("margin", "55px 0 0 0");
            $(aboutMemberSection).css("margin", "0");

          // $(aboutAboutSectionText).css("margin", "0");
        }

        // console.log(isMobile)
    }, 1000);
}

function buildLandingDisplay() {
  const gridComputedStyle = window.getComputedStyle(document.getElementById("display_img_container"));

// get number of grid rows
  const gridRowCount = gridComputedStyle.getPropertyValue("grid-template-rows").split(" ").length;

// get number of grid columns
  const gridColumnCount = gridComputedStyle.getPropertyValue("grid-template-columns").split(" ").length;

  // console.log(gridRowCount, gridColumnCount);

  var style = document.createElement('style');
  document.querySelector('head').appendChild(style);

  imgPosition = [
      [1365, 200, 125],
      [1640, 1655, 366],
      [1365, 3385, 125],
      [1494, 200, 2263],
      [2966, 1784, 2263],
      [1494, 200, 4456],
      [1647, 1784, 4084],
      [1229, 3521, 4084],
      [3040, 200, 5811],
      [1420, 3330, 5811],
      [1270, 200, 7675],
      [3190, 1560, 7675],
      [1456.51, 200, 9606],
      [1456.51, 1746.74, 9606],
      [1456.51, 3293.48, 9606],
  ]
  var currentViewportWidth = window.visualViewport.width;
  var singleColumnGrid = currentViewportWidth <= 576;

  if (singleColumnGrid) {
      var landingBackground = document.getElementById('p2HomePostReleaseBackground');
      $(landingBackground).attr("src","index_resources/landing/p2PostReleaseLandingMobile" + (Math.ceil(Math.random()*9)).toString() + ".png");
  }

  var scale = currentViewportWidth / 4950

  var gridWidth = 4550 * scale;
  var gridHeight = 11666.3 * scale;
  $(displayGrid).css('width', gridWidth);
  if (singleColumnGrid) {
      $(displayGrid).css('height', 'auto');
      $(homeDisplaySection).css('height', 'auto')
  } else {
      $(displayGrid).css('height', gridHeight);
      $(homeDisplaySection).css('height', gridHeight+150)
  }
    // }

  // var counter = 0;
  var rowCounter = 1;
  for (var i = 1; i < 16; i++) {
    var oldI = -1;
    if (singleColumnGrid) {
        if (i === 1) {
            oldI = i;
            i = 5;
        } else if (i === 5) {
            oldI = i;
            i = 1;
        }
    }

    var newImg = '<img id="display_img_' + i + '" class="p2_display_imgs" ' +
        'src="index_resources/display/p2Display' + i + '.png" alt="p2 post release display img" ';

    var newWidth;
    var imgColumn;
    var imgRow;

    if (singleColumnGrid) {
        newWidth = gridWidth;
        imgColumn = 0;
        imgRow = 0;
        
        $(displayGrid).addClass('mobileDisplay')
    } else {
        newWidth = Math.round(imgPosition[i-1][0] * scale);
        imgColumn = Math.round(((imgPosition[i-1][1]-200)*scale)/2 + 1); //columns start at 1
        imgRow = Math.round(((imgPosition[i-1][2]-125)*scale)/2 + 1); //rows start at 1
    }
    newImg +=  'style="width: ' + newWidth + 'px; ';

    // $(document.querySelector("#display_img_" + i)).css("width", newWidth);

    // var imgColumn = Math.round(((imgPosition[i-1][1]-200)*scale)/2 + 1); //columns start at 1
    // var imgRow = Math.round(((imgPosition[i-1][2]-125)*scale)/2 + 1); //rows start at 1

    newImg +=  'grid-row: ' + imgRow + '; ';
    newImg +=  'grid-column: ' + imgColumn + ';">';

    $(displayGrid).append(newImg);

    // $(style).append('.displayImg' + counter +  ' { grid-column: ' + imgColumn + '; grid-row: ' + imgRow + ';}')
    // $(img).addClass("displayImg" + counter);
    // counter++;
    if (oldI !== -1) {
        i = oldI;
        oldI = -1;
    }
  }

  var displayText = 'photography: miles fortuno<br>' +
      'creative direction & editing: miles thomas<br>' +
      'models: kapinga tshibangu, kayla villescas, raven levitt, tiff suporn, mags martin, fionna lam, miles thomas';
  var displayText = 'photography: <a href="https://instagram.com/fortography0809" class="displayCreditLinks" target="_blank">miles fortuno</a><br>' +
      'creative direction & editing: <a href="https://instagram.com/miles.th0mas" class="displayCreditLinks" target="_blank">miles thomas</a><br>' +
      'models: <a href="https://instagram.com/kapingatshi" class="displayCreditLinks" target="_blank">kapinga tshibangu</a> | ' +
      '<a href="https://instagram.com/idiowreque" class="displayCreditLinks" target="_blank">mags martin</a> | ' +
      '<a href="https://instagram.com/tiffsoup" class="displayCreditLinks" target="_blank">tiff suporn</a> | ' +
      '<a href="https://instagram.com/kaylavillecas" class="displayCreditLinks" target="_blank">kayla villescas</a> | ' +
      '<a href="https://instagram.com/raven.l.levitt" class="displayCreditLinks" target="_blank">raven levitt</a> | ' +
      '<a href="https://instagram.com/_fionnalam" class="displayCreditLinks" target="_blank">fionna lam</a> | ' +
      '<a href="https://instagram.com/miles.th0mas" class="displayCreditLinks" target="_blank">miles thomas</a>';
  var displayTextDiv = '<div id="displayCredits" style="width: ' + gridWidth + 'px;">' + displayText + '</div>';
  $(homeDisplaySection).append(displayTextDiv);
}

function buildAboutMembers() {
  $.ajax({
    type: "GET",
    url: "../index_resources/members/members.json",
    dataType: "json",
    success: function(data, status) {
      // console.log(data.images);
      memberNameArray += "members";
      var imgIndex = Math.floor(Math.random() * data.images.length);
      var memberBaseImgData = data.images[imgIndex]
      nametoDataMap.set("members", [memberBaseImgData.link, memberBaseImgData.desc]);

      $.each(data.members, function () {
        var name_div = '<div id="' + this.id + '" class="names">' + this.name + '.</div>'
        $(memberNameDiv).append(name_div);
        memberNameArray += this.name;
        nametoDataMap.set(this.name, [this.img, this.tags])
      })
      memberNames = document.querySelectorAll(".names");

      updateMemberDetails("members", "")

      memberNames.forEach(function(nameElement) {
        // console.log(nameElement.innerText);
        nameElement.addEventListener("click", function() {
          updateMemberDetails(nameElement.innerText.slice(0, -1), nameElement.id);
        });
      })
      memberTitle.addEventListener("click", function() {
        updateMemberDetails("members", "");
      });

    }, error: function (msg) {
      // there was a problem
      alert("There was a problem: " + msg.status + " " + msg.statusText);
    }
  });
}

function updateMemberDetails(name, id) {
  memberNames.forEach(function (nameElement) {
    $(nameElement).removeClass("activeMember");
  })
  $(memberTitle).removeClass("activeMember");

  anime({
    targets: memberDetails.children,
    opacity: [1, 0],
    duration: 300,
    easing:'easeInCubic',
  });

  setTimeout(function() {
    memberDetails.innerHTML = '';

    var newDetails = nametoDataMap.get(name)

    if (name === "members" && id === "") {
      var membersImg = '<img id="member_base_img" src="' + newDetails[0] + '" alt="members base img" style="opacity: 0;">'
      var membersImgDescription = '<div id="member_details_desc" style="opacity: 0;">' + newDetails[1] + '</div>'
      $(memberDetails).append(membersImg, membersImgDescription);
      $(memberTitle).addClass("activeMember");
    } else {
      var newImg = '<img id="member_base_img" src="' + newDetails[0] + '" alt="members base img" style="opacity: 0">'
      var newNameTitle = '<div id="member_details_name" class="title" style="opacity: 0;">'
      if (name.split(" ")[0] === "miles") {
        newNameTitle += name.slice(0, 7) + '.</div>'
      } else {
        newNameTitle += name.split(" ")[0] + '.</div>'
      }
      var newTags = '<div id="member_details_tags" style="opacity: 0;">';
      newDetails[1].forEach(function(tag) {
        newTags += tag + " | ";
      })
      newTags = newTags.slice(0, -3) + '</div>';

      $(memberDetails).append(newImg, newNameTitle, newTags);
      $(document.querySelector("#" + id)).addClass("activeMember");
    }

    anime({
      targets: memberDetails.children,
      opacity: [0, 1],
      duration: 300,
      easing:'easeInCubic',
    });
  }, 350);
}