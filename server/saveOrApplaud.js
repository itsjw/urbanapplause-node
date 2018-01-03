"use strict";
let db = require('./pghelper');
let escape = s => s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');





