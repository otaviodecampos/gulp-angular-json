var es = require('event-stream')
    , _ = require('lodash')
    , fs = require('fs')
    , path = require('path');

function _nominator(filename) {
    filename = filename.replace('.constant.json', '');
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

function constant(options) {

    if (!options) options = {};

    var template = options.template || path.resolve(__dirname, 'tpl/constant.ejs')
        , matcher = options.matcher || /[\w-]+.constant.json$/g
        , nominator = options.nominator || _nominator
        , parser = options.parser || _parser
        , automodule = options.automodule != undefined ? options.automodule : true;

    return es.map(function (file, cb) {

        var match = file.relative.match(matcher)
            , params = {}
            , $constant
            , _template;

        if (match) {
            params.name = nominator(match[0]);

            if (file.isNull()) {
                params.contents = {};
            } else {
                if (automodule) {
                    params.module = findRecursiveModuleName(file.path);
                }

                params.contents = JSON.parse(file.contents, parser);
                $constant = params.contents.$constant;

                if ($constant) {
                    if ($constant.$module) params.module = $constant.$module;
                    if ($constant.$name) params.name = $constant.$name;
                    delete params.contents.$constant;
                }
            }

            _template = _.template(fs.readFileSync(template, 'utf8'));
            file.contents = new Buffer(_template(params), 'utf8');
        }

        return cb(null, file);

    });
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

module.exports = constant;