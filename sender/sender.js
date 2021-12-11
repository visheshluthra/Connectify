const webSocket = new WebSocket("ws://localhost:3000")

webSocket.onmessage = (event) => {
    handleSignallingData(JSON.parse(event.data))
}

function handleSignallingData(data) {
    switch (data.type) {
        case "answer":
            peerConn.setRemoteDescription(data.answer)
            break
        case "candidate":
            peerConn.addIceCandidate(data.candidate)
    }
}

let username
function sendUsername() {
    
    username = document.getElementById("username-input").value
    sendData({
        type: "store_user"
    })
}

function sendData(data) {
    data.username = username
    webSocket.send(JSON.stringify(data))
}

let localStream
let peerConn
function startCall() {
    document.getElementById("video-call-div").style.display = "inline"
    
    navigator.getUserMedia({
        video: {
            frameRate: 24,
            width: {
                min: 480, ideal: 720, max: 1280
            },
            aspectRatio: 1.33333
        },
        audio: true
    }, (stream) => {
        localStream = stream
        document.getElementById("local-video").srcObject = localStream
        
        let configuration = {
            iceServers: [
                {
                    "urls": ["stun:stun.l.google.com:19302"]
                }
            ]
        }
        
        peerConn = new RTCPeerConnection(configuration)
        peerConn.addStream(localStream)
        
        peerConn.onaddstream = (e) => {
            document.getElementById("remote-video")
            .srcObject = e.stream
        }
        
        peerConn.onicecandidate = ((e) => {
            if (e.candidate == null)
                return
            sendData({
                type: "store_candidate",
                candidate: e.candidate
            })
        })
        
        createAndSendOffer()
    }, (error) => {
        console.log(error)
    })
}

function createAndSendOffer() {
    peerConn.createOffer((offer) => {
        sendData({
            type: "store_offer",
            offer: offer
        })
        
        peerConn.setLocalDescription(offer)
    }, (error) => {
        console.log(error)
    })
}

let isAudio = true
function muteAudio() {
    isAudio = !isAudio
    
    if (isAudio ==  false)
        {
            document.getElementById("audio_img").src = "../Images/mic_muted.png"
        }
    else
        {
            document.getElementById("audio_img").src = "../Images/mic_unmuted.png"
        }
    
    localStream.getAudioTracks()[0].enabled = isAudio
}

let isVideo = true
function muteVideo() {
    isVideo = !isVideo
    
    if (isVideo ==  false)
        {
            document.getElementById("video_img").src = "../Images/video_muted.png"
        }
    else
        {
            document.getElementById("video_img").src = "../Images/video_unmuted.png"
        }
    
    localStream.getVideoTracks()[0].enabled = isVideo
}

let chatbox = false
function hideChatBox() {
    chatbox = !chatbox
    if (chatbox == true)
        {
            document.getElementById("chatbox").style.display = "block"
            document.getElementById("displayChat").style.display = "block"
            document.getElementById("chat_img").src = "../Images/chat_show.png"
        }
    else
        {
            document.getElementById("chatbox").style.display = "none"
            document.getElementById("displayChat").style.display = "none"
            document.getElementById("chat_img").src = "../Images/chat_hide.png"
        }
}

function endCall() {
    window.open("C:/xampp/htdocs/Mini Project/videocall app/Main.html",'_self')
}