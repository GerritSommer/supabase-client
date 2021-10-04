import Component  from '@glimmer/component';

export default class ControlsDropdownItemComponent extends Component {

  baseClass     = 'flex justify-between w-full text-left px-4 py-2';
  defaultClass  = 'text-sm leading-5 text-gray-700 hover:text-blue-800 hover:bg-gray-100';
  disabledClass = 'cursor-not-allowed opacity-50'

  get class() {
    const result = [ this.baseClass ]
    result.push(this.defaultClass);

    if (this.args.disabled)
      result.push(this.disabledClass);

    return result.join(' ');
  }

}
