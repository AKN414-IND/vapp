const startButton = document.getElementById('startCall');
const stopButton = document.getElementById('stopCall');
const localVideo = document.getElementById('localVideo');
const remoteVideos = document.querySelector('.remote-videos');

let localStream;
let remoteStreams = [];

// Get access to user's camera and microphone
async function startCall() {
  try {
    localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localVideo.srcObject = localStream;
  } catch (error) {
    console.error('Error getting user media:', error);
  }
}

// Stop the call and release the user's media devices
function stopCall() {
  localStream.getTracks().forEach(track => track.stop());
  localVideo.srcObject = null;
  remoteStreams.forEach(stream => stream.getTracks().forEach(track => track.stop()));
  remoteStreams = [];
  remoteVideos.innerHTML = '';
}

// Add a new remote video element to the page
function addRemoteVideo(stream) {
  const video = document.createElement('video');
  video.srcObject = stream;
  video.autoplay = true;
  video.playsinline = true;
  remoteStreams.push(stream);
  remoteVideos.appendChild(video);
}

// Listen for button clicks
startButton.addEventListener('click', startCall);
stopButton.addEventListener('click', stopCall);

