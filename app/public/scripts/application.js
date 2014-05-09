App = Ember.Application.create();

App.Router.map(function() {
  this.route('main');
  this.route('new');
});

var internalLoadAll = function(store) {
	return store.find('dedication');
}

// the application stuff
App.ApplicationRoute = Ember.Route.extend({
	setupController: function(controller, emptyModel) {
		internalLoadAll(this.store).
			then(function (freshDedications) {
			controller.set('model', freshDedications);
		});
  	}
});

App.ApplicationController = Ember.ArrayController.extend({
	test: 'testing',
	actions: {
		remove: function (id){
				alert('removing dedication with id \'' + id + '\'');	
		}
	}
});

App.MainController = Ember.ObjectController.extend({
	needs: ["application"],
	applicationController: Ember.computed.alias("controllers.application"),
  	actions: {
		refresh: function (){
			var that = this;
			internalLoadAll(this.store).
				then(function (freshDedications) {
				those = this;
				that.get('applicationController').set('model', freshDedications);
			});
		}
	}
});

// the index stuff
App.IndexRoute = Ember.Route.extend({
	// redirect the index route to main
	beforeModel: function() {
		this.transitionTo('main');
	}
});


// the new stuff
App.NewController = Ember.ObjectController.extend({
	actions: {
		add: function (author, text) {
			alert('adding dedication \'' + dedication + '\' from author \'' + author + '\'');
		}
	}
});

