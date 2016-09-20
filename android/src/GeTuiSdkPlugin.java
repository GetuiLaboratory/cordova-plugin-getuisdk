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
public class GeTuiSdkPlugin extends CordovaPlugin implements GetuiSdkPushCallBack{

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

	@Override
	public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
		if ("initialize".equals(action)) {
			if (args != null) {
				initialize_getui(appid);
			}
		} else if ("getVersion".equals(action)) {
			getVersion();
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
			if (args != null) {
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
		} else if ("transmission".equals(action)) {
			if (args != null) {
				transmission(args.getString(0), args.getString(1));
			}
		} else if ("notifaction".equals(action)) {
			if (args != null) {
				notifaction(args.getString(0), args.getString(1));
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

    //用于sdk初始化
    public void initialize_getui(String appid) {
    	GeTuiSdkPushReceiver geTuiSdkPushReceiver = new GeTuiSdkPushReceiver();
    	geTuiSdkPushReceiver.setGeTuiSdkCallBack(this);
    	IntentFilter filter = new IntentFilter();
    	filter.addAction("com.igexin.sdk.action." + appid);
    	con.registerReceiver(geTuiSdkPushReceiver, filter);

    	PushManager.getInstance().initialize(con);
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
    	return PushManager.getInstance().setTag(con, tagParam, "sn"); //setTag函数的参数发生变化  2.9.0.0
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

    Handler handler = new Handler() {
		@Override
		public void handleMessage(Message msg) {
			int type = msg.what;
			if(msg.obj == null) {
				return;
			}
			GeTuiSdkPushBean bean = (GeTuiSdkPushBean) msg.obj;
			if(bean == null || cordovaWebView == null) {
				return;
			}
			switch (type) {
			case GetuiSdkPushCallBack.CALLBACK_CID:
				String cid = "javascript:GeTuiSdkPlugin.callback_data('cid','" + bean.getCid() +"')";
				cordovaWebView.loadUrl(cid);
				break;
			case GetuiSdkPushCallBack.CALLBACK_PAYLOAD:
				String payload = "javascript:GeTuiSdkPlugin.callback_data('payload','"+ bean.getPayload() +"')";
				cordovaWebView.loadUrl(payload);
				break;
			case GetuiSdkPushCallBack.CALLBACK_PID:
				String pid = "javascript:GeTuiSdkPlugin.callback_data('pid','"+ bean.getPid() +"')";
				cordovaWebView.loadUrl(pid);
				break;
			case GetuiSdkPushCallBack.CALLBACK_ISONLINE:
				String online = "javascript:GeTuiSdkPlugin.callback_data('online','"+ bean.isOnline() +"')";
				cordovaWebView.loadUrl(online);
				break;
			default:
				break;
			}
		}
    };

	@Override
	public void receiverCallBack(int type, GeTuiSdkPushBean bean) {
		if (bean != null && handler != null) {
			handler.sendMessage(handler.obtainMessage(type, bean));
		}
	}

	public void transmission(String cid, String mastersecret) {
		// !!!!!!注意：以下为个推服务端API1.0接口，仅供测试。不推荐在现网系统使用1.0版服务端接口，请参考最新的个推服务端API接口文档，使用最新的2.0版接口
		Map<String, Object> param = new HashMap<String, Object>();
		 // pushmessage为接口名，注意全部小写
        param.put("action", "pushmessage");
        /*---以下代码用于设定接口相应参数---*/
        param.put("appkey", appkey);
        param.put("appid", appid);
        //注：透传内容后面需用来验证接口调用是否成功，假定填写为hello girl~
        param.put("data", "透传消息测试");
        SimpleDateFormat  formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date curDate = new Date(System.currentTimeMillis());
        param.put("time", formatter.format(curDate)); // 当前请求时间，可选
        param.put("clientid", cid); // 您获取的ClientID
        param.put("expire", 3600); // 消息超时时间，单位为秒，可选

        // 生成Sign值，用于鉴权
        param.put("sign", GetuiSdkHttpPost.makeSign(mastersecret, param));

        GetuiSdkHttpPost.httpPost(param);
	}
	
	public void notifaction(String cid, String mastersecret) {
		// !!!!!!注意：以下为个推服务端API1.0接口，仅供测试。不推荐在现网系统使用1.0版服务端接口，请参考最新的个推服务端API接口文档，使用最新的2.0版接口
		  Map<String, Object> param = new HashMap<String, Object>();
          param.put("action", "pushSpecifyMessage"); // pushSpecifyMessage为接口名，注意大小写
          /*---以下代码用于设定接口相应参数---*/
          param.put("appkey", appkey);
          param.put("type", 2); // 推送类型： 2为消息
          param.put("pushTitle", "通知栏测试"); // pushTitle请填写您的应用名称

          // 推送消息类型，有TransmissionMsg、LinkMsg、NotifyMsg三种，此处以LinkMsg举例
          param.put("pushType", "LinkMsg");

          param.put("offline", true); // 是否进入离线消息

          param.put("offlineTime", 72); // 消息离线保留时间
          param.put("priority", 1); // 推送任务优先级

          List<String> cidList = new ArrayList<String>();
          cidList.add(cid); // 您获取的ClientID
          param.put("tokenMD5List", cidList);

          // 生成Sign值，用于鉴权，需要MasterSecret，请务必填写
          param.put("sign", GetuiSdkHttpPost.makeSign(mastersecret, param));

          // LinkMsg消息实体
          Map<String, Object> linkMsg = new HashMap<String, Object>();
          linkMsg.put("linkMsgIcon", "push.png"); // 消息在通知栏的图标
          linkMsg.put("linkMsgTitle", "通知栏测试"); // 推送消息的标题
          linkMsg.put("linkMsgContent", "您收到一条测试消息，点击访问www.igetui.com！"); // 推送消息的内容
          linkMsg.put("linkMsgUrl", "http://www.igetui.com/"); // 点击通知跳转的目标网页
          param.put("msg", linkMsg);

          GetuiSdkHttpPost.httpPost(param);
	}
}
