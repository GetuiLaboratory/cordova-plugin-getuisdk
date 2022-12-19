//
//  GeTuiSdkPlugin.h
//
//  Created by Quant on 15-10-30.
//
//

#import <Cordova/CDVPlugin.h>
#import <GTSDK/GeTuiSdk.h>
#import <PushKit/PushKit.h>

@interface GeTuiSdkPlugin : CDVPlugin<GeTuiSdkDelegate,PKPushRegistryDelegate>

- (void)startSdkWithAppId:(CDVInvokedUrlCommand *)command;
- (void)destroy:(CDVInvokedUrlCommand *)command;
- (void)resume:(CDVInvokedUrlCommand *)command;
#pragma mark -
- (void)version:(CDVInvokedUrlCommand *)command;
- (void)clientId:(CDVInvokedUrlCommand *)command;
- (void)status:(CDVInvokedUrlCommand *)command;
#pragma mark -
- (void)registerDeviceToken:(CDVInvokedUrlCommand *)command;
- (void)registerDeviceTokenData:(CDVInvokedUrlCommand *)command;
- (void)registerVoipToken:(CDVInvokedUrlCommand *)command;
- (void)registerVoipTokenCredentials:(CDVInvokedUrlCommand *)command;
#pragma mark -
- (void)setTags:(CDVInvokedUrlCommand *)command;
- (void)setTagsAndSequenceNum:(CDVInvokedUrlCommand *)command;
- (void)setBadge:(CDVInvokedUrlCommand*)command;
- (void)resetBadge:(CDVInvokedUrlCommand*)command;
- (void)setChannelId:(CDVInvokedUrlCommand *)command; // 1.5.0+
- (void)setPushModeOff:(CDVInvokedUrlCommand *)command;
- (void)setPushModeOn:(CDVInvokedUrlCommand *)command;
- (void)bindAlias:(CDVInvokedUrlCommand *)command;
- (void)unbindAlias:(CDVInvokedUrlCommand *)command;
#pragma mark -
- (void)handleRemoteNotification:(CDVInvokedUrlCommand *)command; // 1.5.0+ 远程推送消息处理
- (void)handleVoipNotification:(CDVInvokedUrlCommand *)command;
- (void)handleApplinkFeedback:(CDVInvokedUrlCommand *)command;
- (void)sendMessage:(CDVInvokedUrlCommand * )command;
- (void)sendFeedbackMessage:(CDVInvokedUrlCommand *)command;
#pragma mark -
- (void)runBackgroundEnable:(CDVInvokedUrlCommand *)command;
- (void)runBackgroundDisable:(CDVInvokedUrlCommand *)command;
- (void)lbsLocationEnable:(CDVInvokedUrlCommand *)command;
- (void)clearAllNotificationForNotificationBar:(CDVInvokedUrlCommand *)command;

#pragma mark - GeTuiSdkDelegate
- (void)GeTuiSdkDidRegisterClient:(NSString *)clientId;
- (void)GeTuiSDkDidNotifySdkState:(SdkStatus)aStatus;
- (void)GeTuiSdkDidReceivePayloadData:(NSData *)payloadData andTaskId:(NSString *)taskId
                             andMsgId:(NSString *)msgId andOffLine:(BOOL)offLine fromGtAppId:(NSString *)appId;
- (void)GeTuiSdkDidSendMessage:(NSString *)messageId result:(int)result;
- (void)GeTuiSdkDidSetPushMode:(BOOL)isModeOff error:(NSError *)error;
- (void)GeTuiSdkDidAliasAction:(NSString *)action result:(BOOL)isSuccess sequenceNum:(NSString *)aSn error:(NSError *)aError;
- (void)GeTuiSdkDidSetTagsAction:(NSString *)sequenceNum result:(BOOL)isSuccess error:(NSError *)aError;
- (void)GetuiSdkDidQueryTag:(NSArray*)aTags sequenceNum:(NSString *)aSn error:(NSError *)aError;
- (void)GeTuiSdkDidOccurError:(NSError *)error;

- (void)setGeTuiSdkDidRegisterClientCallback:(CDVInvokedUrlCommand *)command;
- (void)setGeTuiSDkDidNotifySdkStateCallback:(CDVInvokedUrlCommand *)command;
- (void)setGeTuiSdkDidReceivePayloadCallback:(CDVInvokedUrlCommand *)command;
- (void)setGeTuiSdkDidSendMessageCallback:(CDVInvokedUrlCommand *)command;
- (void)setGeTuiSdkDidSetPushModeCallback:(CDVInvokedUrlCommand *)command;
- (void)setGeTuiSdkDidAliasActionCallback:(CDVInvokedUrlCommand *)command;
- (void)setGeTuiSdkDidTagsActionCallback:(CDVInvokedUrlCommand *)command;
- (void)setGeTuiSdkDidQueryTagCallback:(CDVInvokedUrlCommand *)command;
- (void)setGeTuiSdkDidOccurErrorCallback:(CDVInvokedUrlCommand *)command;

- (void)setGeTuiSdkGrantAuthorizationCallback:(CDVInvokedUrlCommand *)command;
- (void)setGetuiSdkWillPresentNotificationCallBack:(CDVInvokedUrlCommand *)command;
- (void)setGeTuiSdkDidReceiveNotificationCallback:(CDVInvokedUrlCommand *)command;
- (void)setGeTuiSdkDidReceiveSlienceCallback:(CDVInvokedUrlCommand *)command;
- (void)setGeTuiSdkOpenSettingsForNotificationCallback:(CDVInvokedUrlCommand *)command;

// protocol PKPushRegistryDelegate

- (void)pushRegistry:(PKPushRegistry *)registry didUpdatePushCredentials:(PKPushCredentials *)credentials forType:(NSString *)type;
- (void)pushRegistry:(PKPushRegistry *)registry didReceiveIncomingPushWithPayload:(PKPushPayload *)payload forType:(NSString *)type;

@end

