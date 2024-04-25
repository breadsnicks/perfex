// Constant object holding the maximum possible scores for each test
const MAX_SCORES = {
    combinationsTest: 25.5,
    mapIndexTest: 10.0,
    telephoneTest: 11.0,
    readingAloudTest: 24.0,
    shortStoryTestB: 10.0,
  };
  
  // Function to retrieve scores from local storage and calculate cumulative score
  function getScores() {
    let scores = {
        combinationsTest: parseFloat(localStorage.getItem('combinationsTestScore') || '0'),
        mapIndexTest: parseFloat(localStorage.getItem('mapTestScore') || '0'),
        telephoneTest: parseFloat(localStorage.getItem('telephoneTestScore') || '0'),
        readingAloudTest: parseFloat(localStorage.getItem('readingAloudTestScore') || '0'),
        shortStoryTestB: parseFloat(localStorage.getItem('shortStoryTestBScore') || '0'),
    };
  
    let cumulative = 0;
    for (const key in scores) {
        cumulative += scores[key]; // Sum up all scores to get the cumulative score
    }
  
    scores.cumulative = cumulative; // Add cumulative score to the scores object
    return scores;
  }
  
  // Function to update the displayed test scores on the webpage
  function updateScoresDisplay() {
    const scores = getScores(); // Get scores from storage
    const totalMaxScore = Object.values(MAX_SCORES).reduce((sum, score) => sum + score, 0); // Calculate total maximum score
  
    // Loop through each test score and update its display element
    for (const testName in scores) {
        if (testName !== 'cumulative') {
            const scoreElement = document.getElementById(`${testName}Score`);
            if (scoreElement) {
                scoreElement.textContent = `${testName.replace(/([A-Z])/g, ' $1').trim()} Score: ${scores[testName].toFixed(1)} / ${MAX_SCORES[testName].toFixed(1)}`;
            }
        }
    }
  
    // Update the cumulative score display element
    const cumulativeScoreElement = document.getElementById('cumulativeScore');
    if (cumulativeScoreElement) {
        cumulativeScoreElement.textContent = `Cumulative Score: ${scores.cumulative.toFixed(1)} / ${totalMaxScore.toFixed(1)}`;
    }
  
    // Add a pass/fail message based on the cumulative score
    const resultBox = document.getElementById('resultBox');
    if (resultBox) {
        if (scores.cumulative >= 0.7 * totalMaxScore) { // Check if the cumulative score is at least 70% of the total maximum
            resultBox.textContent = "Congratulations! You passed the test!";
            resultBox.style.backgroundColor = "#4CAF50"; // Set background color to green for pass
        } else {
            resultBox.textContent = "Sorry, you failed the test!";
            resultBox.style.backgroundColor = "#f44336"; // Set background color to red for fail
        }
        resultBox.classList.add('result-box'); // Add CSS class for styling
    }
  }
  
  // Add event listener to update the score display once the document is fully loaded
  document.addEventListener('DOMContentLoaded', updateScoresDisplay);
  