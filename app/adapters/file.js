import ApplicationAdapter from './application';

export default class FileAdapter extends ApplicationAdapter {
  namespace = 'storage/v1/object/list';

  urlForQuery({ path }) {
    return `${this.host}/${this.namespace}/${path}`;
  }

  query(store, type, { path, limit=100, offset=0, sortBy={ column: 'name', order: 'asc' }, prefix='' }) {
    const url  = this.urlForQuery({ path });
    const body = { limit, offset, sortBy, prefix };

    return this.ajax(url, 'POST', { data: body });
  }

}

