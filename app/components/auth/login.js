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

  @action
  async login(event) {
    event.preventDefault();
    this.errorMessage = undefined;
    console.log('a');
    try {
      await this.session.authenticate(
        'authenticator:v1/password',
        this.email,
        this.password
      );
    } catch (error) {
      this.errorMessage = error.error_description;
    }
  }

  // @action
  // requestMagicLink() {
  //   const applicationAdapter = this.store.adapterFor('application');

    // this.store.fetch('magiclink', {
    //   method:    'POST',
    //   namespace: 'auth/v1',
    //   body:      { email: 'gerrit.sommer@outlook.com' },
    // });
  // }
}
