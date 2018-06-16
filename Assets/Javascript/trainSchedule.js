$(document).ready(function(){

    var config = {
        apiKey: "AIzaSyC6VIbcnO_rnlNKjENanOAdSou9t0s5704",
        authDomain: "test-6a74f.firebaseapp.com",
        databaseURL: "https://test-6a74f.firebaseio.com",
        projectId: "test-6a74f",
        storageBucket: "test-6a74f.appspot.com",
        messagingSenderId: "867455114751"
      };
      firebase.initializeApp(config);
    
      var dataRef = firebase.database();
    
      var name = "";
      var destination = "";
      var time = "";
      var frequency = "";
    
      $("#submit-button").on("click", function() {
          event.preventDefault();

          var name = $("#train-name-input").val().trim();
          var destination = $("#train-destination-input").val().trim();
          var time = $("#train-time-input").val().trim();
          var frequency = $("#train-frequency-input").val().trim();
    
          dataRef.ref().push({
              name: name,
              destination: destination,
              time: time,
              frequency: frequency,
              //arrival: nextTrain,
              //away: tMinutesTillTrain,
              dateAdded: firebase.database.ServerValue.TIMESTAMP,
          });
        $("#myForm").each(function() {
            this.reset();
          });
      });
    
      dataRef.ref().on("child_added", function(childSnapshot) {

        var tFrequency = childSnapshot.val().frequency;
        console.log(tFrequency);
        console.log(typeof tFrequency);
          
        var firstTime = childSnapshot.val().time;
        console.log(firstTime);

        var firstTimeConverted = moment(firstTime, "HH:mm");
        console.log(firstTimeConverted);

        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);

        var tRemainder = diffTime % tFrequency;
        console.log(tRemainder);

        var tMinutesTillTrain = tFrequency - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);


        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
        
        console.log(childSnapshot.val().name);
        console.log(childSnapshot.val().destination);
        console.log(childSnapshot.val().time);
        console.log(childSnapshot.val().frequency);

        $("tbody").append("<tr></tr>");
        $("tbody").append("<td>" + childSnapshot.val().name + "</td>");
        $("tbody").append("<td>" + childSnapshot.val().destination + "</td>");
        $("tbody").append("<td>" + childSnapshot.val().frequency + "</td>");
        $("tbody").append("<td>" + moment(nextTrain).format("hh:mm") + "</td>");
        $("tbody").append("<td>" + tMinutesTillTrain + "</td>");

      });

      $("td").hover(function() {
          $(this).fadeIn(500);
      })
});