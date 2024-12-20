import fs from 'fs/promises';
import path from 'path';
import { marked } from 'marked';  // Ensure 'marked' is imported
import frontMatter from 'front-matter';
import { mkdirp } from 'mkdirp';

// Directory paths
const postsDir = path.join(process.cwd(), 'posts', 'md');
const publicDir = path.join(process.cwd(), 'posts', 'public');
const categoriesDir = path.join(process.cwd(), 'categories', 'html');
const jsonFilePath = path.join(process.cwd(), 'pages', 'json', 'posts.json');

// Ensure the output directories exist
await mkdirp(publicDir);
await mkdirp(categoriesDir);

// Utility: Format date as "June 23, 2021"
const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
    });
};

// Utility: Calculate "x years ago"
const timeAgo = (date) => {
    const now = new Date();
    const postDate = new Date(date);
    const years = now.getFullYear() - postDate.getFullYear();

    return years > 0 ? `(${years} year${years > 1 ? 's' : ''} ago)` : '';
};

// Function to generate a preview from post content
function generatePreview(content, wordCount = 20) {
  const words = content.split(/\s+/);
  return words.slice(0, wordCount).join(' ') + '...';
}

// Function to generate the blog post HTML
function generateBlogPostHTML(post) {
  // Generate tag links
  const tagLinks = post.tags.map(tag => `<li><a href="/tags/${tag.toLowerCase().replace(/\s+/g, '-')}.html">${tag}</a></li>`).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${post.title}</title>
    <link rel="stylesheet" href="/pages/css/styles.css">
    <link rel="stylesheet" href="/pages/css/blogpost.css">
</head>
<body>
    <div class="container">
        <header>
            <nav>
                <div class="logo">
                    <h1><a href="/index.html">Kris Yotam</a></h1>
                </div>
                <div class="nav-links">
                    <ul>
                        <li><a href="/pages/html/about.html">About</a></li>
                        <li><a href="/pages/html/categories.html">Shelves</a></li>
                        <li>
                            <label class="switch">
                                <input type="checkbox" id="darkModeToggle">
                                <span class="slider"></span>
                            </label>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>

        <main>
            <article class="post">
                <h1>${post.title}</h1>
                <p class="meta">
                    <a href="https://x.com/krisyotam" target="_blank">@krisyotam</a> | 
                    <span class="date" data-date="${post.date}">${formatDate(post.date)} ${timeAgo(post.date)}</span>
                </p>
                <ul class="tags">
                    ${tagLinks}
                </ul>
                <section class="content">
                    ${post.content} <!-- Here is where the markdown content is injected as HTML -->
                </section>
            </article>
        </main>
    </div>

    <div class="footer-grounding">
        <footer class="footer">
            <a href="https://github.com/krisyotam" class="source-link">Kris Yotam (@krisyotam)</a>
            <a href="https://gitserver.vercel.app/" class="source-link">Source</a>
        </footer>
    </div>

    <script src="/pages/js/dark-mode.js"></script>
    <script src="/pages/js/time_elapsed.js"></script>
</body>
</html>`;
}

// Function to generate the category page HTML
function generateCategoryPageHTML(category, posts) {
  const postsList = posts.map(post => `
    <tr>
      <td><a href="${post.url}">${post.title}</a></td>
      <td>${post.date}</td>
    </tr>
  `).join('');

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${category} - Kris Yotam</title>
      <link rel="stylesheet" href="/pages/css/altstyles.css">
      <link rel="stylesheet" href="/pages/css/categories.css">
  </head>
  <body>
      <div class="container">
          <header>
              <nav>
                  <div class="logo">
                      <h1><a href="/index.html">Kris Yotam</a></h1>
                  </div>
                  <div class="nav-links">
                      <ul>
                          <li><a href="/pages/html/about.html">About</a></li>
                          <li><a href="/pages/html/categories.html">Shelves</a></li>
                          <li>
                              <label class="switch">
                                  <input type="checkbox" id="darkModeToggle">
                                  <span class="slider"></span>
                              </label>
                          </li>
                      </ul>
                  </div>
              </nav>
          </header>

          <main>
              <h2>${category}</h2>
              <p>Here are all posts related to ${category}:</p>

              <div id="posts-list">
                  <table>
                      <thead>
                          <tr>
                              <th>Post Title</th>
                              <th>Publication Date</th>
                          </tr>
                      </thead>
                      <tbody>
                          ${postsList}
                      </tbody>
                  </table>
              </div>
          </main>
        <div class="footer-grounding">
            <footer class="footer">
              <a href="https://github.com/krisyotam" class="source-link">Kris Yotam (@krisyotam)</a>
              <a href="https://gitserver.vercel.app/" class="source-link">Source</a>
            </footer>
        </div>

      </div>
      <script src="/pages/js/dark-mode.js"></script>
  </body>
  </html>
  `;
}

async function convertBlog() {
  try {
    // Read all markdown files
    const files = await fs.readdir(postsDir);
    const mdFiles = files.filter(file => path.extname(file) === '.md');

    let allPosts = [];
    let categories = {};

    for (const file of mdFiles) {
      const content = await fs.readFile(path.join(postsDir, file), 'utf8');
      const { attributes, body } = frontMatter(content);

      const postNumber = path.basename(file, '.md').replace('post', '');
      const htmlFilename = `post${postNumber}.html`;
      const url = `/posts/public/${htmlFilename}`;

      const category = attributes.category ? attributes.category.toLowerCase() : '';  // Ensure category is lowercase

      const post = {
        title: attributes.title,
        date: attributes.date,
        preview: generatePreview(body),
        url: url,
        category: attributes.category,
        'category-url': attributes.category ? `/categories/html/${attributes.category.toLowerCase().replace(/\s+/g, '-')}.html` : '',
        tags: typeof attributes.tags === 'string' ? attributes.tags.split(',').map(tag => tag.trim()) : [] // Check if tags is a string
      };

      // Convert the markdown body into HTML using marked
      const postContentHTML = marked(body); // Convert markdown to HTML here

      // Add formatted date and time ago information
      post.formattedDate = formatDate(post.date);
      post.timeAgoText = timeAgo(post.date);

      // Generate and write HTML file
      const postHTML = generateBlogPostHTML({ ...post, content: postContentHTML });
      await fs.writeFile(path.join(publicDir, htmlFilename), postHTML);

      // Add post to category
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(post);

      allPosts.push(post);
    }

    // Generate category pages
    for (const [category, posts] of Object.entries(categories)) {
      const categoryHTML = generateCategoryPageHTML(category, posts);
      const categoryFilename = `${category.replace(/\s+/g, '-')}.html`;
      await fs.writeFile(path.join(categoriesDir, categoryFilename), categoryHTML);
    }

    // Update JSON file
    await fs.writeFile(jsonFilePath, JSON.stringify({ blog_posts: allPosts }, null, 2));

    console.log("Blog conversion completed successfully!");
  } catch (error) {
    console.error("Error during blog conversion:", error);
  }
}

convertBlog();
