// Function to fetch the JSON data from the posts.json file
async function fetchPosts() {
    try {
        const response = await fetch('/pages/json/posts.json');
        const data = await response.json();
        populateCategories(data);  // Pass the data to the populateCategories function
    } catch (error) {
        console.error('Error fetching the posts data:', error);
    }
}

// Function to populate the categories table with the fetched data
function populateCategories(data) {
    const categoriesTable = document.getElementById('categoriesTable').getElementsByTagName('tbody')[0];

    // Create a map to count posts per category and store the category URLs
    const categoriesMap = {};

    // Iterate over all posts and populate categories counts
    data.blog_posts.forEach(post => { // Change `data.posts` to `data.blog_posts`
        const category = post.category.trim(); // Ensure the category is a single string and not an array

        // If the category doesn't exist in the map, add it with a count of 0
        if (!categoriesMap[category]) {
            categoriesMap[category] = { count: 0, category_url: post['category-url'] }; // Use the category-url from the post
        }

        // Increment the count for the category
        categoriesMap[category].count++;
    });

    // Create a row for each category and number of articles
    Object.keys(categoriesMap).forEach(category => {
        const row = categoriesTable.insertRow();

        // Create Category cell with a link
        const categoryCell = row.insertCell(0);
        const categoryLink = document.createElement('a');
        categoryLink.href = categoriesMap[category].category_url; // Use the category URL from the map
        categoryLink.textContent = category;
        categoryCell.appendChild(categoryLink);

        // Create Articles cell with count
        const articlesCell = row.insertCell(1);
        articlesCell.textContent = categoriesMap[category].count; // Number of posts in this category
    });
}

// Fetch the posts and populate the categories table
fetchPosts();
