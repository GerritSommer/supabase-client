import { helper } from '@ember/component/helper';
import filesize   from 'filesize';

export default helper(function formatFilesize([ value ]/*, hash*/) {
  return Number.isInteger(value) ? filesize(Math.max(0, value)) : 0;
});
