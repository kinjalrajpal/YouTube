import YOUR_API_KEY from "./API.js";

const videoCardContainer = document.getElementById("video-container");
const video_https = "https://www.googleapis.com/youtube/v3/videos?";
let channel_https = "https://www.googleapis.com/youtube/v3/channels?";

const numberOfVideosOnIntialLoad =20 ;

const generateQueryParam = new URLSearchParams({
    key:YOUR_API_KEY,
    part:"snippet, contentDetails",
    chart:"mostPopular",
    maxResults:numberOfVideosOnIntialLoad,
    regionCode:"IN",
})

// console.log(video_https+generateQueryParam);

fetch(video_https+generateQueryParam)
    .then((res)=>res.json())
    .then((data)=>{
        console.log(data)
        data.items.forEach((item)=>{
            getChannelICon(item);
        })
    })
    .catch((err)=>console.log(err));


const getChannelICon =(video_data)=>{
    fetch(channel_https + new URLSearchParams({
        key:YOUR_API_KEY,
        part:"snippet",
        id:video_data.snippet.channelId,
    })).then((res)=>res.json())
        .then((data)=>{
            console.log(data);
            video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
            makeVideoCard(video_data);

        })
        .catch((err)=>console.log(err));
}

const makeVideoCard = (data)=>{
    const videoCard = document.createElement("div");
    videoCard.classList.add("video");
    videoCard.addEventListener("click",()=>{
        window.location.href=`video.html?id=${data.id}`;
    })
    videoCard.innerHTML = `
        <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="thumbnail">

        <div class="content">
            <img src="${data.snippet.thumbnails.high.url}" class="channel-icon" alt="channel-icon" >
            <div class="info">
                <h4 class="title">${data.snippet.title}</h4>
                <p class="channel-name">${data.snippet.channelTitle}</p>
            </div>
        </div>
    `

    videoCardContainer.appendChild(videoCard);
}