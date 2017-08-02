Meteor.startup(function() {
  AccountsGuest.enabled = true;
  AccountsGuest.forced = true;
  AccountsGuest.name = false;
  AccountsGuest.anonymous = true;
  /* clean out all guest accounts more than 720 hours old (30 days)*/
  var before = new Date();
  before.setHours(before.getHours() - 720);
  Accounts.removeOldGuests(before);
});