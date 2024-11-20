import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import {getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js"
import {getFirestore, getDoc, doc} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js"



const firebaseConfig = {
    apiKey: "AIzaSyB3z3ecIyA6t1l1lfWMfJwwur-itpOkX7I",
    authDomain: "spotless-a0df0.firebaseapp.com",
    projectId: "spotless-a0df0",
    storageBucket: "spotless-a0df0.firebasestorage.app",
    messagingSenderId: "365900969547",
    appId: "1:365900969547:web:8b5cd7ec8081670f3c7fce"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();

onAuthStateChanged(auth, (user)=>{
    const loggedInUserId=localStorage.getItem('loggedInUserId');

    if(loggedInUserId){
        const docRef = doc(db, "user", loggedInUserId);
        getDoc(docRef)
        .then((docSnap)=>{
            if(docSnap.exists()){
                const userData=docSnap.data();
                document.getElementById('loggedUserFName').innerText = userData.firstName;
                document.getElementById('loggedUserLName').innerText = userData.lastName;
                document.getElementById('loggedUserEName').innerText = userData.email;

            }
            else{
                console.log("no document found matching id")
            }

        })
        .catch((error)=>{
            console.log("Error getting document")
        })
            
    }
    else{
        console.log("User Id not Found in Local Storage")
    }

})

const logoutButton=document.getElementById('logout');

logoutButton.addEventListener('click', ()=>{

    localStorage.removeItem('loggedInUserId');
    signOut(auth)

    .then(()=>{
        window.location.href = 'index.html';
    })
    .catch((error)=>{
        console.log('Error signing out:', error);
    })
})
  
 

















(function ($) {
    "use strict";
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });
    
    
    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });


    // Testimonials carousel
    $(".testimonials-carousel").owlCarousel({
        autoplay: true,
        dots: true,
        loop: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
    
    
    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });

    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('filter-active');
        $(this).addClass('filter-active');

        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });
    
})(jQuery);
(function(d, s, id){var js; if (d.getElementById(id)) {return;} js = d.createElement(s); js.id = id; js.src = "https://embedsocial.com/cdn/ef.js"; d.getElementsByTagName("head")[0].appendChild(js);}(document, "script", "EmbedSocialFormsScript"));

