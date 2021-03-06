container.get('view').add({
    selector: 'data-ls-echo',
    template: false,
    repeat: true,
    controller: function(element, expression, filter) {
        let def             = expression.parse(element.getAttribute('data-default') || '');
        let filterName      = element.getAttribute('data-filter') || '';
        let filterOptions   = JSON.parse(element.getAttribute('data-filter-options') || '{}');
        let result          = expression.parse(element.dataset['lsEcho']);

        result = result || def;

        if(filterName) {
            result = filter.apply(filterName, result);
        }

        if(
            element.tagName === 'INPUT' ||
            element.tagName === 'OPTION' ||
            element.tagName === 'SELECT' ||
            element.tagName === 'BUTTON' ||
            element.tagName === 'TEXTAREA'
        ) {
            let type = element.getAttribute('type');

            if ('radio' === type) {
                if (result.toString() === def) {
                    element.setAttribute('checked', 'checked');
                }
                else {
                    element.removeAttribute('checked');
                }
            }

            if('checkbox' === type) {
                if(def.includes(result.toString())) {
                    element.setAttribute('checked', 'checked');
                }
                else {
                    element.removeAttribute('checked');
                }
            }

            if (element.value !== result) {
                element.value = result;
            }

            element.dispatchEvent(new window.Event('change'));
        }
        else {
            if(element.innerText !== result) {
                element.innerHTML = result;
            }
        }
    }
});