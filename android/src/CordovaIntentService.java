package com.igexin.getui.phonegap;

import android.annotation.SuppressLint;
import android.content.Context;
import android.os.Message;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;

import com.igexin.sdk.GTIntentService;
import com.igexin.sdk.PushConsts;
import com.igexin.sdk.PushManager;
import com.igexin.sdk.message.FeedbackCmdMessage;
import com.igexin.sdk.message.GTCmdMessage;
import com.igexin.sdk.message.GTTransmitMessage;
import com.igexin.sdk.message.SetTagCmdMessage;

import org.apache.cordova.CordovaWebView;


/**
 * 继承 GTIntentService 接收来自个推的消息, 所有消息在线程中回调, 如果注册了该服务, 则务必要在 AndroidManifest中声明, 否则无法接受消息
 * onReceiveMessageData 处理透传消息
 * onReceiveClientId 接收 cid 
 * onReceiveOnlineState cid 离线上线通知 
 * onReceiveCommandResult 各种事件处理回执 
 */
@SuppressLint("HandlerLeak")
public class CordovaIntentService extends GTIntentService {

    private static final String TAG = "CordovaIntentService";

    private CordovaWebView cordovaWebViewReceiver = null;
    private GeTuiSdkPushBean bean;

    private final int CALLBACK_PID = 1;
    private final int CALLBACK_PAYLOAD = 2;
    private final int CALLBACK_CID = 3;
    private final int CALLBACK_ISONLINE = 4;

    
    public CordovaIntentService() { }


    // 处理函数
    public void dealWithEvents(int type, GeTuiSdkPushBean bean) {
        if (bean != null && handler != null) {
            handler.sendMessage(handler.obtainMessage(type, bean));
        }
    }


    // Handler处理器， 调用JS中的回调函数
    private Handler handler = new Handler(Looper.getMainLooper()) {
        @Override
        public void handleMessage(Message msg) {
            int type = msg.what;
            cordovaWebViewReceiver = GeTuiSdkPlugin.cordovaWebView;

            if(msg.obj == null) {
                return;
            }
            GeTuiSdkPushBean bean = (GeTuiSdkPushBean) msg.obj;
            if(bean == null || cordovaWebViewReceiver == null) {
                return;
            }

            switch (type) {
                case CALLBACK_CID:
                    String cid = "javascript:GeTuiSdkPlugin.callback_data('cid','" + bean.getCid() +"')";
                    cordovaWebViewReceiver.loadUrl(cid);
                    break;
                case CALLBACK_PAYLOAD:
                    String payload = "javascript:GeTuiSdkPlugin.callback_data('payload','"+ bean.getPayload() +"')";
                    cordovaWebViewReceiver.loadUrl(payload);
                    break;
                case CALLBACK_PID:
                    String pid = "javascript:GeTuiSdkPlugin.callback_data('pid','"+ bean.getPid() +"')";
                    cordovaWebViewReceiver.loadUrl(pid);
                    break;
                case CALLBACK_ISONLINE:
                    String online = "javascript:GeTuiSdkPlugin.callback_data('online','"+ bean.isOnline() +"')";
                    cordovaWebViewReceiver.loadUrl(online);
                    break;
                default:
                    break;
            }
        }
    };



    // 获取SDK service 进程id
    @Override
    public void onReceiveServicePid(Context context, int pid) {
        Log.d(TAG, "onReceiveServicePid -> " + pid);
        bean = new GeTuiSdkPushBean();
        bean.setPid(pid);
        dealWithEvents(CALLBACK_PID, bean);
    }


    // 获取透传数据   payload
    @Override
    public void onReceiveMessageData(Context context, GTTransmitMessage msg) { 
        String appid = msg.getAppid();
        String taskid = msg.getTaskId();
        String messageid = msg.getMessageId();
        byte[] payload = msg.getPayload();
        String pkg = msg.getPkgName();
        String cid = msg.getClientId();

        // smartPush第三方回执调用接口，actionid范围为90000-90999，可根据业务场景执行
        boolean result = PushManager.getInstance().sendFeedbackMessage(context, taskid, messageid, 90001);
        if (payload != null) {
            String data = new String(payload);
            bean = new GeTuiSdkPushBean();
            bean.setPayload(data);
            dealWithEvents(CALLBACK_PAYLOAD, bean);
        }

    }



    // 获取ClientID(CID)
    // 第三方应用需要将CID上传到第三方服务器，并且将当前用户帐号和CID进行关联，以便日后通过用户帐号查找CID进行消息推送
    @Override
    public void onReceiveClientId(Context context, String clientid) { 
        Log.e(TAG, "onReceiveClientId -> " + "clientid = " + clientid);
        bean = new GeTuiSdkPushBean();
        bean.setCid(clientid);
        dealWithEvents(CALLBACK_CID, bean);
    }



    @Override
    public void onReceiveOnlineState(Context context, boolean online) {
        Log.d(TAG, "onReceiveOnlineState -> " + (online ? "online" : "offline"));
        bean = new GeTuiSdkPushBean();
        bean.setOnline(online);
        dealWithEvents(CALLBACK_ISONLINE, bean);
    }


    @Override
    public void onReceiveCommandResult(Context context, GTCmdMessage cmdMessage) { }



}
