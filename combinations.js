// Add event listener to run the script after the entire document is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Retrieve HTML elements by their IDs
    const combinationsInput = document.getElementById('combinationsInput');
    const phrasesInput = document.getElementById('phrasesInput');
    const combinationsButton = document.getElementById('combinationsButton');
    const phrasesButton = document.getElementById('phrasesButton');
    const combinationsAudio = document.getElementById('combinationsAudio');
    const phrasesAudio = document.getElementById('phrasesAudio');

    // Initially disable input fields until the corresponding audio is played
    combinationsInput.disabled = true;
    phrasesInput.disabled = true;

    // Arrays storing correct answers for the audio challenges
    const combinationsAnswers = [
        "X59B", "Z52", "2G8", "972", "SW6", "W42", "X7Y4", "M993", "85J", "B48", "33KY",
        "5R22", "LA4", "6W5", "3M33", "4L50", "MX23", "X170", "D500", "2R19", "A2R4", "2CL",
        "7P4", "59N4", "2B1", "89X", "PQ74", "1024", "8921", "XY4", "B98", "XQC", "RT40"
    ];
    const phrasesAnswers = [
        "7K34, The Sergeant says take the detail.", 
        "5W7, A Juvenile problem at Hazels Drive-In.", 
        "3H69, A 10-52 at 529 Irving Avenue, Code 3.", 
        "There is a disabled red car on the Low Angeles Freeway.", 
        "I’m calling to report that a tow truck is needed on highway 101, north of the diablo canyon bridge as soon as possible.", 
        "There has been an auto accident between a black ford and a taxicab at the entrance to the Sunrise Shopping Center."
    ];

    // Counters for correctly answered questions
    let combinationsCorrect = 0;
    let phrasesCorrect = 0;
    const totalCombinations = combinationsAnswers.length;
    const totalPhrases = phrasesAnswers.length;
    const totalQuestions = totalCombinations + totalPhrases;

    // Function to check if the provided answer is correct
    function checkAnswer(inputValue, answersArray) {
        return answersArray.includes(inputValue.toUpperCase().trim());
    }

    // Event listener for handling keypress events; specifically checks if the Enter key is pressed
    document.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const activeElement = document.activeElement;
            const isCombination = activeElement === combinationsInput;
            const answersArray = isCombination ? combinationsAnswers : phrasesAnswers;
            const correct = checkAnswer(activeElement.value, answersArray);

            if (correct) {
                if (isCombination) combinationsCorrect++;
                else phrasesCorrect++;
            }

            activeElement.value = ''; // Clear the input field after each entry
        }
    });

    // Play the combinations audio and enable the corresponding input field when the button is clicked
    combinationsButton.addEventListener('click', function() {
        combinationsAudio.play();
        this.disabled = true;
        combinationsInput.disabled = false;
    });

    // Enable the phrases button and disable combinations input field once the combinations audio ends
    combinationsAudio.addEventListener('ended', function() {
        phrasesButton.disabled = false;
        combinationsInput.disabled = true;
    });

    // Play the phrases audio and enable the corresponding input field when the button is clicked
    phrasesButton.addEventListener('click', function() {
        phrasesAudio.play();
        this.disabled = true;
        phrasesInput.disabled = false;
    });

    // Disable the phrases input field once the phrases audio ends
    phrasesAudio.addEventListener('ended', function() {
        phrasesInput.disabled = true;
    });

    // Calculate and store the score when the submit button is clicked
    document.querySelector('.submit-container .submit-button').addEventListener('click', function() {
        const correctAnswers = combinationsCorrect + phrasesCorrect;
        const score = (correctAnswers / totalQuestions) * 25.5; // Calculation for score based on correct answers

        localStorage.setItem('combinationsTestScore', score.toFixed(2));
        localStorage.setItem('combinationsTestComplete', 'true');
    });
});
