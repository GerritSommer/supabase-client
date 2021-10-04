import Route                 from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { parseResponse }     from 'ember-simple-auth/authenticators/oauth2-implicit-grant';

export default class ApplicationRoute extends Route {
  @service session;
  @service store;
  @service router;
  @service current;

  async activate() {
    const hash = parseResponse(window.location.hash);

    if (hash.access_token) {
      await this.session.authenticate('authenticator:v1/magiclink', hash);

      if ([ 'invite', 'recovery' ].includes(hash.type)) {
        console.log('go to password');
        return this.router.transitionTo('authenticated.account.password', { queryParams: { type: hash.type } })
      }
    }

  }

  beforeModel() {
    if (this.session.isAuthenticated) {
     return this.current.loadCurrentUser().catch(() => this.session.invalidate());
    }
  }

}
