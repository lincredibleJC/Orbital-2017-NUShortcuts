Template.feedback.onRendered(function() {
  $("#feedback-link").addClass('selected');
  $("#navigation-link,#map-link,#popularLocations-link,#settings-link,locationSearch-link").removeClass('selected');

});

Template.feedback.helpers({
  feedbacks: function() {
    var feedbacks = Feedbacks.find({}, {
      sort: {
        createdAt: -1
      }
    });
    return feedbacks;
  }
});

Template.feedback.events({
  "click #agree": function(event, template) {
    //find the post, userId and the votes of the feedback
    var thisFeedback = Feedbacks.findOne({
      _id: this._id
    })._id;
    var userId = Meteor.user()._id;
    var thisFeedbackVotes = Feedbacks.findOne({
      _id: this._id
    }, {
      voted: {
        $in: userId
      }
    }).voted;

    // In the array!, meaning user has voted
    if (thisFeedbackVotes.indexOf(userId) > -1) {
      Bert.alert("You cannot vote twice", "danger", "growl-top-right");

    } else { // Not in the Array, Do stuff.
      Meteor.call("countVote", thisFeedback, userId);
      Meteor.call("incAgreeVote", thisFeedback);
      Bert.alert("You clicked agree!", "success", "growl-top-right");

    }

    if (userId === thisFeedbackVotes) {
      Bert.alert("You cannot vote for your own post", "danger", "growl-top-right");

    }

  },

  "click #disagree": function(event, template) {
    //find the post, userId and the votes of the feedback
    var thisFeedback = Feedbacks.findOne({
      _id: this._id
    })._id;
    var userId = Meteor.user()._id;
    var thisFeedbackVotes = Feedbacks.findOne({
      _id: this._id
    }, {
      voted: {
        $in: userId
      }
    }).voted;

    // In the array!, meaning user has voted
    if (thisFeedbackVotes.indexOf(userId) > -1) {
      Bert.alert("You cannot vote twice", "danger", "growl-top-right");

    } else { // Not in the Array, Do stuff.
      Meteor.call("countVote", thisFeedback, userId);
      Meteor.call("incDisagreeVote", thisFeedback);
      Bert.alert("You clicked disagree!", "success", "growl-top-right");

    }

    if (userId === thisFeedbackVotes) {
      Bert.alert("You cannot vote for your own post", "danger", "growl-top-right");

    }

  },

  "click #delete-feedback": function() {
    var userId = Meteor.user()._id;
    var thisFeedbackOwner = Feedbacks.findOne({
      _id: this._id
    }).userId;

    if (userId === thisFeedbackOwner) {
      Meteor.call("removeFeedback", this._id);
      Bert.alert("Your feedback has been deleted.", "success", "growl-top-right");

    } else {
      Bert.alert("You are not the owner of this post", "danger", "growl-top-right");

    }

  }
});
