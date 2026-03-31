// script.js
// This script runs on the main browser thread.

const networkStatusDiv = document.getElementById('network-status');
const statusTextSpan = networkStatusDiv.querySelector('.status-text');
const currentYearSpan = document.getElementById('current-year');

// Set current year in footer (HTML5/JS enhancement)
currentYearSpan.textContent = new Date().getFullYear();

// Function to update UI based on network status
function updateNetworkStatusUI() {
    const isOnline = navigator.onLine;
    if (isOnline) {
        networkStatusDiv.classList.remove('offline');
        networkStatusDiv.classList.add('online');
        statusTextSpan.textContent = 'Online';
    } else {
        networkStatusDiv.classList.remove('online');
        networkStatusDiv.classList.add('offline');
        statusTextSpan.textContent = 'Offline';
    }
    console.log(`[Main Script] Network status updated: ${isOnline ? 'Online' : 'Offline'}`);
}

// Initial UI update
updateNetworkStatusUI();

// Listen for network status changes (HTML5/JS enhancement)
window.addEventListener('online', updateNetworkStatusUI);
window.addEventListener('offline', updateNetworkStatusUI);

// --- Service Worker Registration ---
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
        .then((registration) => {
            console.log('[Main Script] Service Worker registered successfully with scope:', registration.scope);
            // Optional: Provide visual feedback for successful registration
        })
        .catch((error) => {
            console.error('[Main Script] Service Worker registration failed:', error);
            // Optional: Alert the user if registration fails
        });
} else {
    console.warn('[Main Script] Service Workers are not supported in this browser.');
    // Fallback UI for browsers without Service Worker support
    networkStatusDiv.classList.add('unsupported'); // Add a class for unsupported status
    statusTextSpan.textContent = 'SW Not Supported';
    networkStatusDiv.style.backgroundColor = '#9E9E9E'; // Grey out
}
