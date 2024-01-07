function initSlider(carousel, wrapper) {
    const firstCardWidth = carousel.querySelector(".card").offsetWidth;
    const arrowBtns = wrapper.querySelectorAll("i");
    const carouselChildrens = [...carousel.children];
    
    let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

    // Get the number of cards that can fit in the carousel at once
    let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

    // Insert copies of the last few cards to beginning of carousel for infinite scrolling
    carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
        carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
    });

    // Insert copies of the first few cards to end of carousel for infinite scrolling
    carouselChildrens.slice(0, cardPerView).forEach(card => {
        carousel.insertAdjacentHTML("beforeend", card.outerHTML);
    });

    // Scroll the carousel at appropriate position to hide first few duplicate cards on Firefox
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");

    // Add event listeners for the arrow buttons to scroll the carousel left and right
    arrowBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
        });
    });

    const dragStart = (e) => {
        isDragging = true;
        carousel.classList.add("dragging");
        // Records the initial cursor and scroll position of the carousel
        startX = e.pageX;
        startScrollLeft = carousel.scrollLeft;
    }

    const dragging = (e) => {
        if(!isDragging) return; // if isDragging is false return from here
        // Updates the scroll position of the carousel based on the cursor movement
        carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
    }

    const dragStop = () => {
        isDragging = false;
        carousel.classList.remove("dragging");
    }

    const infiniteScroll = () => {
        // If the carousel is at the beginning, scroll to the end
        if(carousel.scrollLeft === 0) {
            carousel.classList.add("no-transition");
            carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
            carousel.classList.remove("no-transition");
        }
        // If the carousel is at the end, scroll to the beginning
        else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
            carousel.classList.add("no-transition");
            carousel.scrollLeft = carousel.offsetWidth;
            carousel.classList.remove("no-transition");
        }

        // Clear existing timeout & start autoplay if mouse is not hovering over carousel
        clearTimeout(timeoutId);
        if(!wrapper.matches(":hover")) autoPlay();
    }

    const autoPlay = () => {
        if(window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
        // Autoplay the carousel after every 2500 ms
        timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
    }
    autoPlay();

    // Event listeners for drag and hover events
    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("mousemove", dragging);
    carousel.addEventListener("mouseup", dragStop);
    carousel.addEventListener("mouseleave", dragStop);
    wrapper.addEventListener("mouseenter", () => isAutoPlay = false);
    wrapper.addEventListener("mouseleave", () => isAutoPlay = true);
    carousel.addEventListener("scroll", infiniteScroll);
}

// Инициализация слайдера 1
const wrapper1 = document.querySelector("#wrapper1");
const carousel1 = document.querySelector("#carousel1");
initSlider(carousel1, wrapper1);

// Инициализация слайдера 2
const wrapper2 = document.querySelector("#wrapper2");
const carousel2 = document.querySelector("#carousel2");
initSlider(carousel2, wrapper2);



const upBtn = document.querySelector('.up-button')
const downBtn = document.querySelector('.down-button')
const sidebar = document.querySelector('.sidebar')
const container = document.querySelector('.container')
const mainSlider = document.querySelector('.main-slide')
const slidesCount = mainSlider.querySelectorAll('div').length
let activeSlideIndex = 0

sidebar.style.top = `-${(slidesCount-1)*70}vh`

upBtn.addEventListener('click', () => {
    changeSlide ('up')
})

downBtn.addEventListener('click', () => {
    changeSlide ('down')
})

function changeSlide (dir) {
    if (dir === 'up') {
        activeSlideIndex++
        if (activeSlideIndex == slidesCount) {
            activeSlideIndex = 0
        }
    } else if (dir === 'down') {
        activeSlideIndex--
        if (activeSlideIndex < 0) {
            activeSlideIndex = slidesCount - 1
        }
    }

    const height = container.clientHeight
    console.log(height)

    mainSlider.style.transform = `translateY(-${activeSlideIndex * height}px)`
    sidebar.style.transform = `translateY(${activeSlideIndex * height}px)`
}

$(".custom-select").each(function() {
    var classes = $(this).attr("class"),
        id      = $(this).attr("id"),
        name    = $(this).attr("name");
    var template =  '<div class="' + classes + '">';
        template += '<span class="custom-select-trigger">' + $(this).attr("placeholder") + '</span>';
        template += '<div class="custom-options">';
        $(this).find("option").each(function() {
          template += '<span class="custom-option ' + $(this).attr("class") + '" data-value="' + $(this).attr("value") + '">' + $(this).html() + '</span>';
        });
    template += '</div></div>';
    
    $(this).wrap('<div class="custom-select-wrapper"></div>');
    $(this).hide();
    $(this).after(template);

  });
  
  $(".custom-option:first-of-type").hover(function() {
    $(this).parents(".custom-options").addClass("option-hover");
  }, function() {
    $(this).parents(".custom-options").removeClass("option-hover");
  });
  $(".custom-select-trigger").on("click", function() {
    $('html').one('click',function() {
      $(".custom-select").removeClass("opened");
    });
    $(this).parents(".custom-select").toggleClass("opened");
    event.stopPropagation();
  });
  $(".custom-option").on("click", function() {
    var selectedValue = $(this).data("value");
    var selectedText = $(this).html();

    var displayedText = selectedText.length > 32 ? selectedText.substr(34, 8) + '...' : selectedText;
    displayedText = displayedText.charAt(0).toUpperCase() + displayedText.slice(1)

    $(this).parents(".custom-select-wrapper").find("select").val(selectedValue);
    $(this).parents(".custom-options").find(".custom-option").removeClass("selection");
    $(this).addClass("selection");
    $(this).parents(".custom-select").removeClass("opened");
    $(this).parents(".custom-select").find(".custom-select-trigger").text(displayedText);
});


  $(function(){

    $('.menu__btn').on('click', function () {
        $('.menu__list').toggleClass('menu__list--active')
    });

  });

  $(function(){

    $('.menu__list-link').on('click', function () {
        $('.menu__list').removeClass('menu__list--active')
    });

  });

  $("#FileInput").on('change',function (e) {
    var labelVal = $(".title_form").text();
    var oldfileName = $(this).val();
        fileName = e.target.value.split( '\\' ).pop();

        if (oldfileName == fileName) {return false;}
        var extension = fileName.split('.').pop();

    if ($.inArray(extension,['jpg','jpeg','png']) >= 0) {
        $(".filelabel i").removeClass().addClass('fa fa-file-image-o');
        $(".filelabel i, .filelabel .title_form").css({'color':'#208440'});
        $(".filelabel").css({'border':' 2px solid #208440'});
    }
    else if(extension == 'pdf'){
        $(".filelabel i").removeClass().addClass('fa fa-file-pdf-o');
        $(".filelabel i, .filelabel .title_form").css({'color':'red'});
        $(".filelabel").css({'border':' 2px solid red'});

    }
else if(extension == 'doc' || extension == 'docx'){
    $(".filelabel i").removeClass().addClass('fa fa-file-word-o');
    $(".filelabel i, .filelabel .title_form").css({'color':'#2388df'});
    $(".filelabel").css({'border':' 2px solid #2388df'});
}
    else{
        $(".filelabel i").removeClass().addClass('fa fa-file-o');
        $(".filelabel i, .filelabel .title_form").css({'color':'black'});
        $(".filelabel").css({'border':' 2px solid black'});
    }

    if(fileName ){
        if (fileName.length > 10){
            $(".filelabel .title_form").text(fileName.slice(0,4)+'...'+extension);
        }
        else{
            $(".filelabel .title_form").text(fileName);
        }
    }
    else{
        $(".filelabel .title").text(labelVal);
    }
});

//send file
$(function() {
    document.getElementById('ajax-contact-form').addEventListener('submit', function(evt){
      var http = new XMLHttpRequest(), f = this;
      var th = $(this);
      evt.preventDefault();
      http.open("POST", "send.php", true);
      http.onreadystatechange = function() {
        if (http.readyState == 4 && http.status == 200) {
          alert(http.responseText);
          if (http.responseText.indexOf(f.nameFF.value) == 0) { // очистить поля формы, если в ответе первым словом будет имя отправителя (nameFF)
            th.trigger("reset");
          }
        }
      }
      http.onerror = function() {
        alert('Ошибка, попробуйте еще раз');
      }
      http.send(new FormData(f));
    }, false);
   
  });
