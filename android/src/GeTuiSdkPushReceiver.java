package com.igexin.getui.phonegap;

import com.igexin.sdk.PushConsts;
import com.igexin.sdk.PushManager;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;

public class GeTuiSdkPushReceiver extends BroadcastReceiver {
	
	private GetuiSdkPushCallBack getuiCallBack;
	
	public void setGeTuiSdkCallBack(GetuiSdkPushCallBack callBack) {
		getuiCallBack = callBack;
	}
	
    @Override
    public void onReceive(Context context, Intent intent) {
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
                    if (getuiCallBack != null) {
                    	GeTuiSdkPushBean bean = new GeTuiSdkPushBean();
                    	bean.setPayload(data);
                    	getuiCallBack.receiverCallBack(GetuiSdkPushCallBack.CALLBACK_PAYLOAD, bean);
                    }
                }
                break;
            case PushConsts.GET_CLIENTID:
                // 获取ClientID(CID)
                // 第三方应用需要将CID上传到第三方服务器，并且将当前用户帐号和CID进行关联，以便日后通过用户帐号查找CID进行消息推送
                String cid = bundle.getString("clientid");
                if (getuiCallBack != null) {
                	GeTuiSdkPushBean bean = new GeTuiSdkPushBean();
                	bean.setCid(cid);
                	getuiCallBack.receiverCallBack(GetuiSdkPushCallBack.CALLBACK_CID, bean);
                }
                break;
            case PushConsts.GET_SDKONLINESTATE:
    			// 获取SDK在线状态
    			boolean isOnline = bundle.getBoolean("onlineState");
    			if (getuiCallBack != null) {
                	GeTuiSdkPushBean bean = new GeTuiSdkPushBean();
                	bean.setOnline(isOnline);
                	getuiCallBack.receiverCallBack(GetuiSdkPushCallBack.CALLBACK_ISONLINE, bean);
                }
    			break;
    		case PushConsts.GET_SDKSERVICEPID:
    			// 获取SDK service 进程id
    			int pid = bundle.getInt("pid");
    			if (getuiCallBack != null) {
                	GeTuiSdkPushBean bean = new GeTuiSdkPushBean();
                	bean.setPid(pid);
                	getuiCallBack.receiverCallBack(GetuiSdkPushCallBack.CALLBACK_PID, bean);
                }
    			break;
            case PushConsts.THIRDPART_FEEDBACK:
                break;
            default:
                break;
        }
    }
}
