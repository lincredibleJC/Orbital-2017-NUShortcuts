if (Meteor.isServer) {
  Meteor.publish("Feedbacks", function() {
    return Feedbacks.find();
  });
}