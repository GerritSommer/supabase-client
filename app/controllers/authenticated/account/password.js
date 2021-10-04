import Controller            from '@ember/controller';
import { inject as service } from '@ember/service';
import { action }            from '@ember/object';
import { tracked }           from '@glimmer/tracking';

export default class AuthenticatedAccountPasswordController extends Controller {
  @service session;
  @service router;
  queryParams = [ 'type' ]

  type = '';

  @tracked email          = '';
  @tracked repeatPassword = '';
  @tracked errorMessage   = '';

  @action
  async setupPassword() {
    event.preventDefault();

    try {
      await this.store.fetch('user', {
        method: 'PUT',
        namespace: 'auth/v1',
        body: {
          password: this.password
        }
      });
      this.router.transitionTo('authenticated');
    } catch(e) {
      this.errorMessage = e && e.message ? e.message : '';
    }

  }

}

