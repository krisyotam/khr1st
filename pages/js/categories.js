// Function to fetch the JSON data from the posts.json file
async function fetchPosts() {
    try {
        const response = await fetch('/pages/json/posts.json');
        const data = await response.json();
        populateCategories(data);
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
    data.posts.forEach(post => {
        const categories = post.category.split(','); // Split categories for each post

        // Iterate over each category and update the count
        categories.forEach(category => {
            category = category.trim(); // Clean up extra spaces
            if (!categoriesMap[category]) {
                categoriesMap[category] = { count: 0, category_url: `/category/${category.toLowerCase().replace(/\s+/g, '-')}.html` };
            }
            categoriesMap[category].count++;
        });
    });

    // Create a row for each category and number of articles
    Object.keys(categoriesMap).forEach(category => {
        const row = categoriesTable.insertRow();

        // Create Category cell with a link
        const categoryCell = row.insertCell(0);
        const categoryLink = document.createElement('a');
        categoryLink.href = categoriesMap[category].category_url; // Use the generated category URL
        categoryLink.textContent = category;
        categoryCell.appendChild(categoryLink);

        // Create Articles cell with count
        const articlesCell = row.insertCell(1);
        articlesCell.textContent = categoriesMap[category].count; // Number of posts in this category
    });
}

// Fetch the posts and populate the categories table
fetchPosts();
