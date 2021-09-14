import Route                 from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { parseResponse }     from 'ember-simple-auth/authenticators/oauth2-implicit-grant';
import fetch                 from 'fetch';
import ENV                   from 'supabase-client/config/environment';

const apiKey   = ENV.SUPABASE_KEY;

export default class ApplicationRoute extends Route {
  @service session;
  @service store;
  @service router;

  async activate() {
    const hash = parseResponse(window.location.hash);

    if (hash.access_token) {
      await this.session.authenticate('authenticator:v1/magiclink', hash);

      if ([ 'invite', 'recovery' ].includes(hash.type)) {
        return this.router.transitionTo('authenticated.password', { queryParams: { type: hash.type } })
      }
    }

  }

}
