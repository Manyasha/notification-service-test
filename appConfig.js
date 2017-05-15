module.exports = {
    LOOKUP_SERVICE_URL : process.env.LOOKUP_SERVICE_URL || 'http://localhost:8082/users/',
    NOTIFICATIONS_SERVICE_URL : process.env.NOTIFICATIONS_SERVICE_URL || 'http://localhost:8104/',

    relatedFields: {
        FILMON_INFO: '#title, #description, #icon, #url',
        DVR_RECORDED: '#title, #description, #channelId, #channelTitle, #programmeTitle, #programmeDescription, #icon, #posterURL, #recordingId',
        ANDROID_APP_BUILT: '#icon, #title, #description, #url',
        ANDROID_APP_BUILD_FAILED: '#icon, #title, #description, #url',
        TVGUIDE_REMINDER: '#title, #description, #channelId, #channelTitle, #icon, #posterURL, #interval, #startTimeMs, #programmeId, #programmeDescription, #url, #programmeTitle',
        LIVE_EVENT: '#title, #description, #channelId, #icon, #startTimeMs, #url'
    },
    requiredFields: {
        FILMON_INFO: '#title, #description',
        DVR_RECORDED: '#title, #description, #programmeTitle, #recordingId',
        ANDROID_APP_BUILT: '#title, #url',
        ANDROID_APP_BUILD_FAILED: '#title, #url',
        TVGUIDE_REMINDER: '#title, #channelId, #programmeDescription, #programmeTitle',
        LIVE_EVENT: '#title, #description, #url'
    }
};