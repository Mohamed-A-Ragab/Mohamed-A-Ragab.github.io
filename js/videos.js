const apiKey = 'AIzaSyB8pIlLQ57AHqDF4yyYsl99squEpO11Xq4';  // Your YouTube API Key
const channelId = 'UC3NkYoeMjGkyPjk46TJFzHA';  // Your YouTube Channel ID
const maxResults = 10;  // Number of videos to display
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
                        <iframe src="https://www.youtube.com/embed/${item.id.videoId}" allowfullscreen></iframe>
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

// Fetch videos when the page loads
fetchVideos();
