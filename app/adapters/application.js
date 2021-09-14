import RESTAdapter           from '@ember-data/adapter/rest';
import { inject as service } from '@ember/service';
import ENV                   from 'supabase-client/config/environment';

export default class ApplicationAdapter extends RESTAdapter {
  @service session;

  namespace = 'rest/v1';
  host      = ENV.SUPABASE_BASE_URL;
  apiKey    = ENV.SUPABASE_KEY;

  get headers() {
    if (this.session.isAuthenticated) {
      return {
        apikey: this.apiKey,
        Authorization: `Bearer ${this.session.data.authenticated.access_token}`,
        'Content-Type': 'application/json',
        prefer: 'return=representation',
      };
    } else {
      return {
        apikey: this.apiKey,
        Authorization: `Bearer ${ENV.supabaseKey}`,
        'Content-Type': 'application/json',
        prefer: 'return=representation',
      };
    }
  }

  urlForFindAll() {
    return `${super.urlForFindAll(...arguments)}?select=*`;
     // let baseUrl = this.buildURL(modelName);
     // return `${baseUrl}?select=*`;
  }

  urlForFindRecord(id) {
    return `${this.super.urlForFindRecord(...arguments)}?select=*&id=eq.${id}`;
     // return `${this.urlForFindAll(modelName)}?select=*&id=eq.${id}`;
   }

   // urlForCreateRecord(modelName) {
   //   return this.buildURL(modelName);
   // }

  urlForUpdateRecord(id) {
    return `${super.urlForUpdateRecord(...arguments)}?id=eq.${id}`;
     // return `${this.buildURL(modelName)}?id=eq.${id}`;
   }

  urlForDeleteRecord(id) {
    return `${super.urlForDeleteRecord(...arguments)}?id=eq.${id}`;
     // return `${this.buildURL(modelName)}?id=eq.${id}`;
   }

  handleResponse(status) {
    if (status === 401 && this.session.isAuthenticated) {
      // this.session.invalidate();
    }

    return super.handleResponse(...arguments);
  }

}
