var config = {
    apiKey: "AIzaSyAbXI_xyQjnaP07Tg3LWSRVRrykfxz0H-o",
    authDomain: "train-scheduler-54fd1.firebaseapp.com",
    databaseURL: "https://train-scheduler-54fd1.firebaseio.com",
    projectId: "train-scheduler-54fd1",
    storageBucket: "train-scheduler-54fd1.appspot.com",
    messagingSenderId: "456245783707"
  };
  firebase.initializeApp(config);

  var dataRef = firebase.database();

  var trainName = "";
  var destination = "";
  var firstTrainTime = "";
  var frequency = "";
  var nextArrival = "";
  var minutesAway = "";

  $("#submit-button").on("click", function() {
      var trainName = $("#train-name-input").val().trim();
      var trainDestination = $("#train-destination-input").val().trim();
      var firstTrainTime = $("#train-time-input").val().trim();
      var trainFrequency = $("#train-frequency-input").val().trim();

      dataRef.ref().push({
          name: trainName,
          destination: trainDestination,
          time: firstTrainTime,
          frequency: trainFrequency,
      });
      $("#myForm").each(function() {
          this.rest();
      });
  });

  dataRef.ref().on("child_added", function() {
      console.log(childSnapshot.val().name);
      console.log(childSnapshot.val().destination);
      console.log(childSnapshot.val().time);
      console.log(childSnapshot.val().frequency);
  })
