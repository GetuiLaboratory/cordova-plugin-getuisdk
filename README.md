# cordova-plugin-getuisdk

* 目前只支持IOS、ANDROID平台。

	cordova plugin add https://github.com/GetuiLaboratory/cordova-plugin-getuisdk.git

* android 配置：
	
	android 添加插件之后，需要在项目的AndroidManifest.xml中填写app的包名、appkey、appid、appsecret，例如：
			
			<meta-data
                android:name="PUSH_APPID"
                android:value="你的appid>"/>
            <meta-data
                android:name="PUSH_APPKEY"
                android:value="你的appkey>"/>
            <meta-data
                android:name="PUSH_APPSECRET"
                android:value="你的appsecret"/>
                
    填写后：
    
    	<meta-data
            android:name="PUSH_APPID"
            android:value="y9dDAq27RZ7l0FjmoNWPX3" />
        	<meta-data
            android:name="PUSH_APPKEY"
            android:value="NIyM21g4cF7Ah4LEwc3XwA" />
        <meta-data
            android:name="PUSH_APPSECRET"
            android:value="g6rTHYlK3s5HNDDKRQQ1F4" />
	
	