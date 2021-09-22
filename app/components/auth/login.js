import Component             from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked }           from '@glimmer/tracking';
import { action }            from '@ember/object';

export default class AuthLoginComponent extends Component {
  @service session;
  @service store;

  @tracked email        = '';
  @tracked password     = '';
  @tracked errorMessage = '';
  @tracked isRequesting = false;

  @action
  async login(event) {
    event.preventDefault();
    this.errorMessage = null;
    this.isRequesting = true;
    try {
      await this.session.authenticate(
        'authenticator:v1/password',
        this.email,
        this.password
      );
    } catch (error) {
      this.errorMessage = error.error_description;
    } finally {
      this.isRequesting = false;
    }
  }

}
