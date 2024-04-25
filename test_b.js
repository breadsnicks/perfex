document.addEventListener('DOMContentLoaded', function() {
    // Retrieve notes from Test A from localStorage
    const notes = localStorage.getItem('testANotes');
    // Display notes in the designated div
    document.getElementById('notes').textContent = notes ? notes : "No notes were taken.";

    // Array containing correct answers for each question
    const answersKey = [
        "Theodore Anderson", "Carlos Ramirez", "Budget", "Three", 
        "Chief Anderson", "Appointment", "Mrs. Gleason", 
        "11:49am", "Read letter", 
        "Ms. Linda Davis"
    ];

    // Event listener for the submit button
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.addEventListener('click', function() {
        let score = 0;
        // Iterate over each input field
        document.querySelectorAll('#questionForm input').forEach((input, index) => {
            const userAnswer = input.value.trim().toLowerCase();
            const correctAnswer = answersKey[index].toLowerCase();
            // Compare user's answer with correct answer
            if (userAnswer === correctAnswer) {
                score++;
            }
        });
        // Calculate final score out of 10
        const finalScore = (score / answersKey.length) * 10;
        // Store the score in localStorage
        localStorage.setItem('shortStoryTestBScore', finalScore.toFixed(2));
        // Redirect to modules.html after grading
        window.location.href = 'modules.html';
    });
});
