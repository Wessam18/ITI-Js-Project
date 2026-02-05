    const hero = document.getElementById("hero");
    const title = document.querySelector(".hero-title");
    const text = document.querySelector(".hero-text");
    const btn = document.querySelector(".hero-btn");

    const slides = [
      {
        image: "images/slide1.webp",
        title: "Women Collection 2026",
        text: "NEW SEASON",
        btn: "Shop Now",
      },
      {
        image: "images/slide2.webp",
        title: "New Men Season",
        text: "JACKETS & COATS",
        btn: "Shop Now",
      },
      {
        image: "images/slide3.webp",
        title: "Men Collection 2026",
        text: "NEW ARRIVALS",
        btn: "Shop Now",
      },
    ];

    let index = 0;

    function animateContent() {
      title.classList.remove("animate-title");
      text.classList.remove("animate-text");
      btn.classList.remove("animate-btn");

      void title.offsetWidth; // reset animation

      title.classList.add("animate-title");
      text.classList.add("animate-text");
      btn.classList.add("animate-btn");
    }

    function showSlide(i) {
      hero.style.backgroundImage = `url(${slides[i].image})`;

      title.textContent = slides[i].title;
      text.textContent = slides[i].text;
      btn.textContent = slides[i].btn;

      animateContent();
    }

    function nextSlide() {
      index = (index + 1) % slides.length;
      showSlide(index);
    }

    function prevSlide() {
      index = (index - 1 + slides.length) % slides.length;
      showSlide(index);
    }

    document.getElementById("nextSlide").onclick = nextSlide;
    document.getElementById("prevSlide").onclick = prevSlide;

    showSlide(index);
    setInterval(nextSlide, 5000);
