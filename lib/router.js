Router.configure({
  // we use the  appBody template to define the layout for the entire app
  layoutTemplate: 'appBody',

  // the appNotFound template is used for unknown routes and missing lists
  notFoundTemplate: 'appNotFound',

  // show the appLoading template whilst the subscriptions below load their data
  loadingTemplate: 'appLoading',

  // wait on the following subscriptions before rendering the page to ensure
  // the data it's expecting is present
  waitOn: function() {
    return Meteor.subscribe('places');
  }
});

dataReadyHold = null;

if (Meteor.isClient) {
  // Keep showing the launch screen on mobile devices until we have loaded
  // the app's data
  dataReadyHold = LaunchScreen.hold();

  // Show the loading screen on desktop
  Router.onBeforeAction('loading', {except: 'signin'});
  Router.onBeforeAction('dataNotFound', {except: 'signin'});
}

Router.map(function() {
  this.route('signin');
  this.route('join');

  this.route('listsShow', {
    path: '/lists/:_id',
    // subscribe to people before the page is rendered but don't wait on the
    // subscription, we'll just render the items as they arrive
    onBeforeAction: function () {
      this.peopleHandle = Meteor.subscribe('person', this.params._id);
      if (this.ready()) {
        // Handle for launch screen defined in app-body.js
        dataReadyHold.release();
      }
    },
    data: function () {
      return Lists.findOne(this.params._id);
    },
    action: function () {
      this.render();
    }
  });

  this.route('home', {
    path: '/',
    action: function() {
      Router.go('listsShow', Lists.findOne());
    }
  });
});

if (Meteor.isClient) {
  Router.onBeforeAction('loading', {except: 'signin'});
  Router.onBeforeAction('dataNotFound', {except: 'signin'});
}
