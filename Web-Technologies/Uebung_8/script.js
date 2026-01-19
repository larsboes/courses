// DOM elements
const playlistNameInput = document.getElementById('playlist-name');
const playlistSelect = document.getElementById('playlist-select');
const createPlaylistButton = document.getElementById('create-playlist');
const deletePlaylistButton = document.getElementById('delete-playlist');
const trackForm = document.getElementById('track-form');
const titleInput = document.getElementById('title');
const linkInput = document.getElementById('link');
const durationInput = document.getElementById('duration');
const playlistContainer = document.getElementById('playlist');
const savePlaylistButton = document.getElementById('save-playlist');
const totalDurationDisplay = document.getElementById('total-duration');

// Initialize playlists object to store multiple playlists
let playlists = {};
let currentPlaylist = null;

// Load playlists from localStorage
window.onload = function() {
    const savedPlaylists = localStorage.getItem('playlists');
    if (savedPlaylists) {
        playlists = JSON.parse(savedPlaylists);
        updatePlaylistSelect();
    }
};

// Create a new playlist
createPlaylistButton.addEventListener('click', function() {
    const playlistName = playlistNameInput.value.trim();
    if (playlistName && !playlists[playlistName]) {
        playlists[playlistName] = [];
        currentPlaylist = playlistName;
        updatePlaylistSelect();
        renderPlaylist();
        playlistNameInput.value = '';
        alert(`Playlist "${playlistName}" created!`);
    } else {
        alert('Playlist name is required or already exists.');
    }
});

// Delete the selected playlist
deletePlaylistButton.addEventListener('click', function() {
    if (currentPlaylist && playlists[currentPlaylist]) {
        delete playlists[currentPlaylist];
        currentPlaylist = null;
        updatePlaylistSelect();
        renderPlaylist();
        alert('Playlist deleted.');
    }
});

// Update the playlist select dropdown
function updatePlaylistSelect() {
    playlistSelect.innerHTML = '<option value="" disabled selected>Select a Playlist</option>';
    Object.keys(playlists).forEach(name => {
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        playlistSelect.appendChild(option);
    });
}

// Handle playlist selection
playlistSelect.addEventListener('change', function() {
    currentPlaylist = playlistSelect.value;
    renderPlaylist();
});

// Add track to the current playlist
trackForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (currentPlaylist) {
        const title = titleInput.value.trim();
        const link = linkInput.value.trim();
        const duration = durationInput.value.trim();

        if (title && link && duration.match(/^\d{1,2}:\d{2}$/)) {
            playlists[currentPlaylist].push({ title, link, duration });
            renderPlaylist();

            // Reset form fields
            titleInput.value = '';
            linkInput.value = '';
            durationInput.value = '';
        }
    } else {
        alert('Please select or create a playlist first.');
    }
});

// Render the current playlist
function renderPlaylist() {
    playlistContainer.innerHTML = '';
    if (currentPlaylist && playlists[currentPlaylist]) {
        playlists[currentPlaylist].forEach((track, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <a href="${track.link}" target="_blank">${track.title} (${track.duration})</a>
                <button onclick="removeTrack(${index})">Remove</button>
            `;
            playlistContainer.appendChild(li);
        });
        updateTotalDuration();
    } else {
        totalDurationDisplay.textContent = 'Total Duration: 0:00';
    }
}

// Update total duration for the current playlist
function updateTotalDuration() {
    let totalMinutes = 0;
    let totalSeconds = 0;

    if (currentPlaylist && playlists[currentPlaylist]) {
        playlists[currentPlaylist].forEach(track => {
            const [minutes, seconds] = track.duration.split(':').map(Number);
            totalMinutes += minutes;
            totalSeconds += seconds;
        });

        totalMinutes += Math.floor(totalSeconds / 60);
        totalSeconds %= 60;
    }

    totalDurationDisplay.textContent = `Total Duration: ${totalMinutes}:${totalSeconds.toString().padStart(2, '0')}`;
}

// Remove a track from the current playlist
function removeTrack(index) {
    if (currentPlaylist && playlists[currentPlaylist]) {
        playlists[currentPlaylist].splice(index, 1);
        renderPlaylist();
    }
}

// Save all playlists to localStorage
savePlaylistButton.addEventListener('click', function() {
    const playlistsJSON = JSON.stringify(playlists);
    localStorage.setItem('playlists', playlistsJSON);
    alert('All playlists saved!');
});
