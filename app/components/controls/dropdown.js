import Component   from '@glimmer/component';
import { action }  from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ControlsDropdownComponent extends Component {
  @tracked isOpen = false;

  @action
  onClickOutside() {
    if (this.isOpen) {
      this.isOpen = false;
    }
  }

  @action
  toggle() {
    this.isOpen = !this.isOpen;
  }

  @action
  close() {
    this.isOpen = false;
  }

}

