import Model, { attr }       from '@ember-data/model';
import { inject as service } from '@ember/service';

export default class FileModel extends Model {
  @service store;

  @attr('string') name;
  @attr('date') updatedAt;
  @attr('date') createdAt;
  @attr('date') lastAccessedAt;

  // { "size": 33693, "mimetype": "image/jpeg", "cacheControl": "max-age=3600" }
  @attr('object', { defaultValue: ()=> Object.create({}) }) metadata;

  get mimetype() {
    return this.metadata.mimetype;
  }

  get type() {
    return MIMETYPES[this.mimetype] || null;
  }

  get size() {
    return this.metadata.size;
  }

  get url() {
    const host = this.store.adapterFor('file').host;
    return `${host}/storage/v1/object/public/public/${this.name}`;
  }
}

const MIMETYPES = Object.freeze({
  'application/msword':               'doc',
  'application/pdf':                  'pdf',
  'application/rtf':                  'rtf',
  'application/vnd.ms-excel':         'xls',
  'application/vnd.ms-powerpoint':    'ppt',
  'application/x-rar-compressed    ': 'rar',
  'application/zip':                  'zip',
  'audio/midi':                       'mid midi kar',
  'audio/mpeg':                       'mp3',
  'audio/mp3                       ': 'mp3',
  'audio/ogg':                        'ogg',
  'audio/x-m4a':                      'm4a',
  'audio/x-realaudio':                'ra',
  'image/gif':                        'gif',
  'image/jpeg':                       'jpeg jpg',
  'image/png':                        'png',
  'image/tiff':                       'tif tiff',
  'image/x-icon':                     'ico',
  'image/x-ms-bmp':                   'bmp',
  'image/svg+xml':                    'svg',
  'image/webp':                       'webp',
  'text/css':                         'css',
  'text/html':                        'html',
  'text/plain':                       'txt',
  'text/xml':                         'xml',
  'video/mp4':                        'mp4',
  'video/mpeg':                       'mpeg mpg',
  'video/quicktime':                  'mov',
  'video/webm':                       'webm',
  'video/x-flv':                      'flv',
  'video/x-msvideo':                  'avi'
});
