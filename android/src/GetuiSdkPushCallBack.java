package com.igexin.getui.phonegap;

public interface GetuiSdkPushCallBack {
	
	public int CALLBACK_PID = 1;
	public int CALLBACK_PAYLOAD = 2;
	public int CALLBACK_CID = 3;
	public int CALLBACK_ISONLINE = 4;
	
	public void receiverCallBack(int type, GeTuiSdkPushBean bean);
}
