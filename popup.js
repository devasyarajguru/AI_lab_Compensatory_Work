document.getElementById('save').addEventListener('click', () => {
    const announcement = document.getElementById('announcement').value;
    // Save announcement to local storage
    chrome.storage.local.set({ announcement }, () => {
        alert('Announcement saved!');
        displayAnnouncements(); // Refresh the displayed announcements
    });
});

document.getElementById('upload').addEventListener('click', () => {
    const fileInput = document.getElementById('fileUpload');
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const fileContent = event.target.result;
            // Save file content to local storage
            chrome.storage.local.set({ [file.name]: fileContent }, () => {
                alert(`File ${file.name} uploaded and saved!`);
                displayUploadedFiles(); // Refresh the displayed files
            });
        };
        reader.readAsText(file); // Read the file as text (for text files)
    } else {
        alert('Please select a file to upload.');
    }
});

// Function to display saved announcements
function displayAnnouncements() {
    chrome.storage.local.get('announcement', (data) => {
        const savedAnnouncementsDiv = document.getElementById('savedAnnouncements');
        savedAnnouncementsDiv.textContent = data.announcement || 'No announcements saved.';
    });
}

// Function to display uploaded files
function displayUploadedFiles() {
    chrome.storage.local.get(null, (data) => {
        const uploadedFilesDiv = document.getElementById('uploadedFiles');
        uploadedFilesDiv.innerHTML = ''; // Clear previous entries
        for (const key in data) {
            if (key !== 'announcement') {
                const fileDiv = document.createElement('div');
                fileDiv.textContent = key; // Display file name
                uploadedFilesDiv.appendChild(fileDiv);
            }
        }
    });
}

// Call display functions on load
displayAnnouncements();
displayUploadedFiles();
