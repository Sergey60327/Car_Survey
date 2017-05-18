//Remove LI for current user
$("#" + localStorage.userName + "-listing").remove();
//Criteria to Show Survey or List, and show status of Car upon signing in.
$.get("/carsdb", function (response) {
    $.each(response.carsList, function (i, val) {
        if (localStorage.userName === val.username) {
            $("#surveyContainer").hide();
        }
    });
}).then(function () {
    Survey.Survey.cssType = "bootstrap";

    var surveyJSON = { pages: [{ name: "page1", elements: [{ type: "text", isRequired: true, name: "make", title: "Car Make" }, { type: "text", isRequired: true, name: "model", title: "Car Model" }, { type: "text", inputType: "number", isRequired: true, name: "year", title: "Car Year" }, { type: "text", isRequired: true, name: "color", title: "Exterior Color" }, { type: "text", inputType: "number", isRequired: true, name: "price", title: "Current Selling Price" }, { type: "text", inputType: "url", isRequired: true, name: "photoURL", title: "Image URL of Car" }] }] }
    var survey = new Survey.Model(surveyJSON);
    $("#surveyContainer").Survey({
        model: survey,
        onComplete: sendDataToServer
    });

    function sendDataToServer(survey) {
        var resultAsString = JSON.stringify(survey.data);
        var carsData = {
            username: localStorage.userName,
            carInfo: survey.data
        }
        alert(resultAsString);
        //Build HTML or Model to go into here and view upon completition 
        $.post("/carslist", carsData).done(function (response) {
            //model or HTML to present image and car data
            $("#surveyContainer").hide();
        });
    }
});

