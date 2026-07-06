/**
 * Tantronics Video System Parallel Sync Controller Matrix
 */
const playlistSection1 = ['04JqvGE2R2I', 'NUmsNhCrySc', 'JvsuX5kTEnE'];
const playlistSection2 = ['kuA6cqfg9zk', 'AC8NVjzxGSk', 'dAUUQtMtDrk'];

let indexPlayer1 = 0, indexPlayer2 = 0;
let player1, player2;

function onYouTubeIframeAPIReady() {
  if (document.getElementById('systemPlayer1')) {
    player1 = new YT.Player('systemPlayer1', {
      height: '100%', width: '100%', videoId: playlistSection1[indexPlayer1],
      playerVars: { 'autoplay': 1, 'mute': 1, 'controls': 1, 'rel': 0, 'origin': window.location.origin },
      events: { 'onReady': (e) => e.target.playVideo(), 'onStateChange': (e) => { if (e.data === YT.PlayerState.ENDED) nextVideoPlayer1(); } }
    });
  }
  if (document.getElementById('systemPlayer2')) {
    player2 = new YT.Player('systemPlayer2', {
      height: '100%', width: '100%', videoId: playlistSection2[indexPlayer2],
      playerVars: { 'autoplay': 1, 'mute': 1, 'controls': 1, 'rel': 0, 'origin': window.location.origin },
      events: { 'onReady': (e) => e.target.playVideo(), 'onStateChange': (e) => { if (e.data === YT.PlayerState.ENDED) nextVideoPlayer2(); } }
    });
  }
}

function nextVideoPlayer1() { indexPlayer1 = (indexPlayer1 + 1) % playlistSection1.length; player1?.loadVideoById(playlistSection1[indexPlayer1]); player1?.mute(); }
function prevVideoPlayer1() { indexPlayer1 = (indexPlayer1 - 1 + playlistSection1.length) % playlistSection1.length; player1?.loadVideoById(playlistSection1[indexPlayer1]); player1?.mute(); }
function nextVideoPlayer2() { indexPlayer2 = (indexPlayer2 + 1) % playlistSection2.length; player2?.loadVideoById(playlistSection2[indexPlayer2]); player2?.mute(); }
function prevVideoPlayer2() { indexPlayer2 = (indexPlayer2 - 1 + playlistSection2.length) % playlistSection2.length; player2?.loadVideoById(playlistSection2[indexPlayer2]); player2?.mute(); }