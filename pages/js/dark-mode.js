document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    // Check localStorage for saved theme preference
    const userPreference = localStorage.getItem('theme');
    if (userPreference) {
        document.body.classList.toggle('dark', userPreference === 'dark');
        darkModeToggle.checked = userPreference === 'dark';
    }

    // Toggle dark mode when checkbox is clicked
    darkModeToggle.addEventListener('change', () => {
        if (darkModeToggle.checked) {
            document.body.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    });
});
