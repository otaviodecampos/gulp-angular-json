var factory = require('./componentFactory');

var options = {
    extension: 'state.json',
    templatePath: 'tpl/state.ejs',
    params: function(name, fileContent) {
        var params = {};
        
        params.name = fileContent.name;
        params.content = fileContent;
        delete fileContent.name;
        
        return params;
    }
}

exports.state = componentFactory(options);