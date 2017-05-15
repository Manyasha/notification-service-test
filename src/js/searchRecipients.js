const $ = window.$ = window.jQuery = require('jquery');
require('bootstrap');
require('./plugins/magicsuggest');

function lookupRecipients(event) {
    const term = $(event.target).val() + String.fromCharCode(event.keyCode);
    return  $.getJSON('/search', {term: term})
        .then ( data => this.setData(data) )
        .catch(() => this.setData([]));
}

function getMagicSuggestSettings() {
    return {
        allowFreeEntries: false,
        autoSelect: false,
        expandOnFocus: true,
        hideTrigger: true,
        highlight: false,
        minChars: 1,
        noSuggestionText: 'No result matching the term {{query}}',
        placeholder: 'Enter email or login',
        renderer: item => `${item.login} (${item.email})`,
        selectionRenderer: item => `${item.extra_id} : ${item.email}`,
        valueField: 'extra_id',
        toggleOnClick: true,
        infoMsgCls: 'info-msg',
        required: true
    }
}

let renderSearchRecipients = $container => {
    let recipientsSuggest = $container.magicSuggest(getMagicSuggestSettings());
    $(document).on('keypress', `#${$container.attr('id')}`, lookupRecipients.bind(recipientsSuggest));
    return recipientsSuggest;
};
export default renderSearchRecipients;
