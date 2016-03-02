var es = require('event-stream')
    , _ = require('lodash')
    , fs = require('fs')
    , path = require('path');

module.exports = factory;

function factory(factoryOptions) {
    
    var encode = 'utf8'
        , templatePath = path.resolve(__dirname, factoryOptions.templatePath)
        , template = fs.readFileSync(templatePath, 'utf8')
        , matcher = new RegExp('[\w-]+.' + factoryOptions.extension + '$');
    
    var defaultOptions = {
        nominator: _nominator,
        parser: _parser,
        findModule: true
    }
    
    return function(options) {
        
        if(!options) {
            options = {};
        }
        
        _.merge(options, defaultOptions);
        
        return es.map(function (file, cb) {
            var match = file.relative.match(matcher)

            if (match && !file.isNull()) {
                var compiler 
                    , name = options.nominator(match[0])
                    , content = JSON.parse(file.contents, options.parser)
                    , params = factoryOptions.params(name, content);
                
                if (!params.module && options.findModule) {
                    params.module = findRecursiveModuleName(file.path);
                }

                compiler = _.template(fs.readFileSync(template, encode));
                file.contents = new Buffer(compiler(params), encode);
            }
    
            return cb(null, file);
        });
    }
}

function _nominator(filename, extension) {
    filename = filename.replace('.' + extension, '');
    return filename.dashToUnderline().toUpperCase();
}

function _parser(k, v) {
    var nk = k.dashToCamel();
    this[nk] = v;
    if (nk != k) {
        return undefined;
    }
    return v;
}

function findRecursiveModuleName(dirPath) {
    var currentPath = dirPath
        , name;

    while (!name) {
        currentPath = path.resolve(currentPath, '..')
        if (process.cwd() == currentPath) {
            break;
        }
        name = findModuleName(currentPath);
    }

    return name;

}

function findModuleName(dirPath) {
    var filePath
        , files = fs.readdirSync(path.dirname(dirPath));

    for (var i = 0, len = files.length; i < len; i++) {
        var fileName = files[i];
        if (fileName.indexOf('module.json') != -1) {
            var content = fs.readFileSync(path.resolve(path.dirname(dirPath), files[i]), "utf8");
            var obj = JSON.parse(content);
            if (obj.name) {
                filePath = obj.name;
                break;
            }
        }
    }

    return filePath;
}