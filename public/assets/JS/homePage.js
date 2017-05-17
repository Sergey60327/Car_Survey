$("#signin-link").on("click", function (event) {
    modal("<p>Login or Register with:</p>              <a href='/login' class='btn btn-default'><span class='fa fa-user'></span> Local Login</a>             <a href='/signup' class='btn btn-default'><span class='fa fa-user'></span> Local Signup</a>         </div>     </div>");
})
////Login Screen
//$(document).on("click", "#login-btn", function (event) {
//    $(".modal").html("<div class='col-sm-6 col-sm-offset-3'>             <h1><span class='fa fa-sign-in signin-header'></span>Login</h1>             <!-- LOGIN FORM -->             <form action='/login' method='post'>                 <div class='form-group'>                     <label>Username</label>                     <input type='text' class='form-control' name='username'>                 </div>                 <div class='form-group'>                     <label>Password</label>                     <input type='password' class='form-control' name='password'>                 </div>                 <div class='form-group'>                     <label>Remember Me</label>                     <input type='checkbox' class='form-control' name='remember' value='yes'>                 </div>                  <button type='submit' class='btn btn-warning btn-lg'>Login</button>             </form>              <hr>              <p>Need an account? <a href='/signup'>Signup</a></p>             <p>Or go <a href='/'>home</a>.</p>         </div>")
//});
////Signup screen
//$(document).on("click", "#signup-btn", function (event) {
//    $(".modal").html("<div class='col-sm-6 col-sm-offset-3'>  	<h1><span class='fa fa-sign-in signin-header'></span>Signup</h1>  	<!-- LOGIN FORM --> 	<form action='/signup' method='post'> 		<div class='form-group'> 			<label>Username</label> 			<input type='text' class='form-control' name='username'> 		</div> 		<div class='form-group'> 			<label>Password</label> 			<input type='password' class='form-control' name='password'> 		</div>  		<button type='submit' class='btn btn-warning btn-lg'>Signup</button> 	</form>  	<hr>  	<p>Already have an account? <a href='/login'>Login</a></p> 	<p>Or go <a href='/'>home</a>.</p>  </div>")
//})

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
    $(".mod").append(myModal);
}