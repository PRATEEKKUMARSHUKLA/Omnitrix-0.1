var songs = [
  'file:///storage/emulated/0/DCIM/BEN10/themesong.mp3',
  'file:///storage/emulated/0/DCIM/BEN10/themesong1.mp3',
  'file:///storage/emulated/0/DCIM/BEN10/themesong2.mp3',
  'file:///storage/emulated/0/DCIM/BEN10/themesong3.mp3',
  'file:///storage/emulated/0/DCIM/BEN10/themesong4.mp3',
  'file:///storage/emulated/0/DCIM/BEN10/themesong5.mp3'
];

var currentSongIndex = 0;
var music = new Audio(songs[currentSongIndex]);

function toggleMusic() {
  if (music.paused) {
    music.play();
  } else {
    music.pause();
  }
}

function playNextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  music.src = songs[currentSongIndex];
  music.play();
}

function playPreviousSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  music.src = songs[currentSongIndex];
  music.play();
}

$(document).ready(function() {
  // Initialize the audio element
  music.volume = 0.45; // Set the initial volume

  // Create the round slider
  $("#slider").roundSlider({
    sliderType: "min-range",
    value: music.volume * 100,
    radius: 157,
    width: 20,
    handleSize: "19,64",
    handleShape: "dot",
    sliderType: "min-range",
    value: 88,
    startAngle: 91,
    endAngle: 91,
    showTooltip: false,
    change: function(args) {
      // Update the audio volume when the slider value changes
      music.volume = args.value / 100;
    }
  });

  // Attach event listeners to the buttons
  document.getElementById('toggleButton').addEventListener('click', toggleMusic);
  document.getElementById('nextButton').addEventListener('click', playNextSong);
  document.getElementById('previousButton').addEventListener('click', playPreviousSong);

  // Reset the playback position and play the music again when it ends
  music.addEventListener('ended', function() {
    music.currentTime = 0;
    music.play();
  });
});