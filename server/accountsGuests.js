Meteor.startup(function() {
  AccountsGuest.enabled = true;
  AccountsGuest.forced = true;
  AccountsGuest.name = false;
  AccountsGuest.anonymous = true;
  /* clean out all guest accounts more than 35040 hours old (4 years)*/
  var before = new Date();
  before.setHours(before.getHours() - 35040);
  Accounts.removeOldGuests(before);
});