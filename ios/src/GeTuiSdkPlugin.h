//
//  GeTuiSdkPlugin.h
//
//  Created by Quant on 15-10-30.
//
//

#import <Cordova/CDVPlugin.h>
#import "GeTuiSdk.h"

@interface GeTuiSdkPlugin : CDVPlugin<GeTuiSdkDelegate>

- (void)startSdkWithAppId:(CDVInvokedUrlCommand *)command;
- (void)destroy:(CDVInvokedUrlCommand *)command;
- (void)registerDeviceToken:(CDVInvokedUrlCommand *)command;

- (void)setPushModeOff:(CDVInvokedUrlCommand *)command;
- (void)setPushModeOn:(CDVInvokedUrlCommand *)command;
- (void)bindAlias:(CDVInvokedUrlCommand *)command;
- (void)unbindAlias:(CDVInvokedUrlCommand *)command;
- (void)setTags:(CDVInvokedUrlCommand *)command;
- (void)sendMessage:(CDVInvokedUrlCommand * )command;
- (void)sendFeedbackMessage:(CDVInvokedUrlCommand *)command;
- (void)runBackgroundEnable:(CDVInvokedUrlCommand *)command;
- (void)runBackgroundDisable:(CDVInvokedUrlCommand *)command;
- (void)resume:(CDVInvokedUrlCommand *)command;
- (void)version:(CDVInvokedUrlCommand *)command;
- (void)status:(CDVInvokedUrlCommand *)command;
- (void)clientId:(CDVInvokedUrlCommand *)command;
- (void)clearAllNotificationForNotificationBar:(CDVInvokedUrlCommand *)command;
- (void)setBadge:(CDVInvokedUrlCommand*)command;
- (void)resetBadge:(CDVInvokedUrlCommand*)command;

- (void)setChannelId:(CDVInvokedUrlCommand *)command; // 1.5.0+
- (void)handleRemoteNotification:(CDVInvokedUrlCommand *)command; // 1.5.0+ 远程推送消息处理


- (void)setGeTuiSdkDidRegisterClientCallback:(CDVInvokedUrlCommand *)command;
- (void)setGeTuiSdkDidReceivePayloadCallback:(CDVInvokedUrlCommand *)command;
- (void)setGeTuiSdkDidSendMessageCallback:(CDVInvokedUrlCommand *)command;
- (void)setGeTuiSdkDidOccurErrorCallback:(CDVInvokedUrlCommand *)command;
- (void)setGeTuiSDkDidNotifySdkStateCallback:(CDVInvokedUrlCommand *)command;
- (void)setGeTuiSdkDidSetPushModeCallback:(CDVInvokedUrlCommand *)command;
- (void)setGeTuiSdkDidAliasActionCallback:(CDVInvokedUrlCommand *)command; // 1.5.0+

//protocol GexinSdkDelegate
- (void)GeTuiSdkDidRegisterClient:(NSString *)clientId;
- (void)GeTuiSdkDidReceivePayloadData:(NSData *)payloadData andTaskId:(NSString *)taskId
                             andMsgId:(NSString *)msgId andOffLine:(BOOL)offLine fromGtAppId:(NSString *)appId;
- (void)GeTuiSdkDidSendMessage:(NSString *)messageId result:(int)result;
- (void)GeTuiSdkDidOccurError:(NSError *)error;
- (void)GeTuiSDkDidNotifySdkState:(SdkStatus)aStatus;
- (void)GeTuiSdkDidSetPushMode:(BOOL)isModeOff error:(NSError *)error;
- (void)GeTuiSdkDidAliasAction:(NSString *)action result:(BOOL)isSuccess sequenceNum:(NSString *)aSn error:(NSError *)aError;


@end
