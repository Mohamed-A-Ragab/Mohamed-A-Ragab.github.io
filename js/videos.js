if (window.location.pathname.includes('/videos/')) {
    const apiKey = 'YOUR_YOUTUBE_API_KEY';
    const channelId = 'YOUR_YOUTUBE_CHANNEL_ID';
    const videoGrid = document.getElementById('video-grid');

    async function fetchVideos() {
        try {
            const response = await fetch(
                `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=10`
            );
            const data = await response.json();
            displayVideos(data.items);
        } catch (error) {
            console.error('Error fetching videos:', error);
        }
    }

    function displayVideos(videos) {
        videoGrid.innerHTML = '';
        videos.forEach(video => {
            const videoId = video.id.videoId;
            const videoTitle = video.snippet.title;

            const videoElement = `
                <div class="video">
                    <iframe
                        width="560"
                        height="315"
                        src="https://www.youtube.com/embed/${videoId}"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                    ></iframe>
                    <p>${videoTitle}</p>
                </div>
            `;
            videoGrid.innerHTML += videoElement;
        });
    }

    fetchVideos();
}
