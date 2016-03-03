var prototype = require('./prototype')
    , constant = require('./filter/constant')
    , module = require('./filter/module')
    , state = require('./filter/state');

/*exports.state = state;*/
exports.constant = constant.constant;
exports.state = state.state;
exports.module = module;