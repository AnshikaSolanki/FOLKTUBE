const recordContainer = document.getElementById("jsvideoRecorder");
const recordButton = document.getElementById("jsrecorderButton");
const videoPreview = document.getElementById("jsvideoPreview");

let streamobject;
let videoRecorder;

const handleVideoData = event => {
    const { data: videoFile} = event;
    const link = document.createElement("a");
    link.href = URL.createObjectURL(videoFile);
    link.download = "Recoreded.webm";
    document.body.appendChild(link);
    link.click();
}


const stopRecording = () => {
    videoRecorder.stop();
    recordButton.removeEventListener("click", stopRecording);
    recordButton.addEventListener("click", getVideo);
    recordButton.innerHTML = "Start Recording";
}

const startRecording = () => {
    videoRecorder = new MediaRecorder(streamobject);
    videoRecorder.start();
    videoRecorder.addEventListener("dataavailable", handleVideoData);
    recordButton.addEventListener("click", stopRecording);
}

const getVideo = async() =>{
    try{
        const stream = await navigator.mediaDevices.getUserMedia({
            audio:true,
            video: {width:360, height:180}
        });
        videoPreview.srcObject = stream;
        videoPreview.muted = true;
        videoPreview.play();
        recordButton.innerHTML = "Stop Recording";
        streamobject = stream;
        startRecording();
    }catch(error){
        recordButton.innerHTML = "Can't Record";
    }finally{
        recordButton.removeEventListener("click", getVideo);
    }
}


function init() {
    recordButton.addEventListener("click", getVideo);
}

if(recordContainer){
    init();
}
