import EmberDataStoreService from '@ember-data/store';
import { inject as service } from '@ember/service';
import { assign }            from '@ember/polyfills';
import { getProperties }     from '@ember/object';
import { assert }            from '@ember/debug';
import fetch                 from 'fetch';
import isObject              from 'supabase-client/utils/object/is-object';

function validateResponse(response={}) {
  return [ 304, 200, 201, 203, 204, 206 ].includes(response.status) && response.ok;
}

/**
 * @param  {Object} params
 * @return {String} '?prop=value'
 */
function stringifyParams(params) {
  if (isObject(params)) {
    return `?${new URLSearchParams(params)}`;
  } else {
    return '';
  }
}
/**
 * @param  {Object} body
 * @return {String} '{"prop":"value"}'
 */
function stringifyBody(body) {
  if (isObject(body)) {
    return JSON.stringify(body);
  } else {
    return {};
  }
}

export default class StoreService extends EmberDataStoreService {
  @service session;

  get applicationAdapter() {
    return this.adapterFor('application');
  }

  /**
   * @param  {string} path
   * @param  {Object} options { [params], [body], [method], [namespace] }
   * @return RSPVP.Promise
   */
  fetch(path, options={}) {
    assert('The path parameter is missing', (path && typeof path === 'string'));
    const fetchOptions        = this.buildFetchOptions(options);
    const fetchURL            = this.buildFetchURL(path, options);

    return new Promise((resolve, reject)=> {
      fetch(fetchURL, fetchOptions)
        .then((response)=> {
          if (response.status === 401 && this.session.isAuthenticated) {
            this.session.invalidate();
          }
          const isSuccess = validateResponse(response);
          response
            .json()
            .then((json)=> {
              isSuccess ? resolve(json) : reject(json);
            });

        });
    });

  }

  /**
   * @param  {Object} options { headers, namespace, method }
   * @return {Object} { namespace, headers, options, [ body ] }
   */
  buildFetchOptions(options={}) {
    const { headers }  = this.applicationAdapter;
    const fetchOptions = {
      headers: options.headers || headers,
      method:  (options.method  || 'GET').toUpperCase()
    };

    if (/PUT|POST|PATCH/.test(fetchOptions.method) && options.body) {
      fetchOptions['body'] = stringifyBody(options.body);
    }

    return fetchOptions;
  }

  /**
   * @param  {String} path
   * @param  {Object} options { [method], [params] }
   * @return {String} 'https://my-subdomain.supabase.io/v1/rest/users/1?me=true'
   */
  buildFetchURL(path='', options) {
    const params                                = stringifyParams(options.params);
    const { host, namespace: defaultNamespace } = this.applicationAdapter;
    const namespace                             = options.namespace || defaultNamespace;

    const url = [ host, namespace, path ].filter(Boolean).join('/');
    return url + params;
  }

}
