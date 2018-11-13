container.set('cookie', function(document) {

    function get(name) {
        var value = "; " + document.cookie,
            parts = value.split("; " + name + "=");

        if (parts.length === 2) {
            return parts.pop().split(";").shift();
        }
    }

    function set(name, value, days) {
        var date = new Date();

        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));

        var expires = (0 < days ) ? 'expires=' + date.toUTCString() : 'expires=0';

        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

    return {
        'get': get,
        'set': set
    }
}, true);