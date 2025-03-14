// script.js

// Get elements
const jobListings = document.querySelector('.job-listings');
const applyNowButtons = document.querySelectorAll('.btn-apply-now');
const saveJobButtons = document.querySelectorAll('.btn-save-job');
const userProfileForm = document.querySelector('.user-registration form');
const resumeBuilderForm = document.querySelector('.resume-builder form');
const interviewPrepLinks = document.querySelectorAll('.interview-prep a');
const googleFormsIframe = document.querySelector('.google-forms iframe');
const googleCalendarIframe = document.querySelector('.google-calendar iframe');
const socialSharingButtons = document.querySelectorAll('.social-sharing a');

// Add event listeners
applyNowButtons.forEach((button) => {
    button.addEventListener('click', () => {
        // Get job ID
        const jobId = button.dataset.jobId;

        // Fetch job details
        fetchJobDetails(jobId)
            .then((jobDetails) => {
                // Display job details modal
                displayJobDetailsModal(jobDetails);
            })
            .catch((error) => {
                console.error(error);
            });
    });
});

saveJobButtons.forEach((button) => {
    button.addEventListener('click', () => {
        // Get job ID
        const jobId = button.dataset.jobId;

        // Save job to user's account
        saveJob(jobId)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.error(error);
            });
    });
});

userProfileForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get user profile data
    const userData = {
        name: userProfileForm.name.value,
        email: userProfileForm.email.value,
        password: userProfileForm.password.value,
    };

    // Save user profile data
    saveUserProfileData(userData)
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.error(error);
        });
});

resumeBuilderForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get resume data
    const resumeData = {
        name: resumeBuilderForm.name.value,
        email: resumeBuilderForm.email.value,
        phone: resumeBuilderForm.phone.value,
        summary: resumeBuilderForm.summary.value,
        experience: resumeBuilderForm.experience.value,
        education: resumeBuilderForm.education.value,
    };

    // Build resume
    buildResume(resumeData)
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.error(error);
        });
});

interviewPrepLinks.forEach((link) => {
    link.addEventListener('click', () => {
        // Get interview prep resource
        const resource = link.dataset.resource;

        // Display interview prep resource
        displayInterviewPrepResource(resource);
    });
});

googleFormsIframe.addEventListener('load', () => {
    // Get Google Forms data
    const formData = googleFormsIframe.contentWindow.document.forms[0];

    // Submit Google Forms data
    submitGoogleFormsData(formData);
});

googleCalendarIframe.addEventListener('load', () => {
    // Get Google Calendar data
    const calendarData = googleCalendarIframe.contentWindow.document.body;

    // Display Google Calendar data
    displayGoogleCalendarData(calendarData);
});

socialSharingButtons.forEach((button) => {
    button.addEventListener('click', () => {
        // Get social sharing platform
        const platform = button.dataset.platform;

        // Share on social media platform
        shareOnSocialMedia(platform);
    });
});

// Functions
function fetchJobDetails(jobId) {
    // API endpoint URL
    const apiUrl = `https://example.com/api/jobs/${jobId}`;

    // Fetch job details from API
    return fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => data.job)
        .catch((error) => {
            throw error;
        });
}

function displayJobDetailsModal(jobDetails) {
    // Get job details modal
    const jobDetailsModal = document.querySelector('.job-details-modal');

    // Set job details modal content
    jobDetailsModal.innerHTML = `
        <h2>${jobDetails.title}</h2>
        <p>${jobDetails.company}</p>
        <p>${jobDetails.location}</p>
        <p>${jobDetails.description}</p>
        <button class="btn-apply-now" data-job-id="${jobDetails.id}">Apply Now</button>
    `;

    // Show job details modal
    jobDetailsModal.classList.add('show');
}
function saveJob(jobId) {
    // API endpoint URL
    const apiUrl = `https://example.com/api/jobs/${jobId}/save`;

    // Save job to user's account
    return fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json())
        .then((data) => data)
        .catch((error) => {
            throw error;
        });
}

function saveUserProfileData(userData) {
    // API endpoint URL
    const apiUrl = 'https://example.com/api/user-profile';

    // Save user profile data
    return fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    })
        .then((response) => response.json())
        .then((data) => data)
        .catch((error) => {
            throw error;
        });
}

function buildResume(resumeData) {
    // API endpoint URL
    const apiUrl = 'https://example.com/api/resume-builder';

    // Build resume
    return fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(resumeData),
    })
        .then((response) => response.json())
        .then((data) => data)
        .catch((error) => {
            throw error;
        });
}

function displayInterviewPrepResource(resource) {
    // Get interview prep resource modal
    const interviewPrepResourceModal = document.querySelector('.interview-prep-resource-modal');

    // Set interview prep resource modal content
    interviewPrepResourceModal.innerHTML = `
        <h2>${resource.title}</h2>
        <p>${resource.description}</p>
    `;

    // Show interview prep resource modal
    interviewPrepResourceModal.classList.add('show');
}

function submitGoogleFormsData(formData) {
    // API endpoint URL
    const apiUrl = 'https://example.com/api/google-forms';

    // Submit Google Forms data
    return fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
        .then((response) => response.json())
        .then((data) => data)
        .catch((error) => {
            throw error;
        });
}

function displayGoogleCalendarData(calendarData) {
    // Get Google Calendar modal
    const googleCalendarModal = document.querySelector('.google-calendar-modal');

    // Set Google Calendar modal content
    googleCalendarModal.innerHTML = `
        <h2>Google Calendar</h2>
        <p>${calendarData}</p>
    `;

    // Show Google Calendar modal
    googleCalendarModal.classList.add('show');
}

function shareOnSocialMedia(platform) {
    // API endpoint URL
    const apiUrl = `https://example.com/api/social-sharing/${platform}`;

    // Share on social media platform
    return fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json())
        .then((data) => data)
        .catch((error) => {
            throw error;
        });
}