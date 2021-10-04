import EmberRouter from '@ember/routing/router';
import config from 'supabase-client/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  /////////////////////////////////////
  //////////GLOBAL ROUTES
  this.route('index');

  /////////////////////////////////////
  //////////UNAUTHENTICATED ROUTES
  this.route('login');

  /////////////////////////////////////
  //////////AUTHENTICATED ROUTES
  this.route('authenticated', { path: '' }, function() {
    this.route('account', function() {
      this.route('password');
    });
    this.route('users');
  });
});
