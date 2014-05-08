App = Ember.Application.create();

App.Router.map(function() {
  this.resource('dedications', function(){
  	this.route('new');	
  });
});

App.DedicationsRoute = Ember.Route.extend({
  model: function() {
    return dedications;
  }
});

var dedications = [{author:'max', text: 'ember, are you there?', date: new Date()}]