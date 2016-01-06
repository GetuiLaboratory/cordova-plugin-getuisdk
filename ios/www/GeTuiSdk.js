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

	retrievePayloadById: function(callback, payloadId) {
		argscheck.checkArgs('fs', 'GeTuiSdk.retrievePayloadById', arguments);
		exec(callback, null, 'GeTuiSdk', 'retrievePayloadById', [payloadId]);
	},

	setPushModeOff: function() {
		exec(null, null, 'GeTuiSdk', 'setPushModeOff', []);
	},

	setPushModeOn: function() {
		exec(null, null, 'GeTuiSdk', 'setPushModeOn', []);
	},

	bindAlias: function(alias) {
		argscheck.checkArgs('s', 'GeTuiSdk.bindAlias', arguments);
		exec(null, null, 'GeTuiSdk', 'bindAlias', [alias]);
	},

	unbindAlias: function(alias) {
		argscheck.checkArgs('s', 'GeTuiSdk.unbindAlias', arguments);
		exec(null, null, 'GeTuiSdk', 'unbindAlias', [alias]);
	},

	setTags: function(callback, tags) {
		argscheck.checkArgs('fa', 'GeTuiSdk.setTags', arguments);
		exec(callback, null, 'GeTuiSdk', 'setTags', [tags]);
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

	setAllowedRotateUiOrientations: function(orientations) {
		argscheck.checkArgs('a', 'GeTuiSdk.setAllowedRotateUiOrientations', arguments);
		exec(null, null, 'GeTuiSdk', 'setAllowedRotateUiOrientations', [orientations]);
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
    }

};

module.exports = GeTuiSdk;