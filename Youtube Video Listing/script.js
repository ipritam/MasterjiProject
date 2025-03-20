
const searchInput = document.getElementById('search');
const searchBtn = document.getElementById('search-btn');
const videoContainer = document.querySelector('.video-container');

const createElement = (elem) => {
    const id = elem.items.id;

    const video = document.createElement("div");
    const thumbnail = document.createElement("img");
    const videoInfo = document.createElement("div");
    const videoTitle = document.createElement("div");
    const channelName = document.createElement("div");
    const linkTag = document.createElement("a");

    const metaInfo = document.createElement("div");
    const viewSpan = document.createElement("span");
    const likeSpan = document.createElement("span");
    const commentSpan = document.createElement("span");
    const dateSpan = document.createElement("span");

    video.classList.add("video");
    thumbnail.classList.add("thumbnail");
    videoInfo.classList.add("video-info");
    videoTitle.classList.add("title");
    channelName.classList.add("channel");
    linkTag.classList.add("linkTag");

    metaInfo.classList.add("meta-info");
    viewSpan.classList.add("views");
    likeSpan.classList.add("likes");
    commentSpan.classList.add("comments");
    dateSpan.classList.add("date");

    channelName.innerText = elem.items.snippet.channelTitle;
    videoTitle.innerText = elem.items.snippet.localized.title;
    thumbnail.setAttribute("alt", "thumbnail");
    thumbnail.setAttribute("src", elem.items.snippet.thumbnails.medium.url);
    linkTag.setAttribute("href", `https://www.youtube.com/watch?v=${id}`);
    linkTag.setAttribute("target", "_blank");

    viewSpan.innerText = `${elem.items.statistics.viewCount} views`;
    likeSpan.innerText = `${elem.items.statistics.likeCount} likes`;
    commentSpan.innerText = `${elem.items.statistics.commentCount} comments`;

    metaInfo.appendChild(viewSpan);
    metaInfo.appendChild(likeSpan);
    metaInfo.appendChild(commentSpan);

    videoInfo.appendChild(videoTitle);
    videoInfo.appendChild(channelName);
    videoInfo.appendChild(metaInfo);
    linkTag.appendChild(thumbnail);
    linkTag.appendChild(videoInfo);

    video.appendChild(linkTag);

    videoContainer.appendChild(video);

    return {
        videoTitleElement: videoTitle.parentElement,
    };
}


const apiCall = async () => {
    try {
        const data = await fetch("https://api.freeapi.app/api/v1/public/youtube/videos");
        const fetchedData = await data.json();
        return fetchedData;
        // console.log(fetchedData);

    } catch (error) {
        alert("Cannot fetched data");
    }
};

const loadVideos = async () => {
    const myData = await apiCall();

    let titles = myData.data.data.map((elem) => {
        const returnedObject = createElement(elem);
        return returnedObject;
    });

    searchInput.addEventListener("input", (key) => {
        searchElement(key, titles);
    });
};

document.addEventListener("DOMContentLoaded", function () {
    loadVideos(); // Load videos automatically on page load
});

const searchElement = (key, titles) => {
    titles.map((elem) => {
        const searchText = elem.videoTitleElement.firstChild.innerText.toLowerCase();
        const isVisible = searchText.includes(key.target.value.toLowerCase());
        elem.videoTitleElement.closest(".video").classList.toggle("hide", !isVisible);
    });
};

// searchBtn.addEventListener("click", async () => {
//     const myData = await apiCall();

//     let titles = myData.data.data.map((elem) => {
//         const returnedObject = createElement(elem);
//         return returnedObject;
//     });

//     searchInput.addEventListener("input", (key) => {
//         searchElement(key, titles);
//     });
// });

searchBtn.addEventListener('click' , loadVideos);
