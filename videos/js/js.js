// YouTube API Settings
const apiKey = 'AIzaSyB8pIlLQ57AHqDF4yyYsl99squEpO11Xq4';  // Your YouTube API Key
// IMPORTANT: Ensure this channel ID matches your channel (@MohamedRagab-1)
const channelId = 'UC3NkYoeMjGkyPjk46TJFzHA';  // Replace with your actual channel ID if needed
const maxResults = 10;  // Number of videos to display

// Get the container element where video cards will be injected
const videoContainer = document.getElementById('video-list');

async function fetchVideos() {
  try {
    // Construct the YouTube API URL with type=video to return only videos
    const apiURL = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&type=video&order=date&maxResults=${maxResults}`;
    console.log('Fetching from:', apiURL);
    
    const response = await fetch(apiURL);
    const data = await response.json();
    console.log('Response Data:', data);

    // Clear the container before appending new videos
    videoContainer.innerHTML = '';

    if (data.items) {
      data.items.forEach(item => {
        // Verify item is a video
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

// Fetch videos when the page loads
fetchVideos();
