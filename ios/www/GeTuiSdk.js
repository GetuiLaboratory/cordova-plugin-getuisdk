cordova.define("cordova-plugin-getuisdk.GeTuiSdk", function(require, exports, module) {
var exec = require('cordova/exec');
var	argscheck = require('cordova/argscheck');

var GeTuiSdk = {
    GeTuiSdkStatus: {
        KSdkStatusStarting: 0,
        KSdkStatusStarted: 1,
        KSdkStatusStoped: 2,
        KSdkStatusOffline: 3
    },

	startSdkWithAppId: function(appid, appKey, appSecret, launchingOptions) {
		argscheck.checkArgs('sss', 'GeTuiSdk.startSdkWithAppId', arguments);
		exec(null, null, 'GeTuiSdk', 'startSdkWithAppId', [appid, appKey, appSecret, launchingOptions]);
	},

	destroy: function() {
		exec(null, null, 'GeTuiSdk', 'destroy', []);
	},

    resume: function() {
        exec(null, null, 'GeTuiSdk', 'resume', []);
    },
    
    version: function(callback) {
        argscheck.checkArgs('f', 'GeTuiSdk.version', arguments);
        exec(callback, null, 'GeTuiSdk', 'version', []);
    },

    status: function(callback) {
        argscheck.checkArgs('f', 'GeTuiSdk.status', arguments);
        exec(callback, null, 'GeTuiSdk', 'status', []);
    },

    clientId: function(callback) {
        argscheck.checkArgs('f', 'GeTuiSdk.clientId', arguments);
        exec(callback, null, 'GeTuiSdk', 'clientId', []);
    },
    
	registerDeviceToken: function(deviceToken) {
		argscheck.checkArgs('s', 'GeTuiSdk.registerDeviceToken', arguments);
		exec(null, null, 'GeTuiSdk', 'registerDeviceToken', [deviceToken]);
	},
    
    registerDeviceTokenData: function(deviceToken) {
        argscheck.checkArgs('s', 'GeTuiSdk.registerDeviceTokenData', arguments);
        exec(null, null, 'GeTuiSdk', 'registerDeviceTokenData', [deviceToken]);
    },
    
    registerVoipToken: function(voipToken) {
        argscheck.checkArgs('s', 'GeTuiSdk.registerVoipToken', arguments);
        exec(null, null, 'GeTuiSdk', 'registerVoipToken', [deviceToken]);
    },
    
    registerVoipTokenCredentials: function(voipToken) {
        argscheck.checkArgs('s', 'GeTuiSdk.registerVoipTokenCredentials', arguments);
        exec(null, null, 'GeTuiSdk', 'registerVoipTokenCredentials', [deviceToken]);
    },
    
    setTags: function(callback, tags) {
        argscheck.checkArgs('fa', 'GeTuiSdk.setTags', arguments);
        exec(callback, null, 'GeTuiSdk', 'setTags', [tags]);
    },
    setTagsAndSequenceNum: function(callback, tags, aSn) {
        argscheck.checkArgs('fa', 'GeTuiSdk.setTagsAndSequenceNum', arguments);
        exec(callback, null, 'GeTuiSdk', 'setTagsAndSequenceNum', [tags, aSn]);
    },

    setBadge:function(badge) {
        argscheck.checkArgs('n', 'GeTuiSdk.setBadge', arguments)
        exec(null, null, 'GeTuiSdk', 'setBadge', [badge])
    },
           
    resetBadge:function() {
        exec(null, null, 'GeTuiSdk', 'resetBadge', [])
    },

    setChannelId: function(channelId) {
        argscheck.checkArgs('s', 'GeTuiSdk.setChannelId', arguments);
        exec(null, null, 'GeTuiSdk', 'setChannelId', [channelId]);
    },

	setPushModeOff: function() {
		exec(null, null, 'GeTuiSdk', 'setPushModeOff', []);
	},

	setPushModeOn: function() {
		exec(null, null, 'GeTuiSdk', 'setPushModeOn', []);
	},

	bindAlias: function(alias, sequenceNum) {
		argscheck.checkArgs('ss', 'GeTuiSdk.bindAlias', arguments);
		exec(null, null, 'GeTuiSdk', 'bindAlias', [alias, sequenceNum]);
	},

	unbindAlias: function(alias, sequenceNum) {
		argscheck.checkArgs('ss', 'GeTuiSdk.unbindAlias', arguments);
		exec(null, null, 'GeTuiSdk', 'unbindAlias', [alias, sequenceNum]);
	},
               
    handleRemoteNotification: function(userInfo) {
       argscheck.checkArgs('o', 'GeTuiSdk.handleRemoteNotification', arguments);
       exec(null, null, 'GeTuiSdk', 'handleRemoteNotification', [userInfo]);
    },
       
    handleVoipNotification: function(payload) {
        argscheck.checkArgs('o', 'GeTuiSdk.handleVoipNotification', arguments);
        exec(null, null, 'GeTuiSdk', 'handleVoipNotification', [payload]);
    },
    
    handleApplinkFeedback: function(webUrl) {
        argscheck.checkArgs('o', 'GeTuiSdk.handleApplinkFeedback', arguments);
        exec(null, null, 'GeTuiSdk', 'handleApplinkFeedback', [webUrl]);
    },
    
	sendMessage: function(successCallback, errorCallback, message) {
		argscheck.checkArgs('ffs', 'GeTuiSdk.sendMessage', arguments);
		exec(successCallback, errorCallback, 'GeTuiSdk', 'sendMessage', [message]);
	},

	sendFeedbackMessage: function(callback, actionId, taskId, msgId) {
		argscheck.checkArgs('fnss', 'GeTuiSdk.sendFeedbackMessage', arguments);
		exec(callback, null, 'GeTuiSdk', 'sendFeedbackMessage', [actionId, taskId, msgId]);
	},

	runBackgroundEnable: function(isEnable) {
		exec(successCallback, null, 'GeTuiSdk', 'runBackgroundEnable', []);
	},

	runBackgroundDisable: function(isEnable) {
		exec(successCallback, null, 'GeTuiSdk', 'runBackgroundDisable', []);
	},
    
    lbsLocationEnable: function(isEnable, isVerify) {
        argscheck.checkArgs('ffs', 'GeTuiSdk.lbsLocationEnable', arguments);
        exec(successCallback, null, 'GeTuiSdk', 'lbsLocationEnable', [isEnable, isVerify]);
    },
               
	clearAllNotificationForNotificationBar: function() {
		exec(null, null, 'GeTuiSdk', 'clearAllNotificationForNotificationBar', []);
	},
    
    setGeTuiSdkDidRegisterClientCallback: function(callback) {
        argscheck.checkArgs('f', 'GeTuiSdk.setGeTuiSdkDidRegisterClientCallback', arguments);
        exec(callback, null, 'GeTuiSdk', 'setGeTuiSdkDidRegisterClientCallback', []);
    },
    
    setGeTuiSDkDidNotifySdkStateCallback: function(callback) {
        argscheck.checkArgs('f', 'GeTuiSdk.setGeTuiSDkDidNotifySdkStateCallback', arguments);
        exec(callback, null, 'GeTuiSdk', 'setGeTuiSDkDidNotifySdkStateCallback', []);
    },
    
    setGeTuiSdkDidReceivePayloadCallback: function(callback) {
        argscheck.checkArgs('f', 'GeTuiSdk.setGeTuiSdkDidReceivePayloadCallback', arguments);
        exec(callback, null, 'GeTuiSdk', 'setGeTuiSdkDidReceivePayloadCallback', []);
    },

    setGeTuiSdkDidSendMessageCallback: function(callback) {
        argscheck.checkArgs('f', 'GeTuiSdk.setGeTuiSdkDidSendMessageCallback', arguments);
        exec(callback, null, 'GeTuiSdk', 'setGeTuiSdkDidSendMessageCallback', []);
    },

    setGeTuiSdkDidSetPushModeCallback: function(callback) {
        argscheck.checkArgs('f', 'GeTuiSdk.setGeTuiSdkDidSetPushModeCallback', arguments);
        exec(callback, null, 'GeTuiSdk', 'setGeTuiSdkDidSetPushModeCallback', []);
    },

    setGeTuiSdkDidAliasActionCallback:function(callback) {
        argscheck.checkArgs('f', 'GeTuiSdk.setGeTuiSdkDidAliasActionCallback', arguments);
        exec(callback, null, 'GeTuiSdk', 'setGeTuiSdkDidAliasActionCallback', []);
    },
    
    setGeTuiSdkDidTagsActionCallback:function(callback) {
        argscheck.checkArgs('f', 'GeTuiSdk.setGeTuiSdkDidTagsActionCallback', arguments);
        exec(callback, null, 'GeTuiSdk', 'setGeTuiSdkDidTagsActionCallback', []);
    },
    
    setGeTuiSdkDidQueryTagCallback:function(callback) {
        argscheck.checkArgs('f', 'GeTuiSdk.setGeTuiSdkDidQueryTagCallback', arguments);
        exec(callback, null, 'GeTuiSdk', 'setGeTuiSdkDidQueryTagCallback', []);
    },
    
    setGeTuiSdkDidOccurErrorCallback: function(callback) {
        argscheck.checkArgs('f', 'GeTuiSdk.setGeTuiSdkDidOccurErrorCallback', arguments);
        exec(callback, null, 'GeTuiSdk', 'setGeTuiSdkDidOccurErrorCallback', []);
    },

    setGeTuiSdkGrantAuthorizationCallback: function(callback) {
        argscheck.checkArgs('f', 'GeTuiSdk.setGeTuiSdkGrantAuthorizationCallback', arguments);
        exec(callback, null, 'GeTuiSdk', 'setGeTuiSdkGrantAuthorizationCallback', []);
    },

    setGetuiSdkWillPresentNotificationCallBack: function(callback) {
        argscheck.checkArgs('f', 'GeTuiSdk.setGetuiSdkWillPresentNotificationCallBack', arguments);
        exec(callback, null, 'GeTuiSdk', 'setGetuiSdkWillPresentNotificationCallBack', []);
    },


    setGeTuiSdkDidReceiveNotificationCallback: function(callback) {
        argscheck.checkArgs('f', 'GeTuiSdk.setGeTuiSdkDidReceiveNotificationCallback', arguments);
        exec(callback, null, 'GeTuiSdk', 'setGeTuiSdkDidReceiveNotificationCallback', []);
    },

    setGeTuiSdkDidReceiveSlienceCallback: function(callback) {
        argscheck.checkArgs('f', 'GeTuiSdk.setGeTuiSdkDidReceiveSlienceCallback', arguments);
        exec(callback, null, 'GeTuiSdk', 'setGeTuiSdkDidReceiveSlienceCallback', []);
    },

    setGeTuiSdkOpenSettingsForNotificationCallback: function(callback) {
        argscheck.checkArgs('f', 'GeTuiSdk.setGeTuiSdkOpenSettingsForNotificationCallback', arguments);
        exec(callback, null, 'GeTuiSdk', 'setGeTuiSdkOpenSettingsForNotificationCallback', []);
    },

    voipRegistrationWithVoipPushCallback: function(callback) {
		argscheck.checkArgs('f', 'GeTuiSdk.voipRegistrationWithVoipPushCallback', arguments);
		exec(callback, null, 'GeTuiSdk', 'voipRegistrationWithVoipPushCallback', []);
	},
};
module.exports = GeTuiSdk;

});
