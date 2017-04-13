cordova.define("cordova-plugin-getuisdk.GeTuiSdkPlugin", function(require, exports, module) { 
var exec = require('cordova/exec');
var argscheck = require('cordova/argscheck');
var callback_impl;

var GeTuiSdkPlugin = {
	SetTagStatus : {
		success : 0,// 设置标签成功
		error_count : 20001,// 设置标签数量过大
		error_freqency : 20002,// 设置标签失败，频率过快
		error_repeat : 20003,// 设置标签失败，标签重复
		error_unbind : 20004,// 设置标签失败，aidl服务未绑定
		error_exception : 20005,// 设置标签失败，setTag异常
		error_empty : 20006
	// SETTAG_ERROR_NULL : tag为空
	},

	callback_init : function(obj) {
		argscheck.checkArgs('F', 'GeTuiSdkPlugin.callback_init', arguments);
		callback_impl = obj;
	},

	callback_data : function(type, data) {
		argscheck.checkArgs('SS', 'GeTuiSdkPlugin.callback_init', arguments);
		if (callback_impl != null) {
			callback_impl(type, data);
		}
	},

	// sdk 初始化
	initialize : function(appid) {
		argscheck.checkArgs('S', 'GeTuiSdkPlugin.initialize', arguments);
		exec(null, null, 'GeTuiSdkPlugin', 'initialize', [ appid ]);
	},

	// 获取当前sdk版本号
	getVersion : function(callback) {
		argscheck.checkArgs('F', 'GeTuiSdkPlugin.getVersion', arguments);
		exec(callback, null, 'GeTuiSdkPlugin', 'getVersion', []);
	},

	// 为当前用户设置一组标签，后续推送可以指定标签名进行定向推送。
	setTag : function(callback, tags) {
		argscheck.checkArgs('FS', 'GeTuiSdkPlugin.setTag', arguments);
		exec(callback, null, 'GeTuiSdkPlugin', 'setTag', [ tags ]);
	},

	// 接口 PushManager 中的 setSilentTime，设置静默时间，静默期间SDK将不再联网。
	setSilentTime : function(callback, beginHour, duration) {
		argscheck.checkArgs('FNN', 'GeTuiSdkPlugin.setSilentTime', arguments);
		exec(callback, null, 'GeTuiSdkPlugin', 'setSilentTime', [ beginHour,
				duration ]);
	},

	// 接口 PushManager 中的 stopService,接口 PushManager 中的, 停止SDK服务, 服务不会终止运行,
	// 只是终止推送和联网功能。
	stopService : function() {
		exec(null, null, 'GeTuiSdkPlugin', 'stopService', []);
	},

	// 接口 PushManager 中的 isPushTurnedOn, 获取当前SDK的服务状态。
	isPushTurnedOn : function(callback) {
		exec(callback, null, 'GeTuiSdkPlugin', 'isPushTurnedOn', []);
	},

	// 接口 PushManager 中的 turnOnPush, 开启Push推送, 默认是开启状态, 关闭状态则收不到推送。turnOnPush
	// 默认打开。
	turnOnPush : function() {
		exec(null, null, 'GeTuiSdkPlugin', 'turnOnPush', []);
	},

	// 接口 PushManager 中的 turnOffPush, 关闭Push推送, 关闭后则无法收到推送消息。
	turnOffPush : function() {
		exec(null, null, 'GeTuiSdkPlugin', 'turnOffPush', []);
		callback_impl = obj;
	},

	// 接口 PushManager 中的 sendFeedbackMessage, 上行第三方自定义回执actionid。
	sendFeebackMessage : function(callback, taskid, messageid, actionid) {
		argscheck.checkArgs('FSSN', 'GeTuiSdkPlugin.sendFeebackMessage',
				arguments);
		exec(callback, null, 'GeTuiSdkPlugin', 'sendFeebackMessage', [ taskid,
				messageid, actionid ]);
	},

	// 接口 PushManager 中的 getClientid, 获取当前用户的clientid。
	getClientId : function(callback) {
		argscheck.checkArgs('F', 'GeTuiSdkPlugin.getClientId', arguments);
		exec(callback, null, 'GeTuiSdkPlugin', 'getClientId', []);
	},

	// 接口 PushManager 中的 bindAlias, 绑定别名
	bindAlias : function(callback, alias) {
		argscheck.checkArgs('FS', 'GeTuiSdkPlugin.bindAlias', arguments);
		exec(callback, null, 'GeTuiSdkPlugin', 'bindAlias', [ alias ]);
	},
	// 接口 PushManager 中的 unBindAlias, 解绑定所有cid绑定此别名。
	unAllBindAlias : function(callback, alias) {
		argscheck.checkArgs('FS', 'GeTuiSdkPlugin.unAllBindAlias', arguments);
		exec(callback, null, 'GeTuiSdkPlugin', 'unAllBindAlias', [ alias ]);
	},

	// 接口 PushManager 中的 unBindAlias, 解绑定当前cid绑定此别名。
	unSelfBindAlias : function(callback, alias) {
		argscheck.checkArgs('FS', 'GeTuiSdkPlugin.unSelfBindAlias', arguments);
		exec(callback, null, 'GeTuiSdkPlugin', 'unSelfBindAlias', [ alias ]);
	}
	
	notifaction: function(appkey, appid, cid, mast) {
		argscheck.checkArgs('SSSS', 'GeTuiSdkPlugin.notifaction', arguments);
		exec(null, null, 'GeTuiSdkPlugin', 'notifaction', [appkey, appid, cid, mast]);
	}
	
	transmission: function(appkey, appid, cid, mast) {
		argscheck.checkArgs('SSSS', 'GeTuiSdkPlugin.transmission', arguments);
		exec(null, null, 'GeTuiSdkPlugin', 'transmission', [appkey, appid, cid, mast]);
	}
};

module.exports = GeTuiSdkPlugin;

});
