//Remove LI for current user
$("#" + localStorage.userName + "-listing").remove();

//Criteria to Show Survey or List, and show status of Car upon signing in.
$.get("/carsdb", function (response) {
    $.each(response.carsList, function (i, val) {
        if (localStorage.userName === val.username) {
            $("#surveyContainer").hide();
            if (val.swapStatus === 0) {
                $("#carStatus").html("Your Car is still up for swapping");
                $("#swap-btns").hide();
            }
            else if (val.swapStatus === 1) {
                $("#carStatus").html(val.userSwap + " wants to swap cars with you");
                $("#swap-btns").show();
                //Swap btns criteria
                //yes btn event listener. Set both cars status from classifieds to 2 and change car status to swapped
                $("#yes-btn").on("click", function (event) {
                    var usersForSwap = {
                        currentUser: localStorage.userName,
                        userSwap: val.userSwap
                    }
                    $.ajax({
                        url: "/updatecarstoswapped",
                        type: "put",
                        data: usersForSwap
                    }).done(function () {
                        //do something with browser
                        console.log("delete request sent");
                    });
                });

                //no button to update back to 0
                $("#no-btn").on("click", function (event) {

                });
            }
            else if (val.swapStatus === 2) {
                $("#carStatus").html("You have swapped cars");
                $("#swap-btns").hide();
            }
        }
    });

    //event listener for onclick of 
    $("#requestSwap-btn").on("click", function (event) {
        console.log(event.target.attributes[3].value);
        var userForSwap = {
            userSwap: event.target.attributes[3].value
        }
        $.ajax({
            url: "/updateSwapStatus/" + localStorage.userName,
            type: "put",
            data: userForSwap
        }).done(function () {
            //do something with browser
            console.log("update request sent");
        });
    })
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

