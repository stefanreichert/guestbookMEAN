App.ApplicationSerializer = DS.RESTSerializer.extend({
    primaryKey: '_id'
});

// the data stuff
App.Dedication = DS.Model.extend({
	_id: DS.attr(),
	author: DS.attr('string'),
	text: DS.attr('string'),
	date: DS.attr('date')
});