const apiKey = 'AIzaSyB8pIlLQ57AHqDF4yyYsl99squEpO11Xq4';  // Replace with your actual API key
const channelId = 'UC3NkYoeMjGkyPjk46TJFzHA';  // Replace with your actual channel ID
const maxResults = 10;  // Adjust as needed
const videoContainer = document.getElementById('video-list');

async function fetchVideos() {
    try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=${maxResults}`);
        const data = await response.json();

        if (data.items) {
            data.items.forEach(item => {
                if (item.id.videoId) {
                    const videoElement = document.createElement('div');
                    videoElement.classList.add('video');
                    videoElement.innerHTML = `
                        <iframe width="360" height="215" src="https://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allowfullscreen></iframe>
                        <p>${item.snippet.title}</p>
                    `;
                    videoContainer.appendChild(videoElement);
                }
            });
        }
    } catch (error) {
        console.error('Error fetching videos:', error);
    }
}

fetchVideos();
