import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.locationInput.onCreated(function locationInputOnCreated() {
  // locationInput
  this.locationInput = new ReactiveVar(0);
});

Template.locationInput.helpers({
  locationInput(){
    return Template.instance().locationInput.get();
  },
});

Template.output.events({
  'search button'(event, instance){
	  //search when search button is clicked
	},
});


/*
map in the background

navigation drawer on the left
settings drawer on the left

input:
onclick for search: run queries
on click on query type, hide all other queries and open the list of instructions and bolded names of vertex
on click on instructions or image on right, show image, click again to return
on click on bolded vertex, popout navbar and show vertex details, including photos and list of rooms.


on back rbutton for everything, undo 1 action.
*/
