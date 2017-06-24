Router.configure({
	layoutTemplate: 'main_layout'
});

Router.map(function(){
	// Homepage, which  is also navigation
	this.route('home', {
		path: '/',
		template: 'navigation'
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

	// Map
	this.route('map', {
		path: '/map',
		template: 'map'
	});

	// Settings
	this.route('appSettings', {
		path: '/appSettings',
		template: 'appSettings'
	});


});
