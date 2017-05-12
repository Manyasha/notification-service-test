import $ from 'jquery';
import renderSearchRecipients from './searchRecipients';

const config = require('../../appConfig');

const relations = {
    FILMON_INFO: '#title, #description, #icon, #url',
    DVR_RECORDED: '#title, #description, #channelId, #channelTitle, #icon, #recordingId',
    ANDROID_APP_BUILT: '#url',
    ANDROID_APP_BUILD_FAILED: '#url',
    TVGUIDE_REMINDER: '#title, #description, #channelId, #channelTitle, #icon, #interval, #startTimeMs, #programmeId, #programmeDescription',
    LIVE_EVENT: '#title, #description, #channelId, #icon, #startTimeMs, #url'
};

const defaultIcon = "https://static.filmon.com/theme/img/filmon_logo_106.png";

$(() => {
    let $form = $("#js-notification-form"),
        $type = $('#type'),
        $successDiv = $("#success-message"),
        $recipientsContainer = $('#recipients-container'),
        $search = renderSearchRecipients($recipientsContainer.find('input'));

    $(relations[$type.val()]).parent().show();

    $type.change(() => {
        $('.error-msg').remove();
        $('#payload-container div:visible').hide();
        $(relations[$type.val()]).val('').removeClass('error').parent().show();
    });

    function appendError($el, msg) {
        const html = `<span class="error-msg">${msg}</span>`;
        $el.after(html)
           .addClass('error')
           .bind('focus', function () {
                $el.removeClass('error');
                $el.next('.error-msg').remove();
                $el.unbind('focus');
           });
    }

    function isValidForm() {
        let isValid = true;
        $('.isRequired').each((i, el) => {
            if ( $(el).val() ){
                return;
            }
            const msg = `${$(el).siblings('label').text()} is required`;
            appendError($(el), msg);
            isValid = false;
        });
        $('.isNum').each((i, el) => {
            if ( /^[0-9]+$/.test($(el).val()) ){
                return;
            }
            const msg = `${$(el).prev('label').text()} must be numeric`;
            appendError($(el), msg);
            isValid = false;
        });
        return isValid;
    }

    $('#submit').click(() => {
        if ( !isValidForm() || !$search.isValid() ) {
            return;
        }

        let recipients = $search.getValue();
        let payload = {
            "type": $type.val()
        };
        $(relations[$type.val()]).each((i, el) => payload[$(el).attr('id')] = $(el).val());

        let data = {recipients: recipients, payload: payload};
        window.console.log(data);
    });
});