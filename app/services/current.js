import Service               from '@ember/service';
import { inject as service } from '@ember/service';
import { tracked }           from '@glimmer/tracking';

export default class CurrentService extends Service {
  @service store;
  @service session;

  @tracked user;

  async loadCurrentUser() {
    if (this.session.isAuthenticated) {
      const user = await this.store.queryRecord('user', { current: true });
      this.user  = user;

      return user;
    }
  }
}
