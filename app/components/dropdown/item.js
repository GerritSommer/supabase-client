import Component  from '@glimmer/component';
import { isArray } from '@ember/array';

export default class DropdownItemComponent extends Component {

  baseClass     = 'flex justify-between w-full text-left px-4 py-2';
  defaultClass  = 'text-sm leading-5 text-gray-700 hover:text-blue-800 hover:bg-gray-100';
  disabledClass = 'cursor-not-allowed opacity-50'

  get models() {
    if (this.args.model)
      return [ this.args.model ];

    if (isArray(this.args.models))
      return this.args.models;

    return [];
  }

  get class() {
    const result = [ this.baseClass ]
    result.push(this.defaultClass);

    if (this.args.disabled)
      result.push(this.disabledClass);

    return result.join(' ');
  }

}
