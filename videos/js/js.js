const apiKey = 'AIzaSyB8pIlLQ57AHqDF4yyYsl99squEpO11Xq4';
const channelId = 'UC3NkYoeMjGkyPjk46TJFzHA';
const maxResults = 10;

const videoContainer = document.getElementById('video-list');

async function fetchVideos() {
  try {
    const apiURL = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&type=video&order=date&maxResults=${maxResults}`;
    console.log('Fetching from:', apiURL);
    
    const response = await fetch(apiURL);
    const data = await response.json();
    console.log('Response Data:', data);
    
    videoContainer.innerHTML = '';
    
    if (data.items) {
      data.items.forEach(item => {
        if (item.id && item.id.videoId) {
          const videoDiv = document.createElement('div');
          videoDiv.classList.add('video');
          videoDiv.innerHTML = `
            <iframe src="https://www.youtube.com/embed/${item.id.videoId}" allowfullscreen></iframe>
            <p>${item.snippet.title}</p>
          `;
          videoContainer.appendChild(videoDiv);
        }
      });
    }
  } catch (error) {
    console.error('Error fetching videos:', error);
    videoContainer.innerHTML = '<p style="color:red;">Failed to load videos. Please try again later.</p>';
  }
}

fetchVideos();
