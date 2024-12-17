const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const yaml = require('js-yaml');

// Directory paths
const MD_DIR = path.resolve('C:/Users/Kris Yotam/Documents/Websites/khr1st-main/posts/md');
const PUBLIC_DIR = path.resolve('C:/Users/Kris Yotam/Documents/Websites/khr1st-main/posts/public');

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

// Template for blog posts
const generatePostHTML = ({ title, date, content, tags }) => {
    const formattedDate = formatDate(date);
    const timeAgoText = timeAgo(date);
    const tagLinks = tags.map(tag => `<li><a href="/pages/html/tags/${tag.toLowerCase()}.html">${tag}</a></li>`).join('');

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
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
                <h1>${title}</h1>
                <p class="meta">
                    <a href="https://x.com/krisyotam" target="_blank">@krisyotam</a> | 
                    <span class="date" data-date="${date}">${formattedDate} ${timeAgoText}</span>
                </p>
                <ul class="tags">
                    ${tagLinks}
                </ul>
                <section class="content">
                    ${content}
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
};

// Parse Markdown file with YAML front matter
const parseMarkdownFile = (filePath) => {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const frontMatterMatch = fileContent.match(/^---\n([\s\S]+?)\n---/);

    let frontMatter = { title: 'Untitled', date: 'Unknown', tags: [] };
    if (frontMatterMatch) {
        try {
            frontMatter = yaml.load(frontMatterMatch[1]);
        } catch (error) {
            console.error(`Error parsing front matter in ${filePath}:`, error);
        }
    }

    const markdownContent = fileContent.replace(/^---\n[\s\S]+?\n---/, '').trim();
    const htmlContent = marked(markdownContent);

    return { ...frontMatter, content: htmlContent };
};

// Remove existing HTML files
const clearPublicDirectory = () => {
    fs.readdirSync(PUBLIC_DIR).forEach(file => {
        if (file.endsWith('.html')) {
            fs.unlinkSync(path.join(PUBLIC_DIR, file));
            console.log(`Deleted: ${file}`);
        }
    });
};

// Convert Markdown files to HTML
const convertMarkdownFiles = () => {
    clearPublicDirectory();

    const mdFiles = fs.readdirSync(MD_DIR).filter(file => file.endsWith('.md'));

    mdFiles.forEach(file => {
        const filePath = path.join(MD_DIR, file);
        const post = parseMarkdownFile(filePath);
        const html = generatePostHTML(post);
        const outputFilePath = path.join(PUBLIC_DIR, file.replace('.md', '.html'));

        fs.writeFileSync(outputFilePath, html);
        console.log(`Generated HTML: ${outputFilePath}`);
    });
};

// Execute the conversion
convertMarkdownFiles();
