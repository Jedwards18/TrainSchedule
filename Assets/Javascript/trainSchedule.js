$(document).ready(function(){

    var config = {
        apiKey: "AIzaSyAnoJQwun3c1rK7OZyTQCzzcuGCr53cMZY",
        authDomain: "test2-4a58b.firebaseapp.com",
        databaseURL: "https://test2-4a58b.firebaseio.com",
        projectId: "test2-4a58b",
        storageBucket: "test2-4a58b.appspot.com",
        messagingSenderId: "421089973850"
      };
      firebase.initializeApp(config);
    
      var dataRef = firebase.database();
    
      var destination = "";
      var distance = "";
      var time = "";
      var frequency = "";
    
      $("#submit-button").on("click", function() {
          event.preventDefault();

          var destination = $("#train-destination-input").val().trim();
          var distance = $("#train-distance-input").val().trim();
          var time = $("#train-time-input").val().trim();
          var frequency = $("#train-frequency-input").val().trim();
    
          dataRef.ref().push({
              destination: destination,
              distance: distance,
              time: time,
              frequency: frequency,
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

        var firstTimeConverted = moment(firstTime, "MM/DD, HH:mm");
        console.log(firstTimeConverted);

        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("MM/DD, hh:mm"));

        var diffTime = moment().diff(moment(firstTimeConverted), "hours", "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);

        var tRemainder = Math.abs(diffTime) % tFrequency;
        console.log(tRemainder);

        var tMinutesTillTrain = tFrequency - tRemainder;
        console.log("HOURS TILL TRAIN: " + tMinutesTillTrain, "hours", "minutes");


        var nextTrain = moment().add(tMinutesTillTrain, "hours", "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("MM/DD, hh:mm"));

        console.log(childSnapshot.val().destination);
        console.log(childSnapshot.val().time);
        console.log(childSnapshot.val().frequency);

        $("#current-schedule").append("<tr></tr>");
        $("#current-schedule").append("<td>" + childSnapshot.val().destination + "</td>");
        $("#current-schedule").append("<td>" + childSnapshot.val().distance + "</td>");
        $("#current-schedule").append("<td>" + childSnapshot.val().frequency + "</td>");
        $("#current-schedule").append("<td>" + moment(nextTrain).format("MM/DD, hh:mm") + "</td>");
        $("#current-schedule").append("<td>" + tMinutesTillTrain.toFixed(2) + "</td>");

      });

      $("#example").on("shown.bs.collapse", function() {
          $(this).removeClass('collapse');
      });
});