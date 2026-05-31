/**
 * Tantronics Advanced Applications Showcase - Video Players Logic
 */

// Divided Playlists
const playlistSection1 = ['04JqvGE2R2I', 'NUmsNhCrySc', 'JvsuX5kTEnE']; // Videos 1, 2, 3
const playlistSection2 = ['kuA6cqfg9zk', 'AC8NVjzxGSk', 'dAUUQtMtDrk']; // Videos 4, 5, 6

let indexPlayer1 = 0;
let indexPlayer2 = 0;

let player1;
let player2;

// CONSOLIDATED: Only ONE instance of this initialization function can exist on the page
function onYouTubeIframeAPIReady() {
  // Initialize Player 1 (Waits for manual click)
  if (document.getElementById('systemPlayer1')) {
    player1 = new YT.Player('systemPlayer1', {
      height: '100%',
      width: '100%',
      videoId: playlistSection1[indexPlayer1],
      playerVars: { 
        'autoplay': 0,
        'controls': 1, 
        'rel': 0, 
        'modestbranding': 1, 
        'origin': window.location.origin 
      },
      events: {
        'onReady': function(e) { 
          setupInitialAudio(e); 
          updateStatusTracker1(); // Sets tracker text on initial load
        },
        'onStateChange': onPlayer1StateChange
      }
    });
  }

  // Initialize Player 2 (FORCED INSTANT AUTOPLAY ON RELOAD)
  if (document.getElementById('systemPlayer2')) {
    player2 = new YT.Player('systemPlayer2', {
      height: '100%',
      width: '100%',
      videoId: playlistSection2[indexPlayer2],
      playerVars: { 
        'autoplay': 1, 
        'mute': 1, // Required by browsers for immediate autoplay
        'controls': 1, 
        'rel': 0, 
        'modestbranding': 1, 
        'origin': window.location.origin 
      },
      events: {
        'onReady': function(e) { 
          setupInstantAutoPlay(e); 
          updateStatusTracker2(); // Sets tracker text on initial load
        },
        'onStateChange': onPlayer2StateChange
      }
    });
  }
}

function setupInitialAudio(event) {
  event.target.unMute();
  event.target.setVolume(100);
}

function setupInstantAutoPlay(event) {
  event.target.playVideo();
}

// Monitor updates for Player 1
function onPlayer1StateChange(event) {
  if (event.data === YT.PlayerState.PLAYING) {
    if (player2 && typeof player2.mute === 'function') { player2.mute(); }
  }
  if (event.data === YT.PlayerState.ENDED) {
    nextVideoPlayer1(); // Moves forward naturally when a video ends
  }
}

// Monitor updates for Player 2
function onPlayer2StateChange(event) {
  if (event.data === YT.PlayerState.PLAYING) {
    if (player1 && typeof player1.mute === 'function') { player1.mute(); }
  }
  if (event.data === YT.PlayerState.ENDED) {
    nextVideoPlayer2(); // Moves forward naturally when a video ends
  }
}

// --- NAVIGATION FOR PLAYER 1 ---

// Manual & Automatic Forward Jump for Player 1
function nextVideoPlayer1() {
  indexPlayer1++;
  // Loop back cleanly to the first video if we pass the end
  if (indexPlayer1 >= playlistSection1.length) {
    indexPlayer1 = 0; 
  }
  loadAndPlayPlayer1();
}

// Manual Backward Jump for Player 1
function prevVideoPlayer1() {
  indexPlayer1--;
  // Loop cleanly back to the last video if we go backwards past 0
  if (indexPlayer1 < 0) {
    indexPlayer1 = playlistSection1.length - 1;
  }
  loadAndPlayPlayer1();
}

// Helper function to handle video loads seamlessly for Player 1
function loadAndPlayPlayer1() {
  if (player1 && typeof player1.loadVideoById === 'function') {
    player1.loadVideoById({ videoId: playlistSection1[indexPlayer1] });
    player1.unMute();
    player1.setVolume(100);
    updateStatusTracker1();
  }
}

// Update Player 1 Footer UI Tracker Text
function updateStatusTracker1() {
  const trackDisplay = document.getElementById('trackerPlayer1');
  if (trackDisplay) {
    trackDisplay.innerText = "Viewing Video " + (indexPlayer1 + 1) + " of " + playlistSection1.length;
  }
}

// --- NAVIGATION FOR PLAYER 2 ---

// Manual & Automatic Forward Jump for Player 2
function nextVideoPlayer2() {
  indexPlayer2++;
  // Loop back cleanly to the first video if we pass the end
  if (indexPlayer2 >= playlistSection2.length) {
    indexPlayer2 = 0; 
  }
  loadAndPlayPlayer2();
}

// Manual Backward Jump for Player 2
function prevVideoPlayer2() {
  indexPlayer2--;
  // Loop cleanly back to the last video if we go backwards past 0
  if (indexPlayer2 < 0) {
    indexPlayer2 = playlistSection2.length - 1;
  }
  loadAndPlayPlayer2();
}

// Helper function to handle video loads seamlessly for Player 2
function loadAndPlayPlayer2() {
  if (player2 && typeof player2.loadVideoById === 'function') {
    player2.loadVideoById({ videoId: playlistSection2[indexPlayer2] });
    player2.unMute();
    player2.setVolume(100);
    updateStatusTracker2();
  }
}

// Update Player 2 Footer UI Tracker Text
function updateStatusTracker2() {
  const trackDisplay = document.getElementById('trackerPlayer2');
  if (trackDisplay) {
    trackDisplay.innerText = "Viewing Video " + (indexPlayer2 + 1) + " of " + playlistSection2.length;
  }
}