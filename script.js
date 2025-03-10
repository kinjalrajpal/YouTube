import YOUR_API_KEY from "./API.js";

const videoCardContainer = document.getElementById("video-container");
const video_https = "https://www.googleapis.com/youtube/v3/videos?";

const numberOfVideosOnInitialLoad = 20;

const generateQueryParam = new URLSearchParams({
    key:YOUR_API_KEY,
    part:"snippet, contentDetails",
    chart:"mostPopular",
    maxResults:numberOfVideosOnInitialLoad,
    regionCode:"IN",

})

// console.log(video_http+generateQueryParam);


fetch(video_https+generateQueryParam)
.then((res)=>res.json())
.then((data)=>console.log(data))
.catch((err)=>console.log(err));