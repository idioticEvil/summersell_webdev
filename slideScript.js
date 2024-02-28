var slides = document.getElementsByClassName("carousel-image");
var dots = document.getElementsByClassName("dot");
var totalSlides = slides.length;
var slideIndex = 1;
var intervalID;

// TODO: Fix function so dot navigation animates in correct direction
function moveSlide(mode, n) {
    if (mode == 0) { // Mode == 0: Increment / Decrement Slide by n
        var nextIndex = (slideIndex + n - 1 + totalSlides) % totalSlides; // Correctly calculate the next slide index

        // Ensure current (outgoing) slide animation plays correctly
        if (n > 0) { // Moving to the next slide
            slides[slideIndex-1].className = "carousel-image inactive-right"; // Current slide moves out to the left
        } else { // Moving to the previous slide
            slides[slideIndex-1].className = "carousel-image inactive-left"; // Current slide moves out to the right
        }

        // Then, activate the next slide with the correct animation
        slides[nextIndex].style.opacity = 1; // Make next slide visible
        dots[slideIndex-1].classList.remove("active"); // Deactivate current dot
        dots[nextIndex].classList.add("active"); // Activate next dot
        if (n > 0) {
            slides[nextIndex].className = "carousel-image active-right"; // Next slide comes in from the right
        } else {
            slides[nextIndex].className = "carousel-image active-left"; // Next slide comes in from the left
        }

        slideIndex = nextIndex + 1; // Update slideIndex to the new slide
    } else if (mode == 1) { // Mode == 1: Go to slide at index n
        var newIndex = n - 1; // Correctly calculate the next slide index
        dots[slideIndex-1].classList.remove("active");
        dots[newIndex].classList.add("active");

        if (newIndex >= slideIndex) { // If the new slide is to the right of the current slide
            slides[slideIndex-1].className = "carousel-image inactive-right"; // Current slide moves out to the left
            slides[newIndex].className = "carousel-image active-right"; // Next slide comes in from the right
        } else { // If the new slide is to the left of the current slide
            slides[slideIndex-1].className = "carousel-image inactive-left"; // Current slide moves out to the right
            slides[newIndex].className = "carousel-image active-left"; // Next slide comes in from the left
        }

        slideIndex = newIndex + 1; // Update slideIndex to the new slide
    }
}

function autoSlide() {
    intervalID = setInterval(function() {moveSlide(0, 1);}, 5000); // Change slide every 3 seconds
}

autoSlide();

document.querySelectorAll(".carousel, .pillbox").forEach(element => {
    element.addEventListener("mouseover", function(event) {
        event.stopPropagation();
        clearInterval(intervalID);
    });
    element.addEventListener("mouseout", function(event) {
        event.stopPropagation();
        autoSlide();
    });
});

document.addEventListener("DOMContentLoaded", function() {
    var slides = document.getElementsByClassName("carousel-image");
    if (slides.length > 0) {
        slides[0].style.opacity = 1; // Ensure the first slide is visible
        dots[0].classList.add("active"); // Ensure the first dot is active
        for (var i = 1; i < slides.length; i++) {
            slides[i].style.opacity = 0; // Ensure all other slides are hidden
        }
    }
});