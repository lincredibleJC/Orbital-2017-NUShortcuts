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
    Bert.alert("You clicked agree!", "success", "growl-top-right");

  },
  "click #disagree": function(event, template){
    Bert.alert("You clicked disagree!", "danger", "growl-top-right");

  }
});
