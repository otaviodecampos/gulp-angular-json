var fs = require('fs')
    , _ = require('lodash')
    , es = require('event-stream')
    , path = require('path');

function register(module, modules, skips) {

    var name = module.name
        , parent = module.parent
        , deps;

    if (parent && modules[parent] || parent == undefined) {
        modules[name] = module;
        if (parent) {
            deps = modules[parent].dependencies || [];
            if (deps.indexOf(name) == -1) {
                deps.push(name);
            }
        }
        delete skips[name];
    } else {
        skips[name] = module;
    }

}

function Module(file) {
    var contents = file.isNull() ? {} : JSON.parse(file.contents);

    this.name = contents.name;
    this.parent = contents.parent;
    this.dependencies = contents.dependencies;
    this.file = file;

    this.compile = function (template) {
        this.file.contents = new Buffer(template(this), 'utf8');
    }
}

function modules(options) {

    if (!options) options = {};

    var templatePath = options.template || path.resolve(__dirname, 'tpl/module.ejs')
        , template = _.template(fs.readFileSync(templatePath, 'utf8'))
        , matcher = options.matcher || /[\w-]+.module.json$/g
        , modules = {}
        , skips = {}
        , others = [];

    return es.through(function (file) {
        var match = file.relative.match(matcher);

        if (match) {
            register(new Module(file), modules, skips);
        } else {
            others.push(file);
        }

    }, function () {
        var _this = this;

        while (Object.keys(skips).length) {
            var names = Object.keys(skips);
            names.forEach(function (name) {
                register(skips[name]);
            });
        }

        Object.keys(modules)
            .forEach(function (name) {
                var module = modules[name];
                module.compile(template);
                _this.emit('data', module.file);
            });

        others.forEach(function (file) {
            _this.emit('data', file);
        });

        this.emit('end');
    });

}

module.exports = modules;