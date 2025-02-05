// Set your YouTube API key and Channel ID here:
const apiKey = 'AIzaSyB8pIlLQ57AHqDF4yyYsl99squEpO11Xq4';  // Your YouTube API Key
const channelId = 'UC3NkYoeMjGkyPjk46TJFzHA';  // Your YouTube Channel ID
const maxResults = 10;  // Number of videos to display

// Get the container element where videos will be injected
const videoContainer = document.getElementById('video-list');

async function fetchVideos() {
  try {
    // Construct the YouTube API URL
    const apiURL = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=${maxResults}`;
    const response = await fetch(apiURL);
    const data = await response.json();

    if (data.items) {
      // Clear container if needed
      videoContainer.innerHTML = '';

      data.items.forEach(item => {
        // Only proceed if the item is a video (not a playlist or channel)
        if (item.id && item.id.videoId) {
          // Create a video card element
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
    videoContainer.innerHTML = '<p style="color:red;">Failed to load videos. Please try again later.</p>';
  }
}

// Call the function when the page loads
fetchVideos();
