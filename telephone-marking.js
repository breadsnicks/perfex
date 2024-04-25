document.addEventListener('DOMContentLoaded', function() {
    // import all necessary audio files
    var ringtone = new Audio("ringtone.mp3");
    ringtone.loop = true;
    var phonecall = new Audio("phonecall.mp3");
    var phone_pickup = new Audio("pickup.mp3");
    var introduction = new Audio("phone-introduction.mp3");

    // declare element and pickup variables, assing to audio-button and pickup-button
    let element = document.getElementById("audio-button");
    let picker = document.getElementById("pickup-button");
    // make picker invisible to the user
    picker.setAttribute("hidden", "hidden");

    // add event listeners for both buttons
    element.addEventListener('click', playAudioSequence);
    picker.addEventListener('click', pickup);

    // const array with the solutions from the phone call
    const answers = ["JOHN WESTON", "9258 JOHN MUIR ROAD", "235-8158", "AMBULANCE", "BABY CHOKING"];
    let scores = [0, 0, 0, 0, 0]; // Initialize scores array

    // create querySelector for enter button, note that each enter button has a specific index
    document.querySelectorAll('.enter-button').forEach((button, index) => {
        button.addEventListener('click', function() { // when button is clicked
            // convert user input to upper case to make program les case sensitive
            const input = this.previousElementSibling.value.toUpperCase();
            // compare the converted user's input with the answers array at a designated index, score accordingly
            scores[index] = (input === answers[index].toUpperCase()) ? (index < 4 ? 2 : 3) : 0;
            lockField(this.previousElementSibling.id, this.id);
        });
    });

    document.getElementById('submitForm').addEventListener('click', function() {
        let totalScore = scores.reduce((acc, score) => acc + score, 0);
        localStorage.setItem('telephoneTestScore', totalScore.toString());
        window.location.href = 'modules.html';
    });

    // funciton used to play the instruction audio
    function playAudioSequence() {
        // countermeasure code to use in case if the audio file is not accessible
        introduction.play().catch(error => console.error("Playback failed:", error));
        // hide hide audio button when clicked
        element.setAttribute("hidden", "hidden");
        introduction.onended = function() {
            // when the instructions audio ends, make the pickup button visible and play the ringtone 
            picker.removeAttribute("hidden");
            ringtone.play().catch(error => console.error("Playback failed:", error));
        };
    }

    function pickup() {
        // when pickup is pressed, make button invisible and stop the ringtone
        picker.setAttribute("hidden", "hidden");
        ringtone.pause();
        phone_pickup.play().catch(error => console.error("Playback failed:", error));
        phonecall.play().catch(error => console.error("Playback failed:", error));
    }

    function lockField(fieldId, buttonId) {
        document.getElementById(fieldId).disabled = true;
        document.getElementById(buttonId).disabled = true;
    }
});
