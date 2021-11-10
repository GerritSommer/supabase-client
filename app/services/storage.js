import Service               from '@ember/service';
import { inject as service } from '@ember/service';
import { assert }            from '@ember/debug';

export default class StorageService extends Service {
  @service session;
  @service store;

  get baseUrl() {
    return `${this.store.adapterFor('application').host}/storage/v1/`;
  }

  get headers() {
    const { apiKey, authorization } = this.store.adapterFor('application').headers;
    return { apiKey, authorization };
  }

  async upload(file, { path, cacheControl=3600 }={}) {
    assert('You must provide a File instance', file instanceof File);
    assert('The cacheControl argument must be an integer', Number.isInteger(cacheControl));
    assert('The path argument must be a string', typeof path === 'string'); // TODO: use a regex for a valid path

    // const path     = `object/${file.name}`;
    const formData = new FormData();
    const url      = `${this.baseUrl}object/${path}/${file.name}`;

    formData.append('file', file);
    formData.append('cacheControl', cacheControl);

    try {
      const response = await fetch(url, {
        method:    'POST',
        body:      formData,
        headers:   this.headers
      });

      if (response.ok) {
        return {
          url,
          error: null
        };
      } else {
        const error = await response.json();
        return { url: null, error };
      }
    } catch (error) {
      return { url: null, error };
    }
  }
}
