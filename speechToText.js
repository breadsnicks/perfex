// This script listens for the entire content of the DOM to be loaded before executing.
document.addEventListener('DOMContentLoaded', function() {
    // Retrieve elements from the DOM to manipulate during the speech recognition process.
    const startBtn = document.getElementById('start');
    const stopBtn = document.getElementById('stop');
    const originalTextElement = document.getElementById('originalText');
    const transcriptElement = document.getElementById('transcript');
    const submitBtn = document.getElementById('submitBtn');

    // Initialize the speech recognition object for the browser.
    let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US'; // Set the language of the recognition to English.
    recognition.interimResults = true; // Specifies that interim results should be returned.
    recognition.continuous = true; // The recognition process may continue until stopped.

    let finalTranscript = ''; // String to hold the final transcribed text.
    let isStoppedByButton = false; // Boolean to check if the recognition was stopped by the stop button.

    // Event handler for when the recognition service returns results.
    recognition.onresult = function(event) {
        let interimTranscript = ''; // Temporary storage for the transcribing text.
        for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                finalTranscript += event.results[i][0].transcript; // Append final transcript.
            } else {
                interimTranscript += event.results[i][0].transcript; // Append interim results.
            }
        }
        transcriptElement.textContent = finalTranscript + interimTranscript; // Update the UI with both final and interim results.
    };

    // Handler when the recognition starts.
    recognition.onstart = function() {
        startBtn.disabled = true; // Disable the start button to prevent re-starting.
        stopBtn.disabled = false; // Enable the stop button.
        finalTranscript = ''; // Reset the final transcript.
        transcriptElement.textContent = ''; // Clear the transcript display area.
    };

    // Handler when the recognition ends.
    recognition.onend = function() {
        if (!isStoppedByButton) {
            calculateAndStoreScore(); // Calculate and store the score if not manually stopped.
        }
        startBtn.disabled = false; // Re-enable the start button.
        stopBtn.disabled = true; // Disable the stop button.
        isStoppedByButton = false; // Reset the stop flag.
    };

    // Function to calculate the score based on the transcription.
    const calculateScore = () => {
        let originalText = removePunctuation(originalTextElement.textContent).toLowerCase();
        let transcribedText = removePunctuation(transcriptElement.textContent).toLowerCase();

        let wordsOriginal = originalText.split(/\s+/); // Split original text into words.
        let wordsTranscribed = transcribedText.split(/\s+/); // Split transcribed text into words.

        let intersect = wordsTranscribed.filter(word => wordsOriginal.includes(word)).length; // Count common words.
        return (intersect / wordsOriginal.length) * 24; // Calculate score based on common words.
    };

    // Function to calculate and store the score.
    const calculateAndStoreScore = () => {
        const score = calculateScore();
        localStorage.setItem('readingAloudTestScore', score.toFixed(1)); // Store the score in local storage.
    };

    // Function to remove punctuation from a given text.
    const removePunctuation = text => text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");

    // Add event listeners for start and stop buttons.
    startBtn.addEventListener('click', () => {
        recognition.start(); // Start the speech recognition.
    });

    stopBtn.addEventListener('click', () => {
        isStoppedByButton = true;
        recognition.stop(); // Stop the speech recognition.
    });

    // Add an event listener for the submit button.
    submitBtn.addEventListener('click', () => {
        if (!isStoppedByButton) {
            recognition.stop(); // Ensure recognition is stopped.
        }
        calculateAndStoreScore(); // Calculate the score and store it.
        window.location.href = 'modules.html'; // Redirect to another page after submission.
    });
});
