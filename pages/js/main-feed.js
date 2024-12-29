// Ghost API details
const API_URL = "https://kris-yotam.ghost.io/ghost/api/content/posts/";
const API_KEY = "3956cf71a4a7a35e5ead9bf2d6";

console.log("Starting script execution...");

fetch(`${API_URL}?key=${API_KEY}&include=tags`)
    .then(response => {
        if (!response.ok) {
            console.error("Error in API response:", response.status, response.statusText);
            throw new Error(`API returned status ${response.status}`);
        }
        console.log("Successfully fetched data from API.");
        return response.json();
    })
    .then(async data => {
        console.log("Data received from API:", data);
        const tableContent = document.getElementById('tableContent');

        if (!tableContent) {
            console.error("Table content element not found in DOM.");
            return;
        }

        tableContent.innerHTML = ''; // Clear any existing content

        if (!data.posts || !Array.isArray(data.posts)) {
            console.error("Posts data is missing or not an array:", data.posts);
            return;
        }

        // Filter posts by the internal tag "#khr1st.com"
        const filteredPosts = data.posts.filter(post => {
            if (!post.tags || !Array.isArray(post.tags)) {
                console.warn("Post is missing tags or tags is not an array:", post);
                return false;
            }

            const hasInternalTag = post.tags.some(tag => tag.name === "#khr1st.com");
            if (!hasInternalTag) {
                console.log("Post does not contain the internal tag #khr1st.com:", post.title);
            }

            return hasInternalTag;
        });

        console.log("Filtered posts:", filteredPosts);

        // Create an array to store posts with their last modified dates
        const postsWithLastModified = await Promise.all(
            filteredPosts.map(async post => {
                try {
                    console.log(`Fetching Last-Modified header for URL: ${post.url}`);
                    const response = await fetch(post.url, { method: 'HEAD' });

                    if (!response.ok) {
                        console.warn(`HEAD request failed for ${post.url}:`, response.status, response.statusText);
                        throw new Error(`HEAD request failed with status ${response.status}`);
                    }

                    const lastModified = response.headers.get('Last-Modified');
                    console.log(`Last-Modified header for ${post.url}:`, lastModified);

                    const lastModifiedDate = lastModified ? new Date(lastModified) : new Date(post.published_at);
                    return { ...post, date: lastModifiedDate };
                } catch (error) {
                    console.error(`Error fetching Last-Modified for ${post.url}:`, error);
                    return { ...post, date: new Date(post.published_at) }; // Default to published_at if fetch fails
                }
            })
        );

        console.log("Posts with Last-Modified dates:", postsWithLastModified);

        // Sort posts by the updated date in descending order
        postsWithLastModified.sort((a, b) => b.date - a.date);

        // Get the current date
        const currentDate = new Date();

        // Loop through the sorted data and create table rows dynamically
        postsWithLastModified.forEach(post => {
            try {
                const postDate = new Date(post.date);
                console.log("Processing post:", post.title, "Date:", postDate);

                // Calculate the number of 7-day periods since the post's publish date
                const timeDifference = currentDate - postDate;
                const daysSince = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Days passed since the post was added
                const weeksSince = Math.floor(daysSince / 7); // Number of 7-day periods that have passed

                // Initial view count, assuming the post has at least 32 views when first added
                let views = 32;

                // Increase views by a random number between 1 and 7 for each 7-day period
                views += weeksSince * (Math.floor(Math.random() * 7) + 1);

                // Remove internal tags and prepare display tags
                const displayTags = post.tags
                    .filter(tag => !tag.name.startsWith("#")) // Exclude internal tags
                    .map(tag => tag.name); // Get the tag names for display

                console.log("Display tags for post:", post.title, displayTags);

                const row = document.createElement('tr');
                row.innerHTML = `
                    <td class="date">${postDate.toISOString().split('T')[0]}</td>
                    <td class="title">
                        <a href="/pages/html/post.html?slug=${post.slug}" target="_blank">${post.title}</a>
                    </td>
                    <td class="views">${views}</td>
                `;
                tableContent.appendChild(row);
            } catch (error) {
                console.error("Error processing post:", post, error);
            }
        });

        console.log("All posts processed and displayed.");
    })
    .catch(error => {
        console.error('Error loading posts data:', error);
    });
