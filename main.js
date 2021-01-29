Webcam.set({
    height: 300,
    width: 350,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");
Webcam.attach(camera);

function take_snapshot() {
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id='captured_image' src='"+data_uri+"'>";
    });
}

console.log("ml5 version = " + ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/-7JW9fHxd/model.json", modelLoaded);

function modelLoaded() {
    console.log("The model is loaded!");
}

function speak() {
    var synth = window.speechSynthesis;
    speech_data1 = "The first prediction is" + prediction_one;
    speech_data2 = "And the second prediction is" + prediction_two;
    var utter_this = new SpeechSynthesisUtterance(speech_data1 + speech_data2);
    utter_this.rate= 0.5;
    synth.speak(utter_this);
}

function check_emotion(){
    img = document.getElementById("captured_image");
    classifier.classify(img, getResult);
}

function getResult(error, results){
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        document.getElementById("emotion_result_name").innerHTML = results[0].label;
        document.getElementById("emotion_result_name2").innerHTML = results[1].label;
        prediction_one = results[0].label;
        prediction_two = results[1].label;
        speak();
        if (results[0].label == "Happy") {
            document.getElementById("emoji_icon").innerHTML = "&#128522;";
        }
        if (results[0].label == "Sad") {
            document.getElementById("emoji_icon").innerHTML = "&#128532;";
        }
        if (results[0].label == "Angry") {
            document.getElementById("emoji_icon").innerHTML = "&#128548;";
        }

        if (results[1].label == "Happy") {
            document.getElementById("emoji_icon2").innerHTML = "&#128522;";
        }
        if (results[1].label == "Sad") {
            document.getElementById("emoji_icon2").innerHTML = "&#128532;";
        }
        if (results[1].label == "Angry") {
            document.getElementById("emoji_icon2").innerHTML = "&#128548;";
        }
        document.getElementById("accuracy").innerHTML = results[0].confidence.toFixed(3)*100 + "%";
        document.getElementById("accuracy2").innerHTML = results[1].confidence.toFixed(3)*100 + "%";
    }
}