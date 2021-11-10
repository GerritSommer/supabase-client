// import Serializer         from '@ember-data/serializer';
import RESTSerializer        from '@ember-data/serializer/rest';
import { inject as service } from '@ember/service';
import { underscore }        from '@ember/string';
import { pluralize }         from 'ember-inflector';

export default class ApplicationSerializer extends RESTSerializer {
  @service session;

  keyForAttribute(attr) {
    return underscore(attr);
  }

  keyForRelationship(key) {
    return underscore(key);
  }

  /*
    Add the resourceName, as the api doesn't send one (see app/serializers/application.js)
    before: { data: { id: 1, ... } }
    after:  { user: { id: 1, ... } }
  */
  normalizeSingleResponse(store, primaryModelClass, payload, id, requestType) {
    const modelName          = primaryModelClass.modelName;
    const payloadWithRootKey = {}

    if (payload.meta) {
      payloadWithRootKey['meta'] = payload.meta;
      delete payload.meta;
    }

    if (payload) {
      payloadWithRootKey[modelName] = payload;
    }

    return super.normalizeSingleResponse(store, primaryModelClass, payloadWithRootKey, id, requestType);
  }

  /*
    Add a rootKey as the api doesnt send one (see app/serializers/application.js)
    before: { data:  [ { id: 1, ... }, {} ] }
    after:  { users: [ { id: 1, ... }, {} ] }
  */
  normalizeArrayResponse(store, primaryModelClass, payload, id, requestType) {
    const modelName          = pluralize(primaryModelClass.modelName);
    const payloadWithRootKey = {}

    if (payload.meta) {
      payloadWithRootKey['meta'] = payload.meta;
      delete payload.meta;
    }

    if (payload) {
      payloadWithRootKey[modelName] = payload;
    }

    return super.normalizeArrayResponse(store, primaryModelClass, payloadWithRootKey, id, requestType);
  }

  /*
    Remove the default rootKey
    before: { user: { id: 1, ... } }
    after:  { id: 1, ... }
  */
  serializeIntoHash(hash, typeClass, snapshot, options) {
    const serialized = this.serialize(snapshot, options);

    for (let key in serialized) {
      hash[key] = serialized[key];
    }
  }



  // normalizeResponse(store, primaryModelClass, payload, id, requestType) {
  //   return super.normalizeResponse(...arguments);
    // if (requestType === 'findRecord') {
    //   return this.normalize(primaryModelClass, payload.firstObject);
    // } else if (requestType === 'createRecord') {
    //   return this.normalize(primaryModelClass, payload.firstObject);
    // } else if (requestType === 'query' || requestType === 'findAll') {
    //   return payload.reduce(
    //     (documentHash, item) => {
    //       let { data, included } = this.normalize(primaryModelClass, item);
    //       documentHash.included.push(...included);
    //       documentHash.data.push(data);
    //       return documentHash;
    //     },
    //     { data: [], included: [] }
    //   );
    // } else {
    //   return payload.reduce(
    //     (documentHash, item) => {
    //       let { data, included } = this.normalize(primaryModelClass, item);
    //       documentHash.included.push(...included);
    //       documentHash.data.push(data);
    //       return documentHash;
    //     },
    //     { data: [], included: [] }
    //   );
    // }
  // }

  // serialize(snapshot) {
  //   let json = {
  //     id: snapshot.id,
  //   };

  //   snapshot.eachAttribute((key) => {
  //     json[underscore(key)] = snapshot.attr(key);
  //   });

  //   snapshot.eachRelationship((key, relationship) => {
  //     if (relationship.kind === 'belongsTo') {
  //       json[`${key}_id`] = snapshot.belongsTo(key, { id: true });
  //     } else if (relationship.kind === 'hasMany') {
  //       json[key] = snapshot.hasMany(key, { ids: true });
  //     }
  //   });

  //   json.user_id = this.session.data.authenticated.user.id;

  //   if (isEmpty(json.id)) {
  //     delete json.id;
  //   } else {
  //     json.id += '';
  //   }

  //   return json;
  // }

  // normalize(modelClass, resourceHash) {
  //   return super.normalize(...arguments);
    // const attributes = Object.keys(resourceHash).reduce((attrs, key) => {
    //   return { ...attrs, [camelize(key)]: resourceHash[key] };
    // }, {});

    // const relationships = Object.keys(resourceHash)
    //   .map((a) => a.match(/^([a-z]+)_id$/i))
    //   .reject(isEmpty)
    //   .map((a) => a[1])
    //   .reject((a) => isEmpty(resourceHash[`${a}_id`]))
    //   .reduce(
    //     (attrs, type) => ({
    //       ...attrs,
    //       [type]: {
    //         data: {
    //           id: resourceHash[`${type}_id`],
    //           type,
    //         },
    //       },
    //     }),
    //     {}
    //   );

    // const data = {
    //   id: '' + resourceHash.id,
    //   type: modelClass.modelName,
    //   attributes,
    //   relationships,
    // };

    // return { data, included: [] };
  // }
}
