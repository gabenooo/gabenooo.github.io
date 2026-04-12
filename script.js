function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// ===== LOAD IMAGES =====
fetch('data/images.json')
  .then(response => response.json())
  .then(data => {
    shuffleArray(data);
    const gallery = document.getElementById('gallery');

    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxCaption = document.getElementById("lightbox-caption");

    data.forEach(item => {
      const div = document.createElement('div');
      div.className = 'photo';

      const imgSrc = `images/${item.file}`;

      div.innerHTML = `
        <img src="${imgSrc}" alt="${item.title}">
        <h3>${item.title}</h3>
        <p class="caption">${item.description}</p>
      `;

      // 🔥 LIGHTBOX CLICK
      div.querySelector("img").addEventListener("click", () => {
        lightbox.classList.add("show");
        lightboxImg.src = imgSrc;
        lightboxCaption.textContent = `${item.title} — ${item.description}`;
      });

      gallery.appendChild(div);
    });

    // 🔥 CLOSE LIGHTBOX
    lightbox.addEventListener("click", () => {
      lightbox.classList.remove("show");
    });

    // ESC key support
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        lightbox.classList.remove("show");
      }
    });
  })
  .catch(err => console.error('Error loading images:', err));


// ===== MUSIC BUTTON =====
const audio = document.getElementById("bg-music");
const button = document.getElementById("music-btn");

let isPlaying = false;

button.addEventListener("click", () => {
  if (!isPlaying) {
    audio.volume = 0.4; // nicer default
    audio.play();
    button.textContent = "⏸";
    isPlaying = true;
  } else {
    audio.pause();
    button.textContent = "▶";
    isPlaying = false;
  }
});