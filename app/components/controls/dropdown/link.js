import DropdownItemComponent from "supabase-client/components/controls/dropdown/item";
import { isArray }           from '@ember/array';

export default class ControlsDropdownLinkComponent extends DropdownItemComponent {
  get models() {
    if (this.args.model)
      return [ this.args.model ];

    if (isArray(this.args.models))
      return this.args.models;

    return [];
  }
}
