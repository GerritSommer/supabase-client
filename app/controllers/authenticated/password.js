import Controller  from '@ember/controller';
import { action }  from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class AuthenticatedPasswordController extends Controller {
  queryParams = [ 'type' ]

  type = '';

  @tracked email          = '';
  @tracked password       = '';
  @tracked repeatPassword = '';
  @tracked errorMessage   = '';

  @action
  async setupPassword() {
    event.preventDefault();
    const { email, password } = this;

    try {
      await this.store.fetch('user', {
        method: 'PUT',
        namespace: 'auth/v1',
        body: {
          email, password
        }
      });
      this.router.transitionTo('authenticated');
    } catch(e) {
      this.errorMessage = e && e.message ? e.message : '';
    }

  }

}
