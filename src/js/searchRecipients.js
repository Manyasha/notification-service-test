var $ = window.$ = window.jQuery = require('jquery');
require('bootstrap');
require('./plugins/magicsuggest');


const http = require('request-promise-json');
const Url = require('url');
const config = require('../../appConfig');
const limit = 100;

function searchRecipientsFixture(term) {
    const url = `${config.LOOKUP_SERVICE_URL}lookup?q=${term}&limit=${limit}`;


    return [{id: 1, email: 'email 1', extra_id: '123', name: 'login 1 (email 1)'},
        {email: 'email 2', extra_id: '232', name: 'login 2 (email 2)'},
        {id: 3, email: 'email 1', extra_id: '1233', name: 'login 3 (email 1)'},
        {id: 4, email: 'email 1', extra_id: '1234', name: 'login 4 (email 1)'},
        {id: 5, email: 'email 1', extra_id: '1235', name: 'login 5 (email 1)'}
        ]
}


function searchRecipients() {
    return lookupRecipients.apply(this, arguments);
    //return searchRecipientsFixture.apply(this, arguments);
}

function lookupRecipients(term) {
    return  $.getJSON('/search', {term: term}).then ( function(data) {
        return data; /// here should be some transformation between server response and application expectations
    });
}

function getMagicSuggestSettings() {
    return {
        allowFreeEntries: false,
        autoSelect: false,
        data: searchRecipients,
        expandOnFocus: true,
        hideTrigger: true,
        highlight: false,
        minChars: 1,
        noSuggestionText: 'No result matching the term {{query}}',
        placeholder: 'Enter email or login',
        selectionRenderer: item => `${item.extra_id} : ${item.email}`,
        sortOrder: 'user',
        valueField: 'extra_id',
        toggleOnClick: true,
        infoMsgCls: 'info-msg',
        required: true
    }
}

let renderSearchRecipients = $container => $container.magicSuggest(getMagicSuggestSettings());
export default renderSearchRecipients;
