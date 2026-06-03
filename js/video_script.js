/**
 * Tantronics Advanced Applications Showcase - Video Players Logic
 * Immediate Parallel Autoplay on Load (Muted, XOR Muting Active)
 */

const playlistSection1 = ['04JqvGE2R2I', 'NUmsNhCrySc', 'JvsuX5kTEnE'];
const playlistSection2 = ['kuA6cqfg9zk', 'AC8NVjzxGSk', 'dAUUQtMtDrk'];

let indexPlayer1 = 0;
let indexPlayer2 = 0;

let player1;
let player2;

function onYouTubeIframeAPIReady() {
  // Initialize Player 1 to play immediately and muted
  if (document.getElementById('systemPlayer1')) {
    player1 = new YT.Player('systemPlayer1', {
      height: '100%',
      width: '100%',
      videoId: playlistSection1[indexPlayer1],
      playerVars: { 
        'autoplay': 1, // Force autoplay immediately on load
        'mute': 1,     // Required by browsers for immediate autoplay
        'controls': 1, 
        'rel': 0, 
        'modestbranding': 1, 
        'origin': window.location.origin 
      },
      events: {
        'onReady': (e) => e.target.playVideo(), // Ensure play command fires
        'onStateChange': onPlayer1StateChange
      }
    });
  }

  // Initialize Player 2 to play immediately and muted
  if (document.getElementById('systemPlayer2')) {
    player2 = new YT.Player('systemPlayer2', {
      height: '100%',
      width: '100%',
      videoId: playlistSection2[indexPlayer2],
      playerVars: { 
        'autoplay': 1, // Force autoplay immediately on load
        'mute': 1,     // Required by browsers for immediate autoplay
        'controls': 1, 
        'rel': 0, 
        'modestbranding': 1, 
        'origin': window.location.origin 
      },
      events: {
        'onReady': (e) => e.target.playVideo(), // Ensure play command fires
        'onStateChange': onPlayer2StateChange
      }
    });
  }
}

// XOR Muting Logic for Player 1
function onPlayer1StateChange(event) {
  if (event.data === YT.PlayerState.PLAYING) {
    // If Player 1 is unmuted, Player 2 must mute
    if (player1 && typeof player1.isMuted === 'function' && !player1.isMuted()) {
      if (player2 && typeof player2.mute === 'function') {
        player2.mute();
      }
    }
  }
  if (event.data === YT.PlayerState.ENDED) {
    nextVideoPlayer1();
  }
}

// XOR Muting Logic for Player 2
function onPlayer2StateChange(event) {
  if (event.data === YT.PlayerState.PLAYING) {
    // If Player 2 is unmuted, Player 1 must mute
    if (player2 && typeof player2.isMuted === 'function' && !player2.isMuted()) {
      if (player1 && typeof player1.mute === 'function') {
        player1.mute();
      }
    }
  }
  if (event.data === YT.PlayerState.ENDED) {
    nextVideoPlayer2();
  }
}

// --- NAVIGATION FOR PLAYER 1 ---
function nextVideoPlayer1() {
  indexPlayer1 = (indexPlayer1 + 1) % playlistSection1.length;
  loadMutedVideo(player1, playlistSection1[indexPlayer1]);
}

function prevVideoPlayer1() {
  indexPlayer1 = (indexPlayer1 - 1 + playlistSection1.length) % playlistSection1.length;
  loadMutedVideo(player1, playlistSection1[indexPlayer1]);
}

// --- NAVIGATION FOR PLAYER 2 ---
function nextVideoPlayer2() {
  indexPlayer2 = (indexPlayer2 + 1) % playlistSection2.length;
  loadMutedVideo(player2, playlistSection2[indexPlayer2]);
}

function prevVideoPlayer2() {
  indexPlayer2 = (indexPlayer2 - 1 + playlistSection2.length) % playlistSection2.length;
  loadMutedVideo(player2, playlistSection2[indexPlayer2]);
}

function loadMutedVideo(playerInstance, videoId) {
  if (playerInstance && typeof playerInstance.loadVideoById === 'function') {
    playerInstance.loadVideoById({
      videoId: videoId
    });
    playerInstance.mute(); 
  }
}