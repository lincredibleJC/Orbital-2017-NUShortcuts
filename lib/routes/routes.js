Router.configure({
  layoutTemplate: 'main_layout'
});

Router.map(function() {
  // Homepage, which  is also navigation
  this.route('navigation', {
    path: '/navigation',
    template: 'navigation'
  });

  // Map
  this.route('map', {
    path: '/map',
    template: 'map'
  });

  // locationSearch
  this.route('locationSearch', {
    path: '/locationSearch',
    template: 'locationSearch'
  });

  // Popular Locations
  this.route('popularLocations', {
    path: '/popularLocations',
    template: 'popularLocations'
  });

  // Settings
  this.route('settings', {
    path: '/settings',
    template: 'settings'
  });

  // Settings
  this.route('feedback', {
    path: '/feedback',
    template: 'feedback'
  });

});
