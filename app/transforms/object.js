import Transform from '@ember-data/serializer/transform';
import isObject  from 'supabase-client/utils/object/is-object';

export default class ObjectTransform extends Transform {
  deserialize(serialized) {
    return serialized || {};
  }

  serialize(deserialized) {
    return isObject(deserialized) ? deserialized : {};
  }
}
