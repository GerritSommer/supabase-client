import BaseAuthenticator     from 'ember-simple-auth/authenticators/base';
import { inject as service } from '@ember/service';
import { resolve }           from 'rsvp';

export default class V1TokenAuthenticator extends BaseAuthenticator {
  @service store;

  async restore(data) {
    return data;
  }

  async authenticate(email, password) {
    return await this.store.fetch('token', {
      method: 'post',
      namespace: 'auth/v1',
      params: {
        grant_type: 'password'
      },
      body: { email, password }
    });

  }

  invalidate() {
    return resolve();
  }
}
