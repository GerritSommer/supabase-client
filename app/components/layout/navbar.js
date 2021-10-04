import Component             from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action }            from '@ember/object';

export default class LayoutNavbarComponent extends Component {
  @service session;
  @service current;

  @action
  logout() {
    this.session.invalidate();
  }
}
