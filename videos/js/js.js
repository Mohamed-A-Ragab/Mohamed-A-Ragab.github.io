// Your YouTube API settings
const apiKey = 'AIzaSyB8pIlLQ57AHqDF4yyYsl99squEpO11Xq4';  // Your YouTube API Key
const channelId = 'UC3NkYoeMjGkyPjk46TJFzHA';               // Your YouTube Channel ID
const maxResults = 10;  // Number of videos to display

// Get the container element for the video cards
const videoContainer = document.getElementById('video-list');

async function fetchVideos() {
  try {
    // Construct the YouTube API URL
    const apiURL = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=${maxResults}`;
    const response = await fetch(apiURL);
    const data = await response.json();
    console.log(data); // For debugging

    // Clear the container before adding videos
    videoContainer.innerHTML = '';

    if (data.items) {
      data.items.forEach(item => {
        // Ensure the item is a video (not a channel or playlist)
        if (item.id && item.id.videoId) {
          // Create the video card element
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

// Call fetchVideos() when the page loads
fetchVideos();
