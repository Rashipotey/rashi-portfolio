 //navbar
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  
  hamburger.addEventListener("click", mobileMenu);
  
  function mobileMenu() {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
      window.scroll=false;
  }
  
  const navLink = document.querySelectorAll(".nav-link");
  
  navLink.forEach(n => n.addEventListener("click", closeMenu));
  
  function closeMenu() {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
  }

  //progress bar
  document.addEventListener("DOMContentLoaded", function() {
    var bar1 = document.getElementById("myBar1");
    var bar2 = document.getElementById("myBar2");
    var bar3 = document.getElementById("myBar3");
    var i = 0;
    var id;

    var observerIn = new IntersectionObserver(function(entries) {
        if (entries[0].isIntersecting) {
            move();
        }
    }, { threshold: 0.1 });

    var observerOut = new IntersectionObserver(function(entries) {
        if (!entries[0].isIntersecting) {
            resetBar();
        }
    }, { threshold: 0 });

    observerIn.observe(document.querySelector(".edu-list"));
    observerOut.observe(document.querySelector(".edu-list"));

    function move() {
        if (i == 0) {
            i = 1;
            var width1 = 0, width2 = 0, width3 = 0;
            id = setInterval(frame, 5);

            function frame() {
                if (width1 >= 92.4 && width2 >= 92 && width3 >= 98) {
                    clearInterval(id);
                    i = 0;
                } else {
                    if (width1 <= 92.3) {
                        width1 ++; // incrementing by 0.1 to make the progress slower
                        bar1.style.width = width1 + "%";
                        bar1.innerHTML = width1.toFixed(1) + "%";
                    }
                    if (width2 <= 92) {
                        width2 ++; 
                        bar2.style.width = width2 + "%";
                        bar2.innerHTML = width2.toFixed() + "%";
                    }
                    if (width3 <= 98) {
                        width3 ++; 
                        bar3.style.width = width3 + "%";
                        bar3.innerHTML = width3.toFixed() + "%";
                    }
                }
            }
        }
    }

    function resetBar() {
        clearInterval(id);
        i = 0;
        bar1.style.width = "0%";
        bar1.innerHTML = "0%";
        bar2.style.width = "0%";
        bar2.innerHTML = "0%";
        bar3.style.width = "0%";
        bar3.innerHTML = "0%";
    }
});


//constellation bg
  const canvas = document.getElementById('backdrop');
  canvas.width = 320;
  canvas.height = 320;
  const ctx = canvas.getContext('2d');
  
  class Vec2 extends Array {
      constructor(...values) {
          switch (values.length) {
              case 2: {
                  const v = values[0];
                  super(v, values[1]);
                  break;
              }
              case 1: {
                  const v = values[0];
                  super(v, v);
                  break;
              }
              default: {
                  super(2);
                  break;
              }
          }
      }
      get x() { return this[0]; }
      set x(value) { this[0] = value; }
  
      get y() { return this[1]; }
      set y(value) { this[1] = value; }
  
      add(b) {
          this[0] += b[0];
          this[1] += b[1];
      }
  
      distance(b) {
          return Vec2.distance(this, b);
      }
  
      static distance(a, b) {
          return Math.hypot(a[0] - b[0], a[1] - b[1]);
      }
  }
  
  class Particle {
      constructor() {
          this.speed = new Vec2(Math.random() * 2 - 1, Math.random() * 2 - 1);
          this.position = new Vec2(Math.random() * window.innerWidth, Math.random() * window.innerHeight);
          this.radius = Math.random() * 4 + 1;
      }
  
      update() {
          if (this.position.x > window.innerWidth || this.position.x < 0) {
              this.speed.x *= -1;
          }
          if (this.position.y > window.innerHeight || this.position.y < 0) {
              this.speed.y *= -1;
          }
          this.position.add(this.speed);
      }
  }
  
  const particles = [];
  for (let i = 0; i < 80; i++) { // Increase the number of particles
      particles.push(new Particle());
  }
  
  const update = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const MAX_DISTANCE = (window.innerWidth + window.innerHeight) / 20;
  
      for (let i = 0; i < particles.length; i++) {
          particles[i].update();
          for (let j = i; j < particles.length; j++) {
              const distance = particles[i].position.distance(particles[j].position);
              if (distance < MAX_DISTANCE) {
                  ctx.strokeStyle = `rgb(131, 111, 255), ${1 - distance / MAX_DISTANCE})`;
                  ctx.beginPath();
                  ctx.moveTo(...particles[i].position);
                  ctx.lineTo(...particles[j].position);
                  ctx.stroke();
              }
          }
          ctx.fillStyle = "rgb(131, 111, 255)";
          ctx.beginPath();
          ctx.arc(...particles[i].position, particles[i].radius, 0, 2 * Math.PI);
          ctx.fill();
      }
      requestAnimationFrame(update);
  }
  update();
