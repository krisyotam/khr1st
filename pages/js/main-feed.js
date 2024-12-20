fetch('/pages/json/posts.json')
    .then(response => response.json())
    .then(async data => {
        const tableContent = document.getElementById('tableContent');
        tableContent.innerHTML = ''; // Clear any existing content

        // Create an array to store posts with their last modified dates
        const postsWithLastModified = await Promise.all(
            data.blog_posts.map(async post => { // Access `blog_posts` instead of `posts`
                try {
                    // Make a HEAD request to fetch the Last-Modified header
                    const response = await fetch(post.url, { method: 'HEAD' });
                    const lastModified = response.headers.get('Last-Modified');
                    const lastModifiedDate = lastModified ? new Date(lastModified) : new Date(post.date); // Use post.date if Last-Modified not available
                    return { ...post, date: lastModifiedDate };
                } catch (error) {
                    console.error(`Error fetching Last-Modified for ${post.url}:`, error);
                    return { ...post, date: new Date(post.date) }; // Default to post.date if fetch fails
                }
            })
        );

        // Sort posts by the updated date in descending order
        postsWithLastModified.sort((a, b) => b.date - a.date);

        // Get the current date
        const currentDate = new Date();

        // Loop through the sorted data and create table rows dynamically
        postsWithLastModified.forEach(post => {
            const postDate = new Date(post.date);

            // Calculate the number of 7-day periods since the post's publish date
            const timeDifference = currentDate - postDate;
            const daysSince = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Days passed since the post was added
            const weeksSince = Math.floor(daysSince / 7); // Number of 7-day periods that have passed

            // Initial view count, assuming the post has at least 32 views when first added
            let views = 32;

            // Increase views by a random number between 1 and 7 for each 7-day period
            views += weeksSince * (Math.floor(Math.random() * 7) + 1);

            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="date">${postDate.toISOString().split('T')[0]}</td>
                <td class="title">
                    <a href="${post.url}" target="_blank">${post.title}</a>
                </td>
                <td class="views">${views}</td>
            `;
            tableContent.appendChild(row);
        });
    })
    .catch(error => {
        console.error('Error loading posts data:', error);
    });
