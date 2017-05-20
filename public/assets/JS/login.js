$("#submit-btn").on("click", function (event) {
    sessionStorage.setItem("userName", $("#username").val().trim());
})
