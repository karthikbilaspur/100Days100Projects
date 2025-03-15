// Get the blog posts container
const blogPostsContainer = document.getElementById('blog-posts');

// Define a function to generate blog posts
function generateBlogPosts(blogPostsData) {
    // Loop through the blog posts data and generate the HTML
    blogPostsData.forEach((blogPost) => {
        const blogPostHTML = `
            <li class="blog-post">
                <h2>${blogPost.title}</h2>
                <p>By ${blogPost.author} on ${blogPost.date}</p>
                <p>${blogPost.content}</p>
            </li>
        `;
        blogPostsContainer.insertAdjacentHTML('beforeend', blogPostHTML);
    });
}

// Define some sample blog posts data
const blogPostsData = [
    {
        title: 'My First Blog Post',
        content: 'This is my first blog post. I\'m excited to share my thoughts and ideas with you.',
        author: 'Karthik',
        date: '2025-02-20'
    },
    {
        title: 'My Second Blog Post',
        content: 'This is my second blog post. I hope you enjoy reading it.',
        author: 'Karthik',
        date: '2025-02-25'
    },
    {
        title: 'My Third Blog Post',
        content: 'This is my third blog post. I\'m having fun writing these posts.',
        author: 'Karthik',
        date: '2025-03-01'
    }
];

// Call the generateBlogPosts function to populate the blog posts container
generateBlogPosts(blogPostsData);

// Add an event listener to the load more button
document.getElementById('load-more-btn').addEventListener('click', () => {
    // Generate more blog posts and add them to the container
    const moreBlogPostsData = [
        {
            title: 'My Fourth Blog Post',
            content: 'This is my fourth blog post. I\'m excited to share more thoughts and ideas with you.',
            author: 'Karthik',
            date: '2025-03-05'
        },
        {
            title: 'My Fifth Blog Post',
            content: 'This is my fifth blog post. I hope you enjoy reading it.',
            author: 'Karthik',
            date: '2025-03-10'
        }
    ];
    generateBlogPosts(moreBlogPostsData);
});

// Add an event listener to the search input
document.getElementById('search-input').addEventListener('input', (e) => {
    // Get the search query
    const searchQuery = e.target.value.toLowerCase();

    // Loop through the blog posts and hide/show them based on the search query
    document.querySelectorAll('.blog-post').forEach((blogPost) => {
        const blogPostTitle = blogPost.querySelector('h2').textContent.toLowerCase();
        if (blogPostTitle.includes(searchQuery)) {
            blogPost.style.display = 'block';
        } else {
            blogPost.style.display = 'none';
        }
    });
});

// Add an event listener to the newsletter signup form
document.getElementById('newsletter-signup-form').addEventListener('submit', (e) => {
    // Prevent the default form submission behavior
    e.preventDefault();

    // Get the email address from the form
    const emailAddress = document.getElementById('newsletter-signup-email').value;

// Subscribe the user to the newsletter
const subscribeToNewsletter = async (emailAddress) => {
    try {
        // Make a POST request to the newsletter API
        const response = await fetch('https://example.com/newsletter-api/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: emailAddress })
        });

        // Check if the response was successful
        if (response.ok) {
            // Display a success message to the user
            alert('Thank you for subscribing to our newsletter!');
        } else {
            // Display an error message to the user
            alert('Failed to subscribe to the newsletter. Please try again.');
        }
    } catch (error) {
        // Display an error message to the user
        alert('Failed to subscribe to the newsletter. Please try again.');
    }
};

// Call the subscribeToNewsletter function when the newsletter signup form is submitted
document.getElementById('newsletter-signup-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const emailAddress = document.getElementById('newsletter-signup-email').value;
    subscribeToNewsletter(emailAddress);
});
    // Display a success message to the user
    alert('Thank you for subscribing to our newsletter!');
});

// Add an event listener to the contact form
document.getElementById('contact-form').addEventListener('submit', (e) => {
    // Prevent the default form submission behavior
    e.preventDefault();

    // Get the form data
    const formData = new FormData(e.target);

    // Send the form data to the server
const submitForm = async (formData) => {
    try {
        // Make a POST request to the form submission API
        const response = await fetch('https://example.com/form-submission-api/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Object.fromEntries(formData))
        });

        // Check if the response was successful
        if (response.ok) {
            // Display a success message to the user
            alert('Thank you for contacting us! We will get back to you soon.');
        } else {
            // Display an error message to the user
            alert('Failed to submit the form. Please try again.');
        }
    } catch (error) {
        // Display an error message to the user
        alert('Failed to submit the form. Please try again.');
    }
};

// Call the submitForm function when the contact form is submitted
document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    submitForm(formData);
});
    // Display a success message to the user
    alert('Thank you for contacting us!');
});

// Add an event listener to the dark mode toggle button
document.getElementById('dark-mode-toggle-btn').addEventListener('click', () => {
    // Toggle the dark mode class on the body element
    document.body.classList.toggle('dark-mode');
});

// Add an event listener to the font size increase button
document.getElementById('font-size-increase-btn').addEventListener('click', () => {
    // Increase the font size of the blog posts
    document.querySelectorAll('.blog-post').forEach((blogPost) => {
        blogPost.style.fontSize = '18px';
    });
});

// Add an event listener to the font size decrease button
document.getElementById('font-size-decrease-btn').addEventListener('click', () => {
    // Decrease the font size of the blog posts
    document.querySelectorAll('.blog-post').forEach((blogPost) => {
        blogPost.style.fontSize = '16px';
    });
});

// Initialize the push notification permission
Notification.requestPermission((status) => {
    console.log('Notification permission status:', status);
});

// Add an event listener to the push notification button
document.getElementById('push-notification-btn').addEventListener('click', () => {
    // Create a new notification
    const notification = new Notification('Hello, world!', {
        body: 'This is a push notification.',
        icon: 'icon.png'
    });

    // Add an event listener to the notification
    notification.addEventListener('click', () => {
        // Open the website when the notification is clicked
        window.open('https://example.com', '_blank');
    });
});