if (Meteor.isServer) {
  Meteor.methods({
    addFeedback: function(feedbackName, feedbackTitle, feedbackContent) {
      var username = Meteor.user()._id;
      var year = new Date().getFullYear();
      var month = new Date().getMonth() + 1;
      var day = new Date().getDate();
      var date = (month + "/" + day + "/" + year).toString();

      Feedbacks.insert({
        title: feedbackTitle,
        author: feedbackName,
        date: date,
        feedback: feedbackContent,
        createdAt: new Date(),
        agreeScore: 0,
        disagreeScore: 0,
        closed: false,
        voted: [username],
        userId: Meteor.userId(), 
      });

    },

    removeFeedback: function(feedbackId){
      Feedbacks.remove(feedbackId);
    },

    countVote: function(thisFeedback, name) {
      Feedbacks.update(thisFeedback, {$addToSet: {voted: name}});
    },

    incAgreeVote: function(thisFeedback){
      Feedbacks.update(thisFeedback, {$inc: {agreeScore: +1}});
    },

    incDisagreeVote: function(thisFeedback){
      Feedbacks.update(thisFeedback, {$inc: {disagreeScore: +1}});
    },


  });
}
