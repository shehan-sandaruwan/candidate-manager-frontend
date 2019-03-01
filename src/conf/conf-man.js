/**
 * Created by sumith on 2/20/17.
 */

const convict = require('convict');
const {isEmpty, isUUID, matches, isInt, isURL} = require('validator');

// Regular expression validation
function checkRegEx(val, regex, msg) {
  let strVal = (val || '') + '';

  if (!matches(strVal, regex)) {
    throw new Error(msg);
  }
}

// Add new format for non empty string
convict.addFormats({
  'no-empty-string': {
    validate: function(val) {
      let strVal = (val || '') + '';

      if (isEmpty(strVal)) {
        throw new Error('must not be empty');
      }
    },

    coerce: function(val){
      return val + '';
    }
  },

  'uuid': {
    validate: function(val) {
      if (!isUUID(val)) {
        throw new Error('must be in UUID format');
      }
    }
  },

  'cake-subdomain': {
    validate: function(val) {
      checkRegEx( val, /^.*?cake\.net\s*$/i, 'must end with cake.net' );
    }
  },

  'uppercase-underscore': {
    validate: function(val) {
      checkRegEx( val, /^[A-Z]+(_[A-Z]+)*$/, 'can only contain upper case text separated by underscores' );
    }
  },

  'api-key':{
    validate: function(val){
      checkRegEx( val, /^[0-9a-f]+$/i, 'can only contain digits and letters A to F case insensitive' );
    }
  }
});


module.exports = convict;
