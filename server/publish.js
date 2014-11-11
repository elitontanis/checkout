Meteor.publish('places', function() {
  return Lists.find({userId: {$exists: false}});
});

Meteor.publish('person', function(listId) {
  check(listId, String);

  return People.find({listId: listId});
});
