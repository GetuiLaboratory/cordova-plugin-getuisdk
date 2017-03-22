package com.igexin.getui.phonegap;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.json.JSONArray;
import org.json.JSONException;

import com.igexin.sdk.PushConsts;
import com.igexin.sdk.PushManager;
import com.igexin.sdk.Tag;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.IntentFilter;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.os.Handler;
import android.os.Message;
import android.text.TextUtils;

@SuppressLint("HandlerLeak")
public class GeTuiSdkPlugin extends CordovaPlugin {

	private Context con = null;
	private CordovaInterface cordova;
	public static CordovaWebView cordovaWebView;

	private String appkey = "";
    private String appsecret = "";
    private String appid = "";

    @Override
	public void initialize(CordovaInterface cordova, CordovaWebView webView) {
		super.initialize(cordova, webView);
		this.cordova = cordova;
		cordovaWebView = webView;
		con = cordova.getActivity().getApplicationContext();
		
		try {
			String packageName = con.getPackageName();
            ApplicationInfo appInfo = con.getPackageManager().getApplicationInfo(packageName, PackageManager.GET_META_DATA);
            if (appInfo.metaData != null) {
                appid = appInfo.metaData.getString("PUSH_APPID");
                appsecret = appInfo.metaData.getString("PUSH_APPSECRET");
                appkey = appInfo.metaData.getString("PUSH_APPKEY");
            }
        } catch (PackageManager.NameNotFoundException e) {
            e.printStackTrace();
        }
	}


	// JS与Java的调用
	@Override
	public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
		if ("initialize".equals(action)) {
			if (args != null) {
				initialize_getui(appid);
			}
		} else if ("getVersion".equals(action)) {
			String result = getVersion();
			JSONArray ja = new JSONArray();
			ja.put(result);		
			if (callbackContext != null) {
				callbackContext.success(ja);
			}

		} else if ("setTag".equals(action)) {
			if (args != null) {
				setTag(args.getString(0));
			}
		} else if ("setSilentTime".equals(action)) {
			if (args != null) {
				setSilentTime(args.getInt(0), args.getInt(1));
			}
		} else if ("stopService".equals(action)) {
			stopService();
		} else if ("isPushTurnedOn".equals(action)) {
			boolean result = isPushTurnedOn();
			JSONArray ja = new JSONArray();
			ja.put(result);
			if (callbackContext != null) {
				callbackContext.success(ja);
			}
		} else if ("turnOnPush".equals(action)) {
			turnOnPush();
		} else if ("turnOffPush".equals(action)) {
			turnOffPush();
		} else if ("sendFeebackMessage".equals(action)) {
			if (args != null && callbackContext != null) {
				boolean result = sendFeebackMessage(args.getString(0), args.getString(1), args.getInt(2));
				JSONArray ja = new JSONArray();
				ja.put(result);
				callbackContext.success(ja);
			}
		} else if ("getClientId".equals(action)) {
			String result = getClientId();
			JSONArray ja = new JSONArray();
			ja.put(result);
			if (callbackContext != null) {
				callbackContext.success(ja);
			}
		} else if ("bindAlias".equals(action)) {
			if (args != null && callbackContext != null) {
				boolean result = bindAlias(args.getString(0));
				JSONArray ja = new JSONArray();
				ja.put(result);
				callbackContext.success(ja);
			}
		} else if ("unAllBindAlias".equals(action)) {
			if (args != null && callbackContext != null) {
				boolean result = unBindAlias(args.getString(0), false);
				JSONArray ja = new JSONArray();
				ja.put(result);
				callbackContext.success(ja);
			}
		} else if ("unSelfBindAlias".equals(action)) {
			if (args != null && callbackContext != null) {
				boolean result = unBindAlias(args.getString(0), true);
				JSONArray ja = new JSONArray();
				ja.put(result);
				callbackContext.success(ja);
			}
		} else {
			return false;
		}
		return true;
	}



    //用于获取单例PushManager对象实例，可以进行推送控制、设置标签、设置别名、设置静默时间等，所有个推提供的接口均是通过该实例调用。
    public PushManager getInstance() {
    	return PushManager.getInstance();
    }


    //用于sdk初始化, 改用静态广播
    public void initialize_getui(String appid) {
//    	GeTuiSdkPushReceiver geTuiSdkPushReceiver = new GeTuiSdkPushReceiver();
//    	geTuiSdkPushReceiver.setGeTuiSdkCallBack(this);
//    	IntentFilter filter = new IntentFilter();
//    	filter.addAction("com.igexin.sdk.action." + appid);
//    	con.registerReceiver(geTuiSdkPushReceiver, filter);

		try{
			// PushManager.getInstance().initialize(con); 旧模式
			PushManager.getInstance().initialize(con, com.igexin.getui.phonegap.CordovaPushService.class);
			PushManager.getInstance().registerPushIntentService(con, com.igexin.getui.phonegap.CordovaIntentService.class);
		}catch (Exception e){
			e.printStackTrace();
		}
    }



    //获取当前 SDK 版本号
    public String getVersion() {
    	return PushManager.getInstance().getVersion(con);
    }



    //为当前用户设置一组标签，后续推送可以指定标签名进行定向推送。
    public int setTag(String arrayTags) {
    	if (TextUtils.isEmpty(arrayTags)) {
    		return PushConsts.SETTAG_ERROR_NULL;
    	}
    	String[] tags = arrayTags.split(",");
    	if (tags == null || tags.length == 0) {
    		return PushConsts.SETTAG_ERROR_NULL;
    	}
    	Tag[] tagParam = new Tag[tags.length];

    	for (int i = 0; i < tags.length; i++) {
    	    Tag t = new Tag();
    	    //name 字段只支持：中文、英文字母（大小写）、数字、除英文逗号以外的其他特殊符号
    	    t.setName(tags[i]);
    	    tagParam[i] = t;
    	}
    	return PushManager.getInstance().setTag(con, tagParam, "sn"); //setTag函数的参数发生变化  2.9.3.0 以后
    }
    

    //接口 PushManager 中的 setSilentTime，设置静默时间，静默期间SDK将不再联网。
    public boolean setSilentTime(int beginHour,int duration) {
    	return PushManager.getInstance().setSilentTime(con, beginHour, duration);
    }

    //接口 PushManager 中的 stopService,接口 PushManager 中的, 停止SDK服务, 服务不会终止运行, 只是终止推送和联网功能。
    public void stopService() {
    	PushManager.getInstance().stopService(con);
    }

    //接口 PushManager 中的 isPushTurnedOn, 获取当前SDK的服务状态。
    public boolean isPushTurnedOn() {
    	return PushManager.getInstance().isPushTurnedOn(con);
    }

    //接口 PushManager 中的 turnOnPush, 开启Push推送, 默认是开启状态, 关闭状态则收不到推送。turnOnPush 默认打开。
    public void turnOnPush() {
    	PushManager.getInstance().turnOnPush(con);
    }

    //接口 PushManager 中的 turnOffPush, 关闭Push推送, 关闭后则无法收到推送消息。
    public void turnOffPush() {
    	PushManager.getInstance().turnOffPush(con);
    }

    //接口 PushManager 中的 sendFeedbackMessage, 上行第三方自定义回执actionid。
    public boolean sendFeebackMessage(String taskid,String messageid,int actionid) {
    	return PushManager.getInstance().sendFeedbackMessage(con, taskid, messageid, actionid);
    }

    //接口 PushManager 中的 getClientid, 获取当前用户的clientid。
    public String getClientId() {
    	return PushManager.getInstance().getClientid(con);
    }

    //接口 PushManager 中的 bindAlias, 绑定别名
    public boolean bindAlias(String alias) {
    	return PushManager.getInstance().bindAlias(con, alias);
    }

    //接口 PushManager 中的 unBindAlias, 解绑定别名。
    public boolean unBindAlias(String alias, boolean isSelf) {
    	return PushManager.getInstance().unBindAlias(con, alias, isSelf);
    }




}