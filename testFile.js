
const applauseAudio = new Audio("url(/assets/media/applause.mp3)")

const playAudio = (event) => {
  let p = event.currentTarget;
  event.preventDefault;
  // let fn = p.getAttribute('audio-file')
  // let src = '/assets/media/' + fn + '.mp3';
  // let audio = document.createElement('audio');
  // audio.src = src;
  applauseAudio.volume = 0.5;
  applauseAudio.play();
}