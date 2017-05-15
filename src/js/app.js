import $ from 'jquery';
import renderSearchRecipients from './searchRecipients';

const config = require('../../appConfig');

const defaultIcon = "https://static.filmon.com/theme/img/filmon_logo_106.png";

$(() => {
    let $type = $('#type'),
        $messageDiv = $("#message-block"),
        $submit = $('#submit'),
        $recipientsContainer = $('#recipients-container'),
        $search = renderSearchRecipients($recipientsContainer.find('input')),
        messageTimer = null;

    showPayloads();
    markAsRequired();

    $type.change(() => {
        $('.error-msg').remove();
        $('#payload-container div:visible').hide();
        markAsNonRequired();
        $(config.relatedFields[$type.val()]).val('').removeClass('error').parent().show();
        markAsRequired();
    });

    $submit.click(() => {
        if ( !isValidForm() || !$search.isValid() ) {
            return;
        }
        let recipients = $search.getValue();
        let payload = {
            "type": $type.val()
        };
        $(config.relatedFields[$type.val()]).each((i, el) => payload[$(el).attr('id')] = $(el).val());

        const data = {recipients: recipients, payload: payload};
        sendNotification({data: JSON.stringify(data)});
    });

    function showPayloads() {
        $(config.relatedFields[$type.val()]).parent().show();
    }

    function markAsRequired() {
        $(config.requiredFields[$type.val()]).addClass('isRequired').parent().addClass('required');
    }

    function markAsNonRequired() {
        $('.isRequired').removeClass('isRequired').parent().removeClass('required');
    }

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

    function showMessage(msg, type) {
        $messageDiv.removeClass().addClass(`${type}-message`).show().html(msg);
        clearTimeout(messageTimer);
        messageTimer = setTimeout(function () {
            $messageDiv.html('').hide();
        }, 5000);
    }

    function isValidForm() {
        let isValid = true;
        $('.isRequired').filter(':visible').each((i, el) => {
            if ( $(el).val() ){
                return;
            }
            const msg = `${$(el).siblings('label').text()} is required`;
            appendError($(el), msg);
            isValid = false;
        });
        $('.isNum').filter(':visible').each((i, el) => {
            if ( /^[0-9]+$/.test($(el).val()) ){
                return;
            }
            const msg = `${$(el).prev('label').text()} must be numeric`;
            appendError($(el), msg);
            isValid = false;
        });
        return isValid;
    }

    function sendNotification(data) {
        $.ajax({
            url: "/send-notification",
            type: 'post',
            dataType: 'json',
            data: data,
            beforeSend: function () {
                $submit.prop('disabled', true);
                showMessage('Processing...please wait', 'info');
            }
        }).done(() => showMessage("Notification has been successfully sent", 'success')
        ).fail(error => {
            if( error.status === 202 ) {
                showMessage("Notification has been accepted", 'success')
            }
            showMessage('Internal server error', 'error');
            }
        ).always(() => $submit.prop('disabled', false));
    }
});