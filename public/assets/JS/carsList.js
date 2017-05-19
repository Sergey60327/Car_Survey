Survey.Survey.cssType = "bootstrap";

var surveyJSON = { pages: [{ name: "page1", elements: [{ type: "panel", name: "panel2" }, { type: "radiogroup", name: "question2", choices: [{ value: "1", text: "first item" }, { value: "2", text: "second item" }, { value: "3", text: "third item" }] }, { type: "radiogroup", name: "question3", choices: [{ value: "1", text: "first item" }, { value: "2", text: "second item" }, { value: "3", text: "third item" }] }, { type: "radiogroup", name: "question4", choices: [{ value: "1", text: "first item" }, { value: "2", text: "second item" }, { value: "3", text: "third item" }] }, { type: "dropdown", name: "question5", choices: [{ value: "1", text: "first item" }, { value: "2", text: "second item" }, { value: "3", text: "third item" }] }, { type: "text", name: "question7" }] }] }

function sendDataToServer(survey) {
    var resultAsString = JSON.stringify(survey.data);
    alert(resultAsString);
    //Build HTML or Model to go into here and view upon completition 
    $.post("/survey", resultAsString).done(function (response) {
        //model or HTML to present image and car data
        console.log(response);
    });
}

var survey = new Survey.Model(surveyJSON);
$("#surveyContainer").Survey({
    model: survey,
    onComplete: sendDataToServer
});