package com.igexin.getui.phonegap;

public class GeTuiSdkPushBean {
	
	private int pid;
	private String payload;
	private String cid;
	private boolean isOnline;
	private String notificationMessage;
	private String deviceToken;

	public int getPid() {
		return pid;
	}

	public void setPid(int pid) {
		this.pid = pid;
	}

	public String getPayload() {
		return payload;
	}

	public void setPayload(String payload) {
		this.payload = payload;
	}

	public String getCid() {
		return cid;
	}

	public void setCid(String cid) {
		this.cid = cid;
	}

	public boolean isOnline() {
		return isOnline;
	}

	public void setOnline(boolean isOnline) {
		this.isOnline = isOnline;
	}

	public void setNotificationMessage(String msg){ this.notificationMessage = msg; }

	public String getNotificationMessage(){return notificationMessage; }

	public void setDeviceToken(String token){ this.deviceToken = token; }

	public String getDeviceToken(){return deviceToken; }

}
