Template.feedback.onRendered(function() {
  $("#feedback-link").addClass('selected');
  $("#navigation-link,#map-link,#popularLocations-link,#settings-link,locationSearch-link").removeClass('selected');

});

Template.feedback.helpers({
  feedbacks: function() {
    var feedbacks = Feedbacks.find({}, {sort: {createdAt: -1}});
    return feedbacks;
  }
});

Template.feedback.events({
  "click #agree": function(event, template){
  //find the post
  var thisFeedback = Feedbacks.findOne({_id: this._id})._id;
  console.log(thisFeedback);
  Meteor.call("incAgreeVote", thisFeedback);

  Bert.alert("You clicked agree!", "success", "growl-top-right");

  },

  "click #disagree": function(event, template){
  //find the post
  var thisFeedback = Feedbacks.findOne({_id: this._id})._id;
  console.log(thisFeedback);
  Meteor.call("incDisagreeVote", thisFeedback);

  Bert.alert("You clicked disagree!", "success", "growl-top-right");

  },

  "click #delete-feedback": function(){
    Meteor.call("removeFeedback", this._id);
    Bert.alert("Your feedback has been deleted.", "success", "growl-top-right");
  }
});
