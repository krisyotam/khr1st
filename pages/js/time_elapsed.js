// time_elapsed.js

// Function to calculate time elapsed
function calculateTimeElapsed(postDate) {
    const currentDate = new Date();
    const postDateObj = new Date(postDate);
    const timeDiff = currentDate - postDateObj;
    const daysElapsed = Math.floor(timeDiff / (1000 * 3600 * 24));
    
    let elapsedText = '';
    if (daysElapsed < 30) {
      elapsedText = `${daysElapsed} day${daysElapsed !== 1 ? 's' : ''} ago`;
    } else if (daysElapsed < 365) {
      const months = Math.floor(daysElapsed / 30);
      elapsedText = `${months} month${months !== 1 ? 's' : ''} ago`;
    } else {
      const years = Math.floor(daysElapsed / 365);
      elapsedText = `${years} year${years !== 1 ? 's' : ''} ago`;
    }
  
    return elapsedText;
  }
  
  // Function to update the time elapsed on all posts
  function updateTimeElapsed() {
    const postElements = document.querySelectorAll('.post');
    
    postElements.forEach(post => {
      const dateElement = post.querySelector('.meta .date'); // Assuming you have a date element in each post
      const timeElapsedElement = post.querySelector('.time-elapsed');
      
      if (dateElement && timeElapsedElement) {
        const postDate = dateElement.getAttribute('data-date');  // Assuming the date is stored in a data attribute
        const timeElapsed = calculateTimeElapsed(postDate);
        
        timeElapsedElement.textContent = timeElapsed;  // Update the time elapsed text
      }
    });
  }
  
  // Run the update function when the page loads
  window.onload = updateTimeElapsed;
  