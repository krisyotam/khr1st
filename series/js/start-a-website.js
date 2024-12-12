// Fetch posts data from posts.json
fetch('/pages/json/posts.json')  // Ensure the path is correct
    .then(response => response.json())
    .then(data => {
        const posts = data.posts;

        // Filter posts in the "48 Laws of Power" series
        const filteredPosts = posts.filter(post => post.series === "Start a Website");

        // Generate the posts list with titles and URLs
        const postsList = filteredPosts.map(post => {
            return {
                title: post.title,  // Assuming "title" is the key for the post name
                url: post.url      // Assuming "url" is the key for the post URL
            };
        });

        // Now render the posts dynamically into the posts-list table
        const postsListContainer = document.getElementById('posts-list');
        
        // Create the table structure if not already present
        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        const headerCell = document.createElement('th');
        headerCell.textContent = 'Post Title';
        headerRow.appendChild(headerCell);
        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        
        // Create table rows for each post
        postsList.forEach(post => {
            const row = document.createElement('tr');
            const cell = document.createElement('td');
            const postLink = document.createElement('a');
            postLink.href = post.url;
            postLink.textContent = post.title;
            cell.appendChild(postLink);
            row.appendChild(cell);
            tbody.appendChild(row);
        });

        table.appendChild(tbody);
        postsListContainer.appendChild(table);
    })
    .catch(error => console.error('Error loading posts:', error));
