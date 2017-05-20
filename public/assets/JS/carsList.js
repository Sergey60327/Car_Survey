//Remove LI for current user & Do not automatically show car status and actions box

$("#" + localStorage.userName + "-listing").remove();
$(".carlistimage").css("height","50%");
$(".carlistimage").css("width","50%");
$(".requestSwap-btn").css("margin-left", "60px");
$(".requestSwap-btn").css("margin-top", "20px");
$(".requestSwap-btn").css("height", "50px");

$("#" + sessionStorage.userName + "-listing").remove();

$("#car-actions-box").hide()
//Criteria to Show Survey or List, and show status of Car upon signing in.
$.get("/carsdb", function (response) {
    //Add Handling of DB being null
    if (response.carsList.length == 0) {
        console.log("You are the only car");
        initialActionCriteria(response);
        $("#swap-btns").hide();
        $("#car-actions-box").show();
        $("#requestSwap-btn").hide();
        $("#carStatus").html("There are no cars as you are the first user to post a car. Please fill out the survey and come back to check to see if more cars are available.");
    }
    else if (response.carsList.length == 1) {
        console.log("You are the only car");
        initialActionCriteria(response);
        $("#swap-btns").hide();
        $("#car-actions-box").show();
        $("#requestSwap-btn").hide();

        $("#carStatus").html("There is only one car in the list and no user(s) to swap with. Please come back to check to see if more cars are available");


       
        

    }
    else if (response.carsList != "") {
        console.log("hello");
        $("#swap-btns").hide();
        initialActionCriteria(response);
        $("#car-actions-box").show();

    }
});

    //event listener for onclick of request & GET for USER existing car ID in current scope
$(".cars-list").on("click", ".requestSwap-btn", function (event) {
    console.log(event);
    //logic to receive swap user and swap car id from html element data
    $.get("/cardatabyuser/" + sessionStorage.userName).done(function (response) {
        var swapCarData = event.target.id;
        var swapDataArray = swapCarData.split("-");
        var userForSwapData = {
            currentCarId: response.id,
            userSwap: swapDataArray[0],
            vehicleSwapId: swapDataArray[1]
        }
        $.ajax({
            url: "/updateSwapStatus/" + sessionStorage.userName,
            type: "put",
            data: userForSwapData
        }).done(function (response) {
            //do something with browser
            console.log("update request sent");
            $(location).attr("href", response);
        });
    });
});
//Post Function to Insert Car
function postCar(carsData) {
    $.post("/carslist", carsData).done(function (response) {
        //model or HTML to present image and car data
        $("#surveyContainer").hide();
        $(".requestSwap-btn").show();
        $(location).attr("href", response);
        console.log("post car succeeded");
    });
}

function showSurvey() {
    Survey.Survey.cssType = "bootstrap";

    var surveyJSON = { pages: [{ name: "page1", elements: [{ type: "text", isRequired: true, name: "make", title: "Car Make" }, { type: "text", isRequired: true, name: "model", title: "Car Model" }, { type: "text", inputType: "number", isRequired: true, name: "year", title: "Car Year" }, { type: "text", isRequired: true, name: "color", title: "Exterior Color" }, { type: "text", inputType: "number", isRequired: true, name: "price", title: "Current Selling Price" }, { type: "text", inputType: "url", isRequired: true, name: "photoURL", title: "Image URL of Car" }] }] }
    var survey = new Survey.Model(surveyJSON);
    $("#surveyContainer").Survey({
        model: survey,
        onComplete: sendDataToServer
    });
    //Add attribute for nightshade
    $("input[type='button']").attr("id", "complete-btn");

    function sendDataToServer(survey) {
        var resultAsString = JSON.stringify(survey.data);
        var carsData = {
            username: sessionStorage.userName,
            carInfo: survey.data
        }
        //Build HTML or Model to go into here and view upon completition
        //Remove existing car if array length is greater than or equal to 1 to only have one car per user in DB
        $.get("/cardatabyuser/" + sessionStorage.userName).done(function (response) {
            console.log("____________________________");
            console.log(response);
            if (response != null) {
                console.log("if post");
                $.ajax({
                    url: "/deletecar/" + sessionStorage.userName,
                    type: "delete",
                    success: postCar(carsData)
                ////}).done(function (response) {
                ////    //do something with browser
                ////    console.log("car deleted");
                ////    $.post("/carslist", carsData).done(function (response) {
                ////        //model or HTML to present image and car data
                ////        $("#surveyContainer").hide();
                ////        $("requestSwap-btn").show();
                ////        //$(location).attr("href", response);
                //    });
                });
            }
            else {
                console.log("else post");
                postCar(carsData);
            }
        });
    }
}

        function initialActionCriteria(response) {
            showSurvey();
            $.each(response.carsList, function (i, val) {
                if (sessionStorage.userName === val.username && val.swapStatus !== 2) {
                    $("#surveyContainer").hide();
                    if (val.swapStatus === 0) {
                        $("#carStatus").html("Pending for Swap");
                        $("#swap-btns").hide();
                    }
                    else if (val.swapStatus === 1) {
                        $.get("/cardatabyuser/" + sessionStorage.userName).done(function (responseUser) {
                            if (responseUser.initiatedSwap === false) {
                                //Call to get individual car data of swap car and display on page
                                $.get("/cardatabyid/" + responseUser.swapCarID).done(function (responseId) {
                                    console.log(responseId);
                                    $("#carStatus").html(responseUser.userSwap + " wants to swap cars with you. They would like to swap for a " + responseId.year + " " + responseId.color + " " + responseId.make + " " + responseId.model + " that is currently worth $" + responseId.price + ". Do you wish to swap?");
                                    //Show Image of the Car and append to car status
                                    var newImg = $("<img>");
                                    newImg.attr("src", responseId.photo);
                                    newImg.attr("alt", responseId.make + "-" + responseId.model);
                                    newImg.css("height", "15%");
                                    newImg.css("width", "15%");
                                    $("#carStatus").append(newImg);
                                    $("#swap-btns").show();
                                });
                            }
                            else if (responseUser.initiatedSwap === true) {
                                $("#carStatus").html("You have initiated a swap with " + responseUser.userSwap + ".This status is pending acceptance.");
                            }
                            //Swap btns criteria
                            //yes btn event listener. Set both cars status from classifieds to 2 and change car status to swapped
                            $("#car-actions-box").on("click", "#yes-btn", function (event) {
                                console.log("yes");
                                var usersInSwap = {
                                    currentUser: sessionStorage.userName,
                                    userSwap: val.userSwap
                                }
                                $.ajax({
                                    url: "/updatecarstoswapped",
                                    type: "put",
                                    data: usersInSwap
                                }).done(function (response) {
                                    //do something with browser
                                    console.log("updates request sent");
                                    $(location).attr("href", response);
                                });
                            });

                            //no button to update back to 0
                            $("#no-btn").on("click", function (event) {
                                var usersInSwap = {
                                    currentUser: sessionStorage.userName,
                                    userSwap: val.userSwap
                                }
                                $.ajax({
                                    url: "/updatecarstonotswapped",
                                    type: "put",
                                    data: usersInSwap
                                }).done(function (response) {
                                    //do something with browser
                                    console.log("updates request sent");
                                    $(location).attr("href", response);
                                });
                            });
                        });
                    }

                }
                else if (sessionStorage.userName === val.username && val.swapStatus === 2) {
                    $("#carStatus").html("Congratulations! Your car was swapped. Would you like to enter another one?");
                    $(".requestSwap-btn").hide();
                    $("#swap-btns").hide();
                }

            });
        }
