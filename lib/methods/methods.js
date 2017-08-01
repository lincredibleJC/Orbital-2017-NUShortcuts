if (Meteor.isServer) {
  Meteor.methods({
    addFeedback: function(feedbackName, feedbackTitle, feedbackContent) {
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
        closed: false
      });

    },

    removeFeedback: function(feedbackId){
      Feedbacks.remove(feedbackId);
    },

    incAgreeVote: function(thisFeedback){
      Feedbacks.update(thisFeedback, {$inc: {agreeScore: +1}});
    },

    incDisagreeVote: function(thisFeedback){
      Feedbacks.update(thisFeedback, {$inc: {disagreeScore: +1}});
    },


  });
}
