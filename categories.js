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
    const categoriesTable = document.getElementById('categories-table').getElementsByTagName('tbody')[0];

    // Create a map to count posts per series and store series URLs
    const seriesMap = {};
  
    // Iterate over all posts and populate series counts
    data.posts.forEach(post => {
        const series = post.series; // Get the series name from each post

        // Ensure we capture the series URL (assuming the first post in each series holds the URL)
        if (!seriesMap[series]) {
            seriesMap[series] = { count: 0, series_url: post['series-url'] };
        }
        seriesMap[series].count++;
    });

    // Create a row for each series and number of posts
    Object.keys(seriesMap).forEach(series => {
        const row = categoriesTable.insertRow();

        // Create Series cell
        const seriesCell = row.insertCell(0);
        const seriesLink = document.createElement('a');
        seriesLink.href = seriesMap[series].series_url; // Use the stored series URL
        seriesLink.textContent = series;
        seriesCell.appendChild(seriesLink);

        // Create Articles cell
        const articlesCell = row.insertCell(1);
        articlesCell.textContent = seriesMap[series].count; // Number of posts
    });
}

// Fetch the posts and populate the categories table
fetchPosts();
