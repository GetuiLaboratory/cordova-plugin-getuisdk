# cordova-plugin-getuisdk
### 使用个推cordova推送插件
* 安装cordova 
```
npm install -g cordova
```
* 安装plugman
```
npm install -g plugman
```
* 创建cordova工程
```
cordova create 目录名 应用包名 工程名
```
* 添加android平台
```
	cordova platform add android
```
* 添加个推推送（目前只支持IOS、ANDROID平台）
```	
plugman install --platform android --project android平台目录 --plugin https://github.com/GetuiLaboratory/cordova-plugin-getuisdk --plugins_dir 你的插件目录 --variable PUSH_APPID=你的appid --variable PUSH_APPKEY=你的appkey --variable PUSH_APPSECRET=你的appsecret
```	
* 安装之后需要重新构建
```
cordova build
```

