/**
 * Router
 *
 * Holds application states and match logic
 */
var router = function() {

    var states  = [],
        before  = function() {},
        after   = function() {}
    ;

    return {

        /**
         * State
         *
         * Adds a new application state.
         *
         * @param path string
         * @param view object
         * @returns router
         */
        state: function(path, view) {

            /**
             * Validation
             */
            if(typeof path !== 'string') {
                throw new Error('var path must be of type string');
            }

            if(typeof view !== 'object') {
                throw new Error('var view must be of type object');
            }

            states[states.length++] = {/* string */ path: path, /* object */ view: view};

            return this;
        },

        /**
         * Match
         *
         * Compare current location and application states to find a match.
         *
         * @param url string
         * @return value object|null
         */
        match: function(url) {
            for (var i = 0; i < states.length; i++) {
                var value   = states[i],
                    match   = new RegExp(value.path.replace(/:[^\s/]+/g, '([\\w-]+)'));

                if(url.match(match)) {
                    return value;
                }
            }

            return null
        }
    }

}();