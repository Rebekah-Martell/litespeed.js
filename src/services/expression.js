/**
 * View
 *
 * Manage application scopes and different views
 */
container.set('expression', function(container, filter) {
    var reg = /(\{{.*?\}})/gi;

    return {

        /**
         * @param string string
         * @param def string
         * @returns {string}
         */
        parse: function(string, def) {
            def = def || '';

            return string.replace(reg, function(match)
                {
                    var reference = match.substring(2, match.length -2)
                        .replace('[\'', '.')  // Make syntax consistent using only dot nesting
                        .replace('\']', '')  // Make syntax consistent using only dot nesting
                        .trim() // Clear whitespaces
                    ;

                    reference = reference.split('|');

                    var path = (reference[0] || '');
                    var filterName = (reference[1] || '');
                    var result = container.path(path);

                    result = (null === result || undefined === result) ? def : result;

                    result = (typeof result === 'object') ? JSON.stringify(result) : result;

                    if(filterName) {
                        result = filter.apply(result, filterName, {});
                    }

                    return result;
                }
            );
        }
    }
}, true);