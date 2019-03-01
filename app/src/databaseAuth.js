const Base64 = require('base-64');
const tok = 'user1:password1';
const hash = Base64.encode(tok);

export const Basic = 'Basic ' + hash;