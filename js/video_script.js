/**
 * Tantronics Video System Parallel Sync Controller Matrix
 * Fully integrated for Tailwind & WebGL multi-page architecture.
 */


/* =========================================================
   VIDEO PLAYLISTS
========================================================= */

const playlistSection1 = [
  "04JqvGE2R2I",
  "NUmsNhCrySc",
  "JvsuX5kTEnE"
];


const playlistSection2 = [
  "kuA6cqfg9zk",
  "AC8NVjzxGSk",
  "dAUUQtMtDrk",
  "SZxE9WxK8V0",
  "tzpOx9LivS4",
  "19pxjo5yCF4",
  "zJcpAx_f3oM",
  "xHt2Hw4_OEU",
  "5Vgrn5bRQq0",
  "v8fGhTyvd6Y",
  "f3A0oU-ZvVY",
  "4CYNvXUUsQg",
  "ROpujg8du2A",
  "U9apR-4fMyI",
  "eaaseC2XhIU",
  "T8ZDMF9Z5FM",
  "-dNZdoL_75I",
  "dNnB4Xpp8Zc",
  "vKH2V1TmJQA"
];


/* =========================================================
   PLAYER STATE
========================================================= */

let indexPlayer1 = 0;
let indexPlayer2 = 0;

let player1;
let player2;


/* =========================================================
   YOUTUBE IFRAME API INITIALIZATION
========================================================= */

function onYouTubeIframeAPIReady() {

  /*
   * PLAYER 1
   */

  if (
    document.getElementById("systemPlayer1")
  ) {

    player1 = new YT.Player(
      "systemPlayer1",
      {
        height: "100%",
        width: "100%",

        videoId:
          playlistSection1[indexPlayer1],

        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 1,
          rel: 0,
          origin: window.location.origin
        },

        events: {

          onReady: (event) => {
            event.target.playVideo();
          },

          onStateChange: (event) => {

            if (
              event.data ===
              YT.PlayerState.ENDED
            ) {
              nextVideoPlayer1();
            }

          }

        }

      }
    );
  }


  /*
   * PLAYER 2
   */

  if (
    document.getElementById("systemPlayer2")
  ) {

    player2 = new YT.Player(
      "systemPlayer2",
      {
        height: "100%",
        width: "100%",

        videoId:
          playlistSection2[indexPlayer2],

        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 1,
          rel: 0,
          origin: window.location.origin
        },

        events: {

          onReady: (event) => {
            event.target.playVideo();
          },

          onStateChange: (event) => {

            if (
              event.data ===
              YT.PlayerState.ENDED
            ) {
              nextVideoPlayer2();
            }

          }

        }

      }
    );
  }
}


/* =========================================================
   PLAYER 1 CONTROLS
========================================================= */

function nextVideoPlayer1() {

  indexPlayer1 =
    (
      indexPlayer1 + 1
    ) % playlistSection1.length;

  player1?.loadVideoById(
    playlistSection1[indexPlayer1]
  );

  player1?.mute();
}


function prevVideoPlayer1() {

  indexPlayer1 =
    (
      indexPlayer1 -
      1 +
      playlistSection1.length
    ) % playlistSection1.length;

  player1?.loadVideoById(
    playlistSection1[indexPlayer1]
  );

  player1?.mute();
}


/* =========================================================
   PLAYER 2 CONTROLS
========================================================= */

function nextVideoPlayer2() {

  indexPlayer2 =
    (
      indexPlayer2 + 1
    ) % playlistSection2.length;

  player2?.loadVideoById(
    playlistSection2[indexPlayer2]
  );

  player2?.mute();
}


function prevVideoPlayer2() {

  indexPlayer2 =
    (
      indexPlayer2 -
      1 +
      playlistSection2.length
    ) % playlistSection2.length;

  player2?.loadVideoById(
    playlistSection2[indexPlayer2]
  );

  player2?.mute();
}