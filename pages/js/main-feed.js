// Ghost API details
const API_URL = "https://kris-yotam.ghost.io/ghost/api/content/posts/";
const API_KEY = "3956cf71a4a7a35e5ead9bf2d6";

console.log("Starting script execution...");

// Function to safely get post tags
function getPostTags(post) {
    if (!post.tags || !Array.isArray(post.tags)) {
        console.warn("Post is missing tags or tags is not an array:", post.title);
        return [];
    }
    return post.tags;
}

// Function to check for internal tag
function hasInternalTag(tags) {
    return tags.some(tag => tag.name === "#khr1st.com");
}

// Function to calculate views
function calculateViews(postDate, currentDate) {
    const timeDifference = currentDate - postDate;
    const daysSince = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const weeksSince = Math.floor(daysSince / 7);
    let views = 32; // Initial view count
    views += weeksSince * (Math.floor(Math.random() * 7) + 1);
    return views;
}

// Function to safely create post link
function createPostLink(post) {
    if (!post.slug) {
        console.error("Post missing slug:", post);
        return '#';
    }
    return `/pages/html/post.html?slug=${encodeURIComponent(post.slug)}`;
}

// Function to create table row
function createTableRow(post, views, postDate) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td class="date">${postDate.toISOString().split('T')[0]}</td>
        <td class="title">
            <a href="${createPostLink(post)}" target="_blank">${post.title || 'Untitled Post'}</a>
        </td>
        <td class="views">${views}</td>
    `;
    return row;
}

// Main fetch and display function
async function fetchAndDisplayPosts() {
    const tableContent = document.getElementById('tableContent');
    if (!tableContent) {
        console.error("Table content element not found in DOM.");
        return;
    }

    try {
        const response = await fetch(`${API_URL}?key=${API_KEY}&include=tags`);
        if (!response.ok) {
            throw new Error(`API returned status ${response.status}`);
        }

        const data = await response.json();
        console.log("Data received from API:", data);

        if (!data.posts || !Array.isArray(data.posts)) {
            throw new Error("Posts data is missing or not an array");
        }

        tableContent.innerHTML = ''; // Clear existing content

        // Filter posts with internal tag
        const filteredPosts = data.posts.filter(post => {
            const tags = getPostTags(post);
            return hasInternalTag(tags);
        });

        console.log("Filtered posts:", filteredPosts);

        // Get Last-Modified dates
        const postsWithLastModified = await Promise.all(
            filteredPosts.map(async post => {
                try {
                    console.log(`Fetching Last-Modified header for URL: ${post.url}`);
                    const response = await fetch(post.url, { method: 'HEAD' });

                    if (!response.ok) {
                        throw new Error(`HEAD request failed with status ${response.status}`);
                    }

                    const lastModified = response.headers.get('Last-Modified');
                    console.log(`Last-Modified header for ${post.url}:`, lastModified);

                    const lastModifiedDate = lastModified ? new Date(lastModified) : new Date(post.published_at);
                    return { ...post, date: lastModifiedDate };
                } catch (error) {
                    console.error(`Error fetching Last-Modified for ${post.url}:`, error);
                    return { ...post, date: new Date(post.published_at) };
                }
            })
        );

        // Sort posts by date
        postsWithLastModified.sort((a, b) => b.date - a.date);

        const currentDate = new Date();

        // Create and append table rows
        postsWithLastModified.forEach(post => {
            try {
                const postDate = new Date(post.date);
                console.log("Processing post:", post.title, "Date:", postDate);

                const views = calculateViews(postDate, currentDate);
                const row = createTableRow(post, views, postDate);
                tableContent.appendChild(row);
            } catch (error) {
                console.error("Error processing post:", post, error);
            }
        });

        console.log("All posts processed and displayed.");
    } catch (error) {
        console.error('Error loading posts data:', error);
        tableContent.innerHTML = `
            <tr>
                <td colspan="3" class="error-message">
                    Failed to load posts. Please try again later.
                </td>
            </tr>
        `;
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', fetchAndDisplayPosts);