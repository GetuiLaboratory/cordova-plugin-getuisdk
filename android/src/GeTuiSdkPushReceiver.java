package com.igexin.getui.phonegap;

import com.igexin.sdk.PushConsts;
import com.igexin.sdk.PushManager;

import android.annotation.SuppressLint;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.os.Message;

import org.apache.cordova.CordovaWebView;

@SuppressLint("HandlerLeak")
public class GeTuiSdkPushReceiver extends BroadcastReceiver {

    private CordovaWebView cordovaWebViewReceiver = null;
    private GeTuiSdkPushBean bean;

//	private GetuiSdkPushCallBack getuiCallBack;

//	public void setGeTuiSdkCallBack(GetuiSdkPushCallBack callBack) {
//		getuiCallBack = callBack;
//	}


    public void dealWithEvents(int type, GeTuiSdkPushBean bean) {
        if (bean != null && handler != null) {
            handler.sendMessage(handler.obtainMessage(type, bean));
        }
    }


    private Handler handler = new Handler(Looper.getMainLooper()) {
        @Override
        public void handleMessage(Message msg) {
            int type = msg.what;
            if(msg.obj == null) {
                return;
            }
            GeTuiSdkPushBean bean = (GeTuiSdkPushBean) msg.obj;
            if(bean == null || cordovaWebViewReceiver == null) {
                return;
            }
            switch (type) {
                case GetuiSdkPushCallBack.CALLBACK_CID:
                    String cid = "javascript:GeTuiSdkPlugin.callback_data('cid','" + bean.getCid() +"')";
                    cordovaWebViewReceiver.loadUrl(cid);
                    break;
                case GetuiSdkPushCallBack.CALLBACK_PAYLOAD:
                    String payload = "javascript:GeTuiSdkPlugin.callback_data('payload','"+ bean.getPayload() +"')";
                    cordovaWebViewReceiver.loadUrl(payload);
                    break;
                case GetuiSdkPushCallBack.CALLBACK_PID:
                    String pid = "javascript:GeTuiSdkPlugin.callback_data('pid','"+ bean.getPid() +"')";
                    cordovaWebViewReceiver.loadUrl(pid);
                    break;
                case GetuiSdkPushCallBack.CALLBACK_ISONLINE:
                    String online = "javascript:GeTuiSdkPlugin.callback_data('online','"+ bean.isOnline() +"')";
                    cordovaWebViewReceiver.loadUrl(online);
                    break;
                default:
                    break;
            }
        }
    };


    @Override
    public void onReceive(Context context, Intent intent) {

        cordovaWebViewReceiver = GeTuiSdkPlugin.cordovaWebView;
        Bundle bundle = intent.getExtras();

        switch (bundle.getInt(PushConsts.CMD_ACTION)) {
            case PushConsts.GET_MSG_DATA:
                // 获取透传数据
                byte[] payload = bundle.getByteArray("payload");
                String taskid = bundle.getString("taskid");
                String messageid = bundle.getString("messageid");
                // smartPush第三方回执调用接口，actionid范围为90000-90999，可根据业务场景执行
                boolean result = PushManager.getInstance().sendFeedbackMessage(context, taskid, messageid, 90001);
                if (payload != null) {
                    String data = new String(payload);
                        bean = new GeTuiSdkPushBean();
                        bean.setPayload(data);
                        dealWithEvents(GetuiSdkPushCallBack.CALLBACK_PAYLOAD, bean);
                }
                break;
            case PushConsts.GET_CLIENTID:
                // 获取ClientID(CID)
                // 第三方应用需要将CID上传到第三方服务器，并且将当前用户帐号和CID进行关联，以便日后通过用户帐号查找CID进行消息推送
                String cid = bundle.getString("clientid");
                    bean = new GeTuiSdkPushBean();
                    bean.setCid(cid);
                    dealWithEvents(GetuiSdkPushCallBack.CALLBACK_CID, bean);
                break;
            case PushConsts.GET_SDKONLINESTATE:
    			// 获取SDK在线状态
    			boolean isOnline = bundle.getBoolean("onlineState");
                    bean = new GeTuiSdkPushBean();
                    bean.setOnline(isOnline);
                    dealWithEvents(GetuiSdkPushCallBack.CALLBACK_ISONLINE, bean);
    			break;
    		case PushConsts.GET_SDKSERVICEPID:
    			// 获取SDK service 进程id
    			int pid = bundle.getInt("pid");
                	bean = new GeTuiSdkPushBean();
                    bean.setPid(pid);
                    dealWithEvents(GetuiSdkPushCallBack.CALLBACK_PID, bean);
    			break;
            case PushConsts.THIRDPART_FEEDBACK:
                break;
            default:
                break;
        }
    }


}