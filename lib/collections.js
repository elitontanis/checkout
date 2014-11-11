Lists = new Meteor.Collection('lists');

// Calculate a default name for a place in the form of 'Place A'
Lists.defaultName = function() {
  var nextLetter = 'A', nextName = 'Place ' + nextLetter;
  while (Lists.findOne({name: nextName})) {
    // not going to be too smart here, can go past Z
    nextLetter = String.fromCharCode(nextLetter.charCodeAt(0) + 1);
    nextName = 'Place ' + nextLetter;
  }

  return nextName;
};

People = new Meteor.Collection('people');
