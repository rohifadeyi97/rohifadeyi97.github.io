/* ===========================
   Smooth Scroll
=========================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener('click', function (e) {

        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({

            behavior: 'smooth'

        });

    });

});


/* ===========================
   Navbar Scroll Effect
=========================== */

const nav = document.querySelector("nav");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        nav.classList.add("nav-scrolled");

    } else {

        nav.classList.remove("nav-scrolled");

    }

});


/* ===========================
   Fade In Animation
=========================== */

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:.15
});

document.querySelectorAll(

".featured-project,.project-card,.skill-box,.about,.contact"

).forEach(el=>{

    el.classList.add("hidden");

    observer.observe(el);

});


/* ===========================
   Active Nav Link
=========================== */

const sections = document.querySelectorAll("section");

const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll",()=>{

    let current="";

    sections.forEach(section=>{

        const sectionTop=section.offsetTop-150;

        if(pageYOffset>=sectionTop){

            current=section.getAttribute("id");

        }

    });

    navLinks.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href")==="#"+current){

            link.classList.add("active");

        }

    });

});


/* ===========================
   Hero Fade
=========================== */

const hero = document.querySelector(".hero-content");

window.addEventListener("scroll",()=>{

    hero.style.opacity = 1 - window.scrollY / 600;

    hero.style.transform =
        `translateY(${window.scrollY*.2}px)`;

});
