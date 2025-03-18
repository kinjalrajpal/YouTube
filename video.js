import YOUR_API_KEY  from "./API.js";

const urlParams = new URLSearchParams(window.location.search);
const videoId = urlParams.get("id");
console.log(videoId);

const videoPlayerContainer = document.querySelector("#video-player");
const video_https = "https://www.googleapis.com/youtube/v3/videos?"

if(videoId){
    fetch(video_https + new URLSearchParams({
        key:YOUR_API_KEY,
        part:"snippet",
        id:videoId,
    })).then((res)=>res.json())
    .then((data)=>{
        console.log(data);
        videoPlayerContainer.innerHTML =`<iframe src="https://www.youtube.com/embed/${videoId}" width="1024" height="500" frameborder="0"></iframe>` 

    })
    .catch((err)=>console.log(err))
}