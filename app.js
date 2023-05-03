const localVideo = document.querySelector('#local-video');
const remoteVideo = document.querySelector('#remote-video');
const callBtn = document.querySelector('#call-btn');
const hangupBtn = document.querySelector('#hangup-btn');
let localStream, remoteStream, rtcPeerConnection;

const ICE_SERVERS = [
  { urls: 'stun:stun.stunprotocol.org' },
  { urls: 'stun:stun.l.google.com:19302' },
];

const startCall = async () => {
  try {
    localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    localVideo.srcObject = localStream;

    rtcPeerConnection = new RTCPeerConnection({
      iceServers: ICE_SERVERS,
    });
    rtcPeerConnection.addStream(localStream);

    rtcPeerConnection.ontrack = (event) => {
      remoteStream = event.streams[0];
      remoteVideo.srcObject = remoteStream;
    };

    rtcPeerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        // send the candidate to the other peer
      }
    };

    // create offer and set as local description
    const offer = await rtcPeerConnection.createOffer();
    await rtcPeerConnection.setLocalDescription(new RTCSessionDescription(offer));

    // send offer to the other peer
  } catch (error) {
    console.log(error);
  }
};

const hangupCall = () => {
  rtcPeerConnection.close();
  localStream.getTracks().forEach((track) => track.stop());
  remoteStream.getTracks().forEach((track) => track.stop());
  localVideo.srcObject = null;
  remoteVideo.srcObject = null;
};

callBtn.addEventListener('click', startCall);
hangupBtn.addEventListener('click', hangupCall);
