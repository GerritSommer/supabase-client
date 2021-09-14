import ApplicationAdapter from './application';

export default class UserAdapter extends ApplicationAdapter {
  namespace = 'auth/v1';

  urlForQueryRecord({ current }) {
    if (current) {
      return `${this.host}/${this.namespace}/user`;
    }
    return super.urlForQueryRecord(...arguments);
  }
}
