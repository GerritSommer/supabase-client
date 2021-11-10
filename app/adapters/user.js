import ApplicationAdapter from './application';

export default class UserAdapter extends ApplicationAdapter {
  // namespace = 'auth/v1';

  urlForQueryRecord({ current }) {
    if (current) {
      return `${this.host}/auth/v1/user`;
    }
    return super.urlForQueryRecord(...arguments);
  }
}
