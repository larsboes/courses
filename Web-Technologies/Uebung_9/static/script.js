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

// Current state
let currentPlaylist = null;
let playlists = {}; // Cache for UI

// Load playlists from Server on startup
window.onload = function () {
    fetchPlaylists();
};

async function fetchPlaylists() {
    try {
        const response = await fetch('/api/playlists');
        if (response.ok) {
            playlists = await response.json();
            updatePlaylistSelect();
            if (currentPlaylist && playlists[currentPlaylist]) {
                renderPlaylist();
            } else if (currentPlaylist && !playlists[currentPlaylist]) {
                // Playlist was deleted remotely or state mismatch
                currentPlaylist = null;
                renderPlaylist();
            }
        } else {
            console.error('Failed to fetch playlists');
        }
    } catch (error) {
        console.error('Error fetching playlists:', error);
    }
}

// Create a new playlist
createPlaylistButton.addEventListener('click', async function () {
    const playlistName = playlistNameInput.value.trim();
    if (playlistName) {
        try {
            const response = await fetch('/api/playlists', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: playlistName })
            });

            if (response.ok) {
                playlists[playlistName] = [];
                currentPlaylist = playlistName;
                updatePlaylistSelect();
                renderPlaylist();
                playlistNameInput.value = '';
                alert(`Playlist "${playlistName}" created!`);
            } else if (response.status === 409) {
                alert('Playlist already exists.');
            } else {
                alert('Failed to create playlist.');
            }
        } catch (error) {
            console.error('Error creating playlist:', error);
        }
    } else {
        alert('Playlist name is required.');
    }
});

// Delete the selected playlist
deletePlaylistButton.addEventListener('click', async function () {
    if (currentPlaylist) {
        try {
            const response = await fetch(`/api/playlists/${currentPlaylist}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                delete playlists[currentPlaylist];
                currentPlaylist = null;
                updatePlaylistSelect();
                renderPlaylist();
                alert('Playlist deleted.');
            } else {
                alert('Failed to delete playlist.');
            }
        } catch (error) {
            console.error('Error deleting playlist:', error);
        }
    }
});

// Update the playlist select dropdown
function updatePlaylistSelect() {
    // Save current selection to restore it if still valid
    const currentSelection = playlistSelect.value;

    playlistSelect.innerHTML = '<option value="" disabled selected>Select a Playlist</option>';
    Object.keys(playlists).forEach(name => {
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        playlistSelect.appendChild(option);
    });

    if (currentPlaylist) {
        playlistSelect.value = currentPlaylist;
    }
}

// Handle playlist selection
playlistSelect.addEventListener('change', function () {
    currentPlaylist = playlistSelect.value;
    renderPlaylist();
});

// Add track to the current playlist (Local update, then save to server)
trackForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    if (currentPlaylist) {
        const title = titleInput.value.trim();
        const link = linkInput.value.trim();
        const duration = durationInput.value.trim();

        if (title && link && duration.match(/^\d{1,2}:\d{2}$/)) {
            // Optimistic UI update
            const newTrack = { title, link, duration };
            playlists[currentPlaylist].push(newTrack);
            renderPlaylist();

            // Sync with server
            await savePlaylist(currentPlaylist);

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
async function removeTrack(index) {
    if (currentPlaylist && playlists[currentPlaylist]) {
        playlists[currentPlaylist].splice(index, 1);
        renderPlaylist();
        await savePlaylist(currentPlaylist);
    }
}

// Save playlist to server
async function savePlaylist(name) {
    if (!name || !playlists[name]) return;

    try {
        const response = await fetch(`/api/playlists/${name}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(playlists[name])
        });

        if (!response.ok) {
            console.error('Failed to save playlist');
            alert('Failed to save changes to server.');
        }
    } catch (error) {
        console.error('Error saving playlist:', error);
    }
}

// "Save Playlist" button is now redundant as we save on change, but we can keep it for manual sync or remove it.
// Let's keep it but make it just trigger a sync.
savePlaylistButton.addEventListener('click', function () {
    if (currentPlaylist) {
        savePlaylist(currentPlaylist).then(() => alert('Playlist saved to server!'));
    }
});
