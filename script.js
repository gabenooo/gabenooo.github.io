fetch('data/images.json')
  .then(response => response.json())
  .then(data => {
    const gallery = document.getElementById('gallery');

    data.forEach(item => {
      const div = document.createElement('div');
      div.className = 'photo';

      div.innerHTML = `
        <img src="images/${item.file}" alt="${item.title}">
        <h3>${item.title}</h3>
        <p class="caption">${item.description}</p>
      `;

      gallery.appendChild(div);
    });
  })
  .catch(err => console.error('Error loading images:', err));

const audio = document.getElementById("bg-music");
const button = document.getElementById("music-btn");

let isPlaying = false;

button.addEventListener("click", () => {
  if (!isPlaying) {
    audio.play();
    button.textContent = "⏸";
    isPlaying = true;
  } else {
    audio.pause();
    button.textContent = "▶";
    isPlaying = false;
  }
});