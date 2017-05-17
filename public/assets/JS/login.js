$("#submit-btn").on("click", function (event) {
    localStorage.setItem("userName", $("#username").val().trim());
})
