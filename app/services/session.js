import { inject as service } from '@ember/service';
import BaseSessionService from 'ember-simple-auth/services/session';

export default class SessionService extends BaseSessionService {
  @service router;
  @service current;

  async handleAuthentication(routeAfterAuthentication='authenticated') {
    super.handleAuthentication(...arguments);

    this.current.loadCurrentUser().catch(() => this.invalidate());
  }
}
