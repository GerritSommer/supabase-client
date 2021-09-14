import BaseAuthenticator     from 'ember-simple-auth/authenticators/base';
import ENV                   from 'supabase-client/config/environment';
import { inject as service } from '@ember/service';
import { resolve, reject }   from 'rsvp';
import fetch                 from 'fetch';

const { SUPABASE_BASE_URL, SUPABASE_KEY } = ENV;

export default class V1TokenAuthenticator extends BaseAuthenticator {
  @service store;

  async restore(data) {
    return data;
  }

  async authenticate(hash) {
    return hash;
  }

  invalidate() {
    return resolve();
  }
}
