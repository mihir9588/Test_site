/**
 * Tantronics Advanced Applications Showcase - Video Players Logic
 */

const playlistSection1 = ['04JqvGE2R2I', 'NUmsNhCrySc', 'JvsuX5kTEnE'];
const playlistSection2 = ['kuA6cqfg9zk', 'AC8NVjzxGSk', 'dAUUQtMtDrk'];

let indexPlayer1 = 0;
let indexPlayer2 = 0;
let player1, player2;

function onYouTubeIframeAPIReady() {
  if (document.getElementById('systemPlayer1')) {
    player1 = new YT.Player('systemPlayer1', {
      height: '100%', width: '100%',
      videoId: playlistSection1[indexPlayer1],
      playerVars: { 'autoplay': 1, 'mute': 1, 'controls': 1, 'rel': 0, 'modestbranding': 1, 'origin': window.location.origin },
      events: { 'onReady': (e) => e.target.playVideo(), 'onStateChange': onPlayer1StateChange }
    });
  }

  if (document.getElementById('systemPlayer2')) {
    player2 = new YT.Player('systemPlayer2', {
      height: '100%', width: '100%',
      videoId: playlistSection2[indexPlayer2],
      playerVars: { 'autoplay': 1, 'mute': 1, 'controls': 1, 'rel': 0, 'modestbranding': 1, 'origin': window.location.origin },
      events: { 'onReady': (e) => e.target.playVideo(), 'onStateChange': onPlayer2StateChange }
    });
  }
}

function onPlayer1StateChange(event) {
  if (event.data === YT.PlayerState.PLAYING && player1 && !player1.isMuted?.() && player2?.mute) {
    player2.mute();
  }
  if (event.data === YT.PlayerState.ENDED) nextVideoPlayer1();
}

function onPlayer2StateChange(event) {
  if (event.data === YT.PlayerState.PLAYING && player2 && !player2.isMuted?.() && player1?.mute) {
    player1.mute();
  }
  if (event.data === YT.PlayerState.ENDED) nextVideoPlayer2();
}

function nextVideoPlayer1() {
  indexPlayer1 = (indexPlayer1 + 1) % playlistSection1.length;
  loadMutedVideo(player1, playlistSection1[indexPlayer1]);
}
function prevVideoPlayer1() {
  indexPlayer1 = (indexPlayer1 - 1 + playlistSection1.length) % playlistSection1.length;
  loadMutedVideo(player1, playlistSection1[indexPlayer1]);
}
function nextVideoPlayer2() {
  indexPlayer2 = (indexPlayer2 + 1) % playlistSection2.length;
  loadMutedVideo(player2, playlistSection2[indexPlayer2]);
}
function prevVideoPlayer2() {
  indexPlayer2 = (indexPlayer2 - 1 + playlistSection2.length) % playlistSection2.length;
  loadMutedVideo(player2, playlistSection2[indexPlayer2]);
}

function loadMutedVideo(playerInstance, videoId) {
  if (playerInstance?.loadVideoById) {
    playerInstance.loadVideoById({ videoId: videoId });
    playerInstance.mute(); 
  }
}