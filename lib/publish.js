if (Meteor.isServer) {
  Meteor.publish("Feedbacks", function() {
    return Feedbacks.find();
  });

  Meteor.publish("LocationStats", function() {
    return LocationStats.find();
  });  
}