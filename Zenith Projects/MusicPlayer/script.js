fetch('songs.json')
  .then(response => response.json())
  .then(data => {
    const songs = data;
    let currentSongIndex = 0;

    const audio = new Audio();
    const songTitle = document.getElementById('song-title');
    const songArtist = document.getElementById('song-artist');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const progressBarInput = document.getElementById('progress-bar-input');
    const progressBarFill = document.getElementById('progress-bar-fill');
    const volumeInput = document.getElementById('volume-input');

    // Load the first song
    loadSong(songs[currentSongIndex]);

    // Define the load song function
    function loadSong(song) {
      audio.src = song.src;
      songTitle.textContent = song.title;
      songArtist.textContent = song.artist;
    }

    // Define the play/pause function
    function playPause() {
      if (audio.paused) {
        audio.play();
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
      } else {
        audio.pause();
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
      }
    }

    // Define the previous song function
    function prevSong() {
      currentSongIndex--;
      if (currentSongIndex < 0) {
        currentSongIndex = songs.length - 1;
      }
      loadSong(songs[currentSongIndex]);
    }

    // Define the next song function
    function nextSong() {
      currentSongIndex++;
      if (currentSongIndex >= songs.length) {
        currentSongIndex = 0;
      }
      loadSong(songs[currentSongIndex]);
    }

    // Add event listeners to the buttons
    playPauseBtn.addEventListener('click', playPause);
    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);

    // Update the progress bar
    audio.addEventListener('timeupdate', () => {
      const progressBarWidth = (audio.currentTime / audio.duration) * 100;
      progressBarFill.style.width = `${progressBarWidth}%`;
      progressBarInput.value = progressBarWidth;
    });

    // Update the volume
    volumeInput.addEventListener('input', () => {
      audio.volume = volumeInput.value / 100;
    });
  })
  .catch(error => console.error('Error fetching songs:', error));