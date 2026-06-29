/* Faster smooth scroll and cinematic mascot ScrollTrigger timelines */
(function(){
  if(window.Lenis){
    var lenis=new Lenis({lerp:.18,wheelMultiplier:1.45,touchMultiplier:1.25,smoothWheel:true});
    function raf(t){lenis.raf(t);requestAnimationFrame(raf)}requestAnimationFrame(raf);
  }
  if(window.gsap&&window.ScrollTrigger){
    gsap.registerPlugin(ScrollTrigger);
    var mascot=document.querySelector('#mascot');
    var stage=document.querySelector('.mascot-stage');
    var action=document.querySelector('.prop-action');
    if(stage){
      gsap.to(stage,{scrollTrigger:{trigger:document.body,start:'top top',end:'bottom bottom',scrub:.55},x:function(){return -Math.min(120,window.innerWidth*.08)},y:function(){return window.innerHeight*.08},rotation:-2,ease:'none'});
    }
    var beats=[
      ['.cinematic-hero','Waving',0,1.04],['.airport','Walking',-10,1],['.checkin','Passport',8,.98],['.security-beat','Checking',-8,.98],['.gate','Pointing',10,1.02],['.aircraft','Flying',-12,1.05],['.clouds','Clouds',8,1.08],['.landing','Arrived',0,1.03],['.photo-destinations','Camera',-6,1],['.activity-film','Adventure',12,1.05],['.resort-booking','Selfie',-4,1.02],['.contact-panel','Booking',0,1]
    ];
    beats.forEach(function(b){var el=document.querySelector(b[0]);if(!el||!mascot)return;ScrollTrigger.create({trigger:el,start:'top center',end:'bottom center',onEnter:function(){if(action)action.textContent=b[1]},onEnterBack:function(){if(action)action.textContent=b[1]}});gsap.to(mascot,{scrollTrigger:{trigger:el,start:'top bottom',end:'bottom top',scrub:.6},rotation:b[2],scale:b[3],ease:'none'});});
    gsap.utils.toArray('.story-beat').forEach(function(section){ScrollTrigger.create({trigger:section,start:'top top',end:'+=42%',pin:true,pinSpacing:false});gsap.fromTo(section.querySelector('.story-card'),{y:70,opacity:0},{y:0,opacity:1,duration:.8,ease:'power3.out',scrollTrigger:{trigger:section,start:'top 62%'}})});
    gsap.utils.toArray('.photo-card').forEach(function(card){gsap.to(card.querySelector('img'),{yPercent:-10,ease:'none',scrollTrigger:{trigger:card,start:'top bottom',end:'bottom top',scrub:true}})});
    gsap.fromTo('.reveal-text',{clipPath:'inset(0 0 100% 0)',y:30},{clipPath:'inset(0 0 0% 0)',y:0,duration:1.05,stagger:.12,ease:'power3.out'});
    gsap.to('.hero-photo img',{scale:1.16,ease:'none',scrollTrigger:{trigger:'.cinematic-hero',start:'top top',end:'bottom top',scrub:true}});
  }
})();