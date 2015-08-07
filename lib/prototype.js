String.prototype.camelToDash = function (str) {
    if(str == undefined) {
        str = this;
    }
    return str.replace(/\W+/g, '-')
        .replace(/([a-z\d])([A-Z])/g, '$1-$2').toLowerCase();
}

String.prototype.dashToUnderline = function(str) {
    if(str == undefined) {
        str = this;
    }

    return str.replace('-', '_');
}

String.prototype.dashToCamel = function(str) {
    if(str == undefined) {
        str = this;
    }

    return str.replace(/\-+(.)/g, function (x, chr) {
        return chr.toUpperCase();
    });
}

module.exports = function() {

}