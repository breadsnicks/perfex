// Listen for the DOM to fully load before executing the script
document.addEventListener('DOMContentLoaded', function() {
    // Get the button element for playing audio from the document
    const playAudioButton = document.getElementById('playAudio');
    // Get the audio element from the document
    const storyAudio = document.getElementById('storyAudio');
    // Get the button for submitting notes
    const submitNotesButton = document.getElementById('submitNotes');
    // Get the textarea element where users enter their notes
    const notesArea = document.getElementById('notes');

    // Add an event listener to the play audio button
    playAudioButton.addEventListener('click', function() {
        storyAudio.play(); // Play the audio when the button is clicked
        playAudioButton.disabled = true; // Disable the play button after the audio starts to prevent replay
    });

    // Add an event listener to the submit notes button
    submitNotesButton.addEventListener('click', function() {
        localStorage.setItem('testANotes', notesArea.value); // Store the notes in local storage under the key 'testANotes'
    });
});
