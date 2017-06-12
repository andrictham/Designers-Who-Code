$(document).ready(function(){
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDgq6s-pvf7hzX3TxMgplqcGhmEQPO-CqY",
    authDomain: "designers-who-code.firebaseapp.com",
    databaseURL: "https://designers-who-code.firebaseio.com",
    projectId: "designers-who-code",
    storageBucket: "designers-who-code.appspot.com",
    messagingSenderId: "376488763332"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var displayRef = database.ref('/display')
  displayRef.once("value", function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var designerProfile = childSnapshot.val().designerProfile
      $(".loading").detach()
      $("#profiles").append(
        "<div class='profile'>" +
        "<img src ='" + designerProfile.imageUrl + "' width='100' />" +
        "<h3>" + designerProfile.name + "</h3>" +
        "<h5> @" + designerProfile.handle + "</h5>" +
        "<p>" + designerProfile.description + "</p>" +
        "<a class='button' target='_blank' href='http://twitter.com/" + designerProfile.handle + "'> Go to Profile </a>" +
        "</div>"
      )
    })
  })
})
