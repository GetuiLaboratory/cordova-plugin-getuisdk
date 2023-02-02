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
cordova platform add android@6.4.0
在cordova8.0.0版本platform add默认是使用android@7.0.0/文件的工程目录发生了变化。暂时有兼容问题，建议使用android@6.4.0
更新至npm1.1.5，更新sdk至4.3.2.0，替换so为libgetuiext3.so
```
* 如果你希望使用CordovaAndroid@7.0

 ```
建议用户修改路径
<!-- An existing config.xml -->
<edit-config file="AndroidManifest.xml" target="/manifest/application" mode="merge">

<!-- needs to change to -->
<edit-config file="app/src/main/AndroidManifest.xml" target="/manifest/application" mode="merge"> 
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
    }else if(type == 'onNotificationArrived') {
          alert('onNotificationArrived' + data) //通知到达回调
    } else if(type == 'onNotificationClicked') {
          alert('onNotificationClicked' + data) //点击通知事件回调
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
* iOS 需要添加依赖插件 phonegap-plugin-push，直接复制下面命令，不需要考虑 SENDER_ID 的内容。

````
cordova plugin add phonegap-plugin-push --variable SENDER_ID="My Sender ID"
````

**注意：** 

phonegap-plugin-push 是 cordova 官方插件，需要考虑与 cordova 以及 cordova-ios 工具的兼容性问题，否则不能正常使用该插件。推荐的兼容性版本配置为：cordova@8.0.0、cordova-ios@4.4.0 、phonegap-plugin-push@1.8.4

* GTSDK需要swift5以上环境，建议在xcode工程中新建一个swift文件配置环境

* JS文件中进行个推初始化

##### 回调函数
```
//clinetid返回
function onRegisterClient(clientId) {
	//TODO clientId = clinetid   
}；

//将要展示通知 是否展示回调在oc层 开发者可定制
function onWillPresentNotification(userInfo) {

}；

//收到通知 常用语点击通知回调
function onDidReceiveNotification(userInfo) {
  
}；

//收到透传消息
function onDidReceiveSlience(userInfo) {
  
}；

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

// 接收到 VoIP 推送的回调
function onReceiveVoipPayload(payload, gmid, type) {
	 //TODO payload = 透传数据
	 //TODO gmid = gmid
	 //TODO type = push类型
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
// 注册 VoIP 并监听 VoIP 推送回调信息，1.0.9 版本加入该功能
GeTuiSdk.voipRegistrationWithVoipPushCallback(app.onReceiveVoipPayload);

// 个推平台申请的参数KAppId, KAppKey, KAppSecret
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

**注意：** 

若使用 VoIP 功能，需要在生成的 Xcode 项目中添加 VoIP 权限，还需要再Xcode项目中导入PushKit.Framework库以Optional方式引入。
在 info.plist 中添加 VoIP 权限，如图：

![voip权限](http://docs.getui.com/img/img_getui_mobile_ios_xcode_19.png)

**注意：** 

Apple 在 iOS 10 中新增了Notification Service Extension机制，可在消息送达时进行业务处理。为精确统计消息送达率，在集成个推SDK时，可以添加 Notification Service Extension，并在 Extensions 中添加 GTExtensionSDK 的统计接口，实现消息展示回执统计功能。具体可参考[个推集成文档](https://docs.getui.com/getui/mobile/ios/xcode/)。


## 参考文档

[iOS Demo 链接](https://github.com/GetuiLaboratory/cordova-plugin-getuisdk/tree/master/ios/demo/www)  

[cordova常用命令](http://my.oschina.net/jack088/blog/390876?fromerr=f8h2gkFq)  

[plugman使用](http://cordova.apache.org/docs/en/latest/plugin_ref/plugman.html)  

[个推官方文档](http://docs.getui.com/)

[AppLink接入](http://docs.getui.com/getui/mobile/ios/applink/)

[Cordova Android@7.0](https://cordova.apache.org/announcements/2017/12/04/cordova-android-7.0.0.html)
