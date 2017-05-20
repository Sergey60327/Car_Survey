var surveyJSON = { pages: [{ elements: [{ type: "panel", elements: [{ type: "radiogroup", choices: [{ value: "1", text: "Drama" }, { value: "2", text: "Comedy" }, { value: "3", text: "Adventure" }, { value: "4", text: "Action" }, { value: "5", text: "Romance" }], isRequired: true, name: "What movie genre do you prefer?" }, { type: "radiogroup", choices: [{ value: "1", text: "Casual" }, { value: "2", text: "Professional" }, { value: "3", text: "Cocktail Attire" }, { value: "4", text: "Leather" }, { value: "5", text: "None" }], isRequired: true, name: "What is your preferred style of dress?" }, { type: "radiogroup", choices: [{ value: "1", text: "Relaxing at home" }, { value: "2", text: "Parting in Las Vegas" }, { value: "3", text: "Enjoying the beach in Caribbean Islands" }, { value: "4", text: "Climbing the Rocky Mountains" }, { value: "5", text: "Spending time with your parents" }], isRequired: true, name: "What is your ideal vacation? " }, { type: "radiogroup", choices: [{ value: "1", text: "Watching movies" }, { value: "2", text: "Reading books" }, { value: "3", text: "Taking a nap" }, { value: "4", text: "Outdoor activities" }, { value: "5", text: "Drinking in the bar" }], isRequired: true, name: "How do you like to spend leisure time?" }, { type: "checkbox", choices: [{ value: "1", text: "Caring and Loving" }, { value: "2", text: "Ambitious" }, { value: "3", text: "Down to earth, practical" }, { value: "4", text: "Adventurous!" }, { value: "5", text: "Country boy or girl at heart" }], isRequired: true, name: "How would close family and friends describe you?" }, { type: "radiogroup", choices: [{ value: "1", text: "It’s no use going back to yesterday, because I was a different person then" }, { value: "2", text: "Hardship often prepares an ordinary person for an extraordinary destiny" }, { value: "3", text: "When what you hear and what you see don't match, trust your eyes" }, { value: "4", text: "Don't bite off more than you can chew because nobody looks attractive spitting it back out" }, { value: "5", text: "No matter how many plans you make or how much in control you are, life is always winging it" }], isRequired: true, name: "What famous expression describes your life philosophy?" }, { type: "radiogroup", choices: [{ value: "1", text: "Florida" }, { value: "2", text: "Hawaii" }, { value: "3", text: "New York" }, { value: "4", text: "Thailand" }, { value: "5", text: "Fiji" }], isRequired: true, name: "Where would you like to retire?" }, { type: "radiogroup", choices: [{ value: "1", text: "Michael Jackson" }, { value: "2", text: "Donald Trump" }, { value: "3", text: "Oprah Winfrey" }, { value: "4", text: "Keanu Reeves" }, { value: "5", text: "Elizabeth II" }], isRequired: true, name: "Which famous person will resonate with your personality?" }, { type: "radiogroup", choices: [{ value: "1", text: "Jungle" }, { value: "2", text: "Desert" }, { value: "3", text: "Frozen Tundra" }, { value: "4", text: "Varied" }, { value: "5", text: "Cityscape" }], isRequired: true, name: "Which landscape is your favorite?" }], title: "Take a survey to find a car that matches your personality." }], name: "page1" }] };
var survey = new Survey.Model(surveyJSON);
Survey.Survey.cssType = "bootstrap";
$("#surveyContainer").Survey({
    model: survey,
    onComplete: sendDataToServer
});

//Add attribute for nightshade
$("input[type='button']").attr("id", "complete-btn");
$(".jumbotron").hide();
$("#purchase-btns").hide();
function sendDataToServer(survey) {
    var resultAsString = JSON.stringify(survey.data);
    //Build HTML or Model to go into here and view upon completition
    $.post("/survey", resultAsString).done(function (response) {
        //model or HTML to present image and car data
        console.log(response);
        switch (response) {
            case "1": displayImage("./assets/img/1_8_points.png"); break;
            case "2": displayImage("./assets/img/9_16_points.png"); break;
            case "3": displayImage("./assets/img/17_24_points.png"); break;
            case "4": displayImage("./assets/img/25_32_points.png"); break;
            case "5": displayImage("./assets/img/33_40_points.png"); break;
            case "6": displayImage("./assets/img/41_48_points.png"); break;
            case "7": displayImage("./assets/img/49_56_points.png"); break;
            case "8": displayImage("./assets/img/57_64_points.png"); break;
            default: "";
        }
    });
}

$.get("/survey").done(function (response) {
    console.log(response);
});

//Event Listener and Logic for Swap
$("#swap-btn").on("click", function (event) {
    if (sessionStorage.userName == null) {
        $(location).attr("href", "/login");
    }
    else {
        $(location).attr("href", "/carslist");
    }
});

//Modal for Congratulations upon Purchasing
$("#purchase-btn").on("click", function (event) {
    modal("Congratulations on Your New Car! Enjoy the ride!");
});

//Modal Listener
$(document).on("click", ".close", function () {
    $("#myModal").remove();
});

//Univeral function for Modal
function modal(modalText) {
    var myModal = $("<div>");
    var modalContent = $("<div>");
    var closeBTN = $("<span>");
    var modalText;
    myModal.attr("id", "myModal");
    myModal.attr("class", "modal");
    modalContent.attr("class", "modal-content");
    closeBTN.attr("class", "close");
    closeBTN.html("&times;");
    modalContent.prepend(closeBTN);
    modalContent.append(modalText);
    myModal.append(modalContent);
    $(".jumbotron").after(myModal);
}

function displayImage(imageURL) {
    var newImg = $("<img>");
    newImg.attr("src", imageURL);
    newImg.attr("class", "survey-image");
    $(".jumbotron").append(newImg);
    //Show Purchase Buttons & Jumbotron
    $(".jumbotron").show();
    $("#purchase-btns").show();
}
