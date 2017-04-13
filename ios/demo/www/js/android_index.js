var KAppId = 'y9dDAq27RZ7l0FjmoNWPX3';
var KAppKey = 'NIyM21g4cF7Ah4LEwc3XwA';
var KAppSecret = 'g6rTHYlK3s5HNDDKRQQ1F4';
var KMasterSecret = 'xZn5x8E4IOApQrEpGafPa9';

var isonline = false;
var clientid = 'none';

function callback(type, data) {
	if(type == 'cid') {
		$('#clientid').text(data);
		clientid = data;
	} else if(type == 'pid') {
		//TODO pid
	} else if(type == 'payload') {
		$('#textlog').val($('#textlog').val() + data);
	} else if(type == 'online') {
		if(data == 'true') {
			isonline = true;
			$('#online').text('在线');
			$('#clientid').text(clientid);
		} else {
			isonline = false;
			$('#online').text('离线');
			$('#clientid').text('none');
		}
	}
};

var app = {

    initialize: function() {
        app.bindEvents();
    },

    bindEvents: function() {
        document.addEventListener('deviceready', app.onDeviceReady, false);
    },

    onDeviceReady: function() {
        StatusBar.styleDefault();

        $('#appkey').text(KAppKey);
        $('#appsecret').text(KAppSecret);
        $('#appid').text(KAppId);

        GeTuiSdkPlugin.callback_init(callback);
        GeTuiSdkPlugin.initialize(KAppId);
    },

    clearLog : function() {
    	$('#textlog').val('');
    },

    onOroffService : function() {
    	if (isonline == true) {
    		GeTuiSdkPlugin.stopService();
    		$('#stopservice').text('开启服务');
    	} else {
    		GeTuiSdkPlugin.initialize(KAppId);
    		$('#stopservice').text('停止服务');
    	}
    },

    transmission : function() {
    	GeTuiSdkPlugin.transmission(KAppKey, KAppId, clientid, KMasterSecret);
    },

    notifaction: function() {
    	GeTuiSdkPlugin.notifaction(KAppKey, KAppId, clientid, KMasterSecret);
	}
};
