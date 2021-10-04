import Route                 from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class AuthenticatedRoute extends Route {
  @service session;
  @service store;

  beforeModel(transition) {
    this.session.requireAuthentication(transition, 'login');
  }

  model() {
    return this.store.queryRecord('user', { current: true });
  }
}
