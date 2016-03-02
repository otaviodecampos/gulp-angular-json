var factory = require('./componentFactory');

var options = {
    extension: 'constant.json',
    templatePath: 'tpl/constant.ejs',
    params: function(name, fileContent) {
        var params = {}
            , constant = fileContent.$constant
        
        params.name = name;
        
        if (constant) {
            if (constant.$module) {
                params.module = constant.$module;    
            }
            
            if (constant.$name) {
                params.name = constant.$name;   
            }
            
            delete fileContent.$constant;
        }
        
        params.content = fileContent;
        return params;
    }
}

exports.constant = componentFactory(options);