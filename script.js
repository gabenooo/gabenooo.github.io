// ===== SHUFFLE FUNCTION =====
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// ===== ELEMENTS =====
const gallery = document.getElementById('gallery');
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCaption = document.getElementById("lightbox-caption");

// ===== LOAD IMAGES =====
fetch('data/images.json')
  .then(response => response.json())
  .then(data => {
    shuffleArray(data);

    data.forEach(item => {
      const div = document.createElement('div');
      div.className = 'photo';

      const thumbSrc = `thumbs/${item.file}`;
      const fullSrc = `images/${item.file}`;

      div.innerHTML = `
        <img src="${thumbSrc}" alt="${item.title}" loading="lazy">
        <h3>${item.title}</h3>
        <p class="caption">${item.description}</p>
      `;

      const imgElement = div.querySelector("img");

      // LIGHTBOX CLICK w/ progressive loading
      imgElement.addEventListener("click", () => {
        // Show thumbnail instantly
        lightboxImg.src = thumbSrc;
        lightbox.classList.add("show");

        // Load full image in background
        const img = new Image();
        img.src = fullSrc;

        img.onload = () => {
          lightboxImg.src = fullSrc;
        };

        img.onerror = () => {
          console.error("Failed to load full image:", fullSrc);
        };

        lightboxCaption.textContent = `${item.title} — ${item.description}`;
      });

      gallery.appendChild(div);
    });
  })
  .catch(err => console.error('Error loading images:', err));


// ===== LIGHTBOX CONTROLS =====

// Click anywhere to close
lightbox.addEventListener("click", () => {
  lightbox.classList.remove("show");
});

// ESC key to close
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    lightbox.classList.remove("show");
  }
});


// ===== MUSIC BUTTON =====
const audio = document.getElementById("bg-music");
const button = document.getElementById("music-btn");

let isPlaying = false;

button.addEventListener("click", () => {
  if (!isPlaying) {
    audio.volume = 0.4;
    audio.play();
    button.textContent = "⏸";
    isPlaying = true;
  } else {
    audio.pause();
    button.textContent = "▶";
    isPlaying = false;
  }
});