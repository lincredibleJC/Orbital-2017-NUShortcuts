Template.feedbackForm.onRendered(function() {

});

Template.feedbackForm.events({
  "submit .feedbackForm": function(event) {
    //get values and store them in mongodb
    var feedbackName = trimInput(event.target.feedbackName.value);
    var feedbackTitle = trimInput(event.target.feedbackTitle.value);
    var feedbackContent = trimInput(event.target.feedbackContent.value);

    if (isNotEmpty(feedbackName) &&
      isNotEmpty(feedbackTitle) &&
      isNotEmpty(feedbackContent)) {

      Meteor.call('addFeedback', feedbackName, feedbackTitle, feedbackContent);

      //clears the field
      event.target.feedbackName.value = "";
      event.target.feedbackTitle.value = "";
      event.target.feedbackContent.value = "";

      Bert.alert("Your feedback was submitted!", "success", "growl-top-right");

    } else {
      Bert.alert("Something went wrong, did you fill in all the fields?", "danger", "growl-top-right");

    }

    return false; //prevent submitting of form
  }
});


//Validation Rules

// Trim Helper
var trimInput = function(val) {
  return val.replace(/^\s*|\s*$/g, "");
};

var isNotEmpty = function(value) {
  if (value && value !== '') {
    return true;
  }
  Bert.alert("Please fill in all fields", "danger", "growl-top-right");
  return false;
};
