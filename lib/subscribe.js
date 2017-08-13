if (Meteor.isClient) {
  Meteor.subscribe("Feedbacks");
  Meteor.subscribe("LocationStats");
}