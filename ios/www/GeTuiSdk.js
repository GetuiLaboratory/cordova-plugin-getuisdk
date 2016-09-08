var exec = require('cordova/exec');
var	argscheck = require('cordova/argscheck');

var GeTuiSdk = {
    GeTuiSdkStatus: {
        KSdkStatusStarting: 0,
        KSdkStatusStarted: 1,
        KSdkStatusStoped: 2
    },

	startSdkWithAppId: function(appid, appKey, appSecret) {
		argscheck.checkArgs('sss', 'GeTuiSdk.startSdkWithAppId', arguments);
		exec(null, null, 'GeTuiSdk', 'startSdkWithAppId', [appid, appKey, appSecret]);
	},

	destroy: function() {
		exec(null, null, 'GeTuiSdk', 'destroy', []);
	},

	registerDeviceToken: function(deviceToken) {
		argscheck.checkArgs('s', 'GeTuiSdk.registerDeviceToken', arguments);
		exec(null, null, 'GeTuiSdk', 'registerDeviceToken', [deviceToken]);
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

	setTags: function(callback, tags) {
		argscheck.checkArgs('fa', 'GeTuiSdk.setTags', arguments);
		exec(callback, null, 'GeTuiSdk', 'setTags', [tags]);
	},
               
   setChannelId: function(channelId) {
       argscheck.checkArgs('s', 'GeTuiSdk.setChannelId', arguments);
       exec(null, null, 'GeTuiSdk', 'setChannelId', [channelId]);
   },
               
   handleRemoteNotification: function(userInfo) {
       argscheck.checkArgs('o', 'GeTuiSdk.handleRemoteNotification', arguments);
       exec(null, null, 'GeTuiSdk', 'handleRemoteNotification', [userInfo]);
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
               
    setBadge:function(badge) {
        argscheck.checkArgs('n', 'GeTuiSdk.setBadge', arguments)
        exec(null, null, 'GeTuiSdk', 'setBadge', [badge])
    },
               
    resetBadge:function() {
        exec(null, null, 'GeTuiSdk', 'resetBadge', [])
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

	clearAllNotificationForNotificationBar: function() {
		exec(null, null, 'GeTuiSdk', 'clearAllNotificationForNotificationBar', []);
	},

    setGeTuiSdkDidRegisterClientCallback: function(callback) {
        argscheck.checkArgs('f', 'GeTuiSdk.setGeTuiSdkDidRegisterClientCallback', arguments);
        exec(callback, null, 'GeTuiSdk', 'setGeTuiSdkDidRegisterClientCallback', []);
    },

    setGeTuiSdkDidReceivePayloadCallback: function(callback) {
        argscheck.checkArgs('f', 'GeTuiSdk.setGeTuiSdkDidReceivePayloadCallback', arguments);
        exec(callback, null, 'GeTuiSdk', 'setGeTuiSdkDidReceivePayloadCallback', []);
    },

    setGeTuiSdkDidSendMessageCallback: function(callback) {
        argscheck.checkArgs('f', 'GeTuiSdk.setGeTuiSdkDidSendMessageCallback', arguments);
        exec(callback, null, 'GeTuiSdk', 'setGeTuiSdkDidSendMessageCallback', []);
    },

    setGeTuiSdkDidOccurErrorCallback: function(callback) {
        argscheck.checkArgs('f', 'GeTuiSdk.setGeTuiSdkDidOccurErrorCallback', arguments);
        exec(null, callback, 'GeTuiSdk', 'setGeTuiSdkDidOccurErrorCallback', []);
    },

    setGeTuiSDkDidNotifySdkStateCallback: function(callback) {
        argscheck.checkArgs('f', 'GeTuiSdk.setGeTuiSDkDidNotifySdkStateCallback', arguments);
        exec(callback, null, 'GeTuiSdk', 'setGeTuiSDkDidNotifySdkStateCallback', []);
    },

    setGeTuiSdkDidSetPushModeCallback: function(callback) {
        argscheck.checkArgs('f', 'GeTuiSdk.setGeTuiSdkDidSetPushModeCallback', arguments);
        exec(callback, null, 'GeTuiSdk', 'setGeTuiSdkDidSetPushModeCallback', []);
    },

   setGeTuiSdkDidAliasActionCallback:function(callback) {
       argscheck.checkArgs('f', 'GeTuiSdk.setGeTuiSdkDidAliasActionCallback', arguments);
       exec(callback, null, 'GeTuiSdk', 'setGeTuiSdkDidAliasActionCallback', []);
   }
};
module.exports = GeTuiSdk;
