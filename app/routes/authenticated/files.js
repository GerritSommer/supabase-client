import Route from '@ember/routing/route';

export default class AuthenticatedFilesRoute extends Route {
  model() {
    return this.store.query('file', { path: 'public' });

  }
}
