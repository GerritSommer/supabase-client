import { inject as service } from '@ember/service';
import BaseSessionService from 'ember-simple-auth/services/session';

export default class SessionService extends BaseSessionService {
  @service router;

  async handleAuthentication(routeAfterAuthentication='authenticated') {
    super.handleAuthentication(...arguments);
    this.router.transitionTo('authenticated');
  }
}
