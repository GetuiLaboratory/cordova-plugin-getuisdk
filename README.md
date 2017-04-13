# cordova-plugin-getuisdk
##安装cordova环境
* 安装cordova
```
npm install -g cordova
```
* 安装 plugman
```
npm install -g plugman
```
* 创建 cordova 工程
```
cordova create 目录名 应用包名 工程名
```
* 使用 cordova 命令方式添加插件

	其中 PUSH_APPID、PUSH_APPKEY、PUSH_APPSECRET 为 Android 所需参数。如果只用到 iOS，则直接拷贝下列命令运行，否则添加失败。

````
cordova plugin add cordova-plugin-getuisdk --variable PUSH_APPID=你的appid --variable PUSH_APPKEY=你的appkey --variable PUSH_APPSECRET=你的appsecret
````
## Android平台支持
* 添加android平台
```
cordova platform add android
```
* 添加个推推送
```
// plugman 集成方式，若已使用 cordova 命令集成则可略过。
plugman install --platform android --project android平台目录 --plugin https://github.com/GetuiLaboratory/cordova-plugin-getuisdk --plugins_dir 你的插件目录 --variable PUSH_APPID=你的appid --variable PUSH_APPKEY=你的appkey --variable PUSH_APPSECRET=你的appsecret
```
* 安装之后需要重新构建工程
```
cordova build
```
* JS文件中进行个推初始化

##### 回调函数
```
function callback(type, data) {
	if(type == 'cid') {
		//TODO data = clientid
	} else if(type == 'pid') {
		//TODO data = 进程pid
	} else if(type == 'payload') {
   		//TODO data=透传数据
	} else if(type == 'online') {
		if(data == 'true') {
			//TODO 已上线
		} else {
			//TODO 已离线
		}
	}
};
```
##### 初始化插件
```
 GeTuiSdkPlugin.callback_init(callback);   
 GeTuiSdkPlugin.initialize();
```

##### 回调示例
```

function callback(data){
	alert('value =  ' + data);
}

function getCID(back){
	GeTuiSdkPlugin.getClientId(back);
}

function getVersion(back){
	GeTuiSdkPlugin.getVersion(back);
}

```


##### 补充说明
1，如果用户工程中已有 android-support-v4.jar 文件包，则需要将 plugin.xml 中的 ```<source-file src="android/GtSdkLib/android-support-v4.jar" target-dir="libs"/> ``` 该行去掉；<br/>







## iOS平台支持
* 添加ios平台

```
cordova platform add ios
```
* 添加个推推送
```
// plugman 集成方式，若已使用 cordova 命令集成则可略过此步骤。
plugman install --platform ios --project ios平台目录 --plugin https://github.com/GetuiLaboratory/cordova-plugin-getuisdk --plugins_dir 你的插件目录
```
* 安装之后需要重新构建工程
```
cordova build
```
* iOS 需要添加依赖插件 phonegap-plugin-push，直接复制下面命令，不需要考虑 SENDER_ID 的内容

````
cordova plugin add phonegap-plugin-push --variable SENDER_ID="My Sender ID"
````

* JS文件中进行个推初始化

##### 回调函数
```
//clinetid返回
function onRegisterClient(clientId) {
	//TODO clientId = clinetid   
}；

//透传数据返回
function onReceivePayload(payloadId, taskId, msgId, offLine, appId) {
     //TODO playload = 透传数据
	 //TODO taskId = 推送消息的任务id
	 //TODO msgId = 推送消息的messageid
	 //TODO offLine = 是否是离线消息，YES.是离线消息
	 //TODO appId = 应用的appId

};

//发送上行消息返回
function onSendMessage(messageId, result) {
	//TODO messageid = 发送上行消息id
	//TODO result = 发送结果
}；

//SDK内部发生错误返回
function onOccurError(err) {
	//TODO err = 错误信息
};

//sdk状态返回
function onNotifySdkState(status) {
	var callback = function(status) {
        	switch (status) {
        		case GeTuiSdk.GeTuiSdkStatus.KSdkStatusStarting:
                   		//TODO 正在启动
                   	break;
               		case GeTuiSdk.GeTuiSdkStatus.KSdkStatusStarted:
                		//TODO 已经启动
                	break;
			case GeTuiSdk.GeTuiSdkStatus.KSdkStatusStoped:
				//TODO 已经停止
                   	break;
			default:
			break;
		}
	};
	GeTuiSdk.status(callback);
}；

//SDK设置关闭推送模式回调
function onSetPushMode(isModeOff, err) {
	if (err != null) {
		//TODO 设置关闭模式失败
	} else {
		//TODO 设置关闭模式成功
	}
};
```
##### 初始化插件
```
GeTuiSdk.setGeTuiSdkDidRegisterClientCallback(onRegisterClient);
GeTuiSdk.setGeTuiSdkDidReceivePayloadCallback(onReceivePayload);
GeTuiSdk.setGeTuiSdkDidSendMessageCallback(onSendMessage);
GeTuiSdk.setGeTuiSdkDidOccurErrorCallback(onOccurError);
GeTuiSdk.setGeTuiSDkDidNotifySdkStateCallback(onNotifySdkState);
GeTuiSdk.setGeTuiSdkDidSetPushModeCallback(onSetPushMode);
//个推平台申请的参数KAppId, KAppKey, KAppSecret
GeTuiSdk.startSdkWithAppId(KAppId, KAppKey, KAppSecret);

// 需要依赖插件 phonegap-plugin-push 获取 deviceToken 并注册到个推 SDK
var options = {
    ios: {
        alert: "true",
        badge: "true",
        sound: "true"
    }
};

var push = PushNotification.init(options);

var onRegistration = function(data) {
    console.log(data.registrationId+' deviceToken');
		// 获取 deviceToken 成功，注册 deviceToken 到个推 SDK
    GeTuiSdk.registerDeviceToken(data.registrationId);
};
push.on('registration', onRegistration);

var onNotification = function(data) {
    var date = new Date();
    var dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    app.log('[APN] ' + dateStr + 'title:' + data.title + ' message:' + data.message);
};
push.on('notification', onNotification);

var onError = function(e) {
    GeTuiSdk.registerDeviceToken('');
    app.log('didFailToRegisterForRemoteNotificationsWithError' + e.message);
};
push.on('error', onError);
```
## 参考文档
[iOS Demo 链接](https://github.com/GetuiLaboratory/cordova-plugin-getuisdk/tree/master/ios/demo/www)  

[cordova常用命令](http://my.oschina.net/jack088/blog/390876?fromerr=f8h2gkFq)  

[plugman使用](http://cordova.apache.org/docs/en/latest/plugin_ref/plugman.html)  

[个推官方文档](http://docs.getui.com/)
