//
//  GeTuiSdkPlugin.m
//
//  Created by Quant on 15-10-30.
//
//

#import "GeTuiSdkPlugin.h"

@interface GeTuiSdkPlugin () {
@private
    NSString *_registerClientCallbackId;
    NSString *_receivePayloadCallbackId;
    NSString *_sendMessageCallback;
    NSString *_occurErrorCallbackId;
    NSString *_notifySdkStateCallbackId;
    NSString *_setPushModeCallbackId;
    NSString *_aliasActionCallbackId;
    NSString *_tagsActionCallbackId;
    NSString *_queryTagCallbackId;
    NSString *_didReceiveIncomingVoipPushCallback;
}

@end

@implementation GeTuiSdkPlugin

- (id)init {
    if (self = [super init]) { // equivalent to "self does not equal nil"
        _registerClientCallbackId = nil;
        _receivePayloadCallbackId = nil;
        _sendMessageCallback = nil;
        _occurErrorCallbackId = nil;
        _notifySdkStateCallbackId = nil;
        _setPushModeCallbackId = nil;
        _aliasActionCallbackId = nil;
        _tagsActionCallbackId = nil;
        _queryTagCallbackId = nil;
        _didReceiveIncomingVoipPushCallback = nil;
    }
    return self;
}

- (void)startSdkWithAppId:(CDVInvokedUrlCommand *)command {
    NSString *appid = [command argumentAtIndex:0];
    NSString *appKey = [command argumentAtIndex:1];
    NSString *appSecret = [command argumentAtIndex:2];

    [GeTuiSdk startSdkWithAppId:appid appKey:appKey appSecret:appSecret delegate:self];
}

- (void)destroy:(CDVInvokedUrlCommand *)command {
    [GeTuiSdk destroy];
}

- (void)resume:(CDVInvokedUrlCommand *)command {
    [GeTuiSdk resume];
}

- (void)version:(CDVInvokedUrlCommand *)command {
    NSString *callbackId = command.callbackId;
    NSString *version = [GeTuiSdk version];
    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:version];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:callbackId];
}

- (void)clientId:(CDVInvokedUrlCommand *)command {
    NSString *callbackId = command.callbackId;

    NSString *clientId = [GeTuiSdk clientId];

    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:clientId];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:callbackId];
}

- (void)status:(CDVInvokedUrlCommand *)command {
    NSString *callbackId = command.callbackId;
    SdkStatus status = [GeTuiSdk status];
    
    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsNSUInteger:status];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:callbackId];
}

- (void)registerDeviceToken:(CDVInvokedUrlCommand *)command {
    NSString *deviceToken = [command argumentAtIndex:0];
    [GeTuiSdk registerDeviceToken:deviceToken];
}

- (void)registerDeviceTokenData:(CDVInvokedUrlCommand *)command {
    NSData *deviceToken = [command argumentAtIndex:0];
    [GeTuiSdk registerDeviceTokenData:deviceToken];
}

- (void)registerVoipToken:(CDVInvokedUrlCommand *)command {
    NSString *voipToken = [command argumentAtIndex:0];
    [GeTuiSdk registerVoipToken:voipToken];
}

- (void)registerVoipTokenCredentials:(CDVInvokedUrlCommand *)command {
    NSData *voipTokenCredentials = [command argumentAtIndex:0];
    [GeTuiSdk registerVoipTokenCredentials:voipTokenCredentials];
}

- (void)setTags:(CDVInvokedUrlCommand *)command {
    NSString *callbackId = command.callbackId;
    NSArray *tags = [command argumentAtIndex:0];

    BOOL result = [GeTuiSdk setTags:tags];

    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsBool:result];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:callbackId];
}

- (void)setTagsAndSequenceNum:(CDVInvokedUrlCommand *)command {
    NSString *callbackId = command.callbackId;
    NSArray *tags = [command argumentAtIndex:0];
    NSString *sequenceNum = [command argumentAtIndex:1];
    BOOL result = [GeTuiSdk setTags:tags andSequenceNum:sequenceNum];

    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsBool:result];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:callbackId];
}

- (void)setBadge:(CDVInvokedUrlCommand *)command {
    NSNumber* badge = [command argumentAtIndex:0];
    int badgeValue = [badge intValue];
    badgeValue = badgeValue >=0 ? badgeValue : 0;
    [GeTuiSdk setBadge:badgeValue];
}

- (void)resetBadge:(CDVInvokedUrlCommand *)command {
    [GeTuiSdk resetBadge];
}

- (void)setChannelId:(CDVInvokedUrlCommand *)command{
    NSString *channelId = [command argumentAtIndex:0];
    [GeTuiSdk setChannelId:channelId];
}

- (void)setPushModeOff:(CDVInvokedUrlCommand *)command {
    [GeTuiSdk setPushModeForOff:true];
}

- (void)setPushModeOn:(CDVInvokedUrlCommand *)command {
    [GeTuiSdk setPushModeForOff:false];
}

- (void)bindAlias:(CDVInvokedUrlCommand *)command {
    NSString *alias = [command argumentAtIndex:0];
    NSString *sequenceNum = [command argumentAtIndex:1];
    [GeTuiSdk bindAlias:alias andSequenceNum:sequenceNum];
}

- (void)unbindAlias:(CDVInvokedUrlCommand *)command {
    NSString *alias = [command argumentAtIndex:0];
    NSString *sequenceNum = [command argumentAtIndex:1];
    [GeTuiSdk unbindAlias:alias andSequenceNum:sequenceNum andIsSelf:true];
}

- (void)handleRemoteNotification:(CDVInvokedUrlCommand *)command{
    NSDictionary *userInfo = [command argumentAtIndex:0];
    [GeTuiSdk handleRemoteNotification:userInfo];
}

- (void)handleVoipNotification:(CDVInvokedUrlCommand *)command {
    NSDictionary *payload = [command argumentAtIndex:0];
    [GeTuiSdk handleVoipNotification:payload];
}

- (void)handleApplinkFeedback:(CDVInvokedUrlCommand *)command {
    NSURL *webUrl = [command argumentAtIndex:0];
    [GeTuiSdk handleApplinkFeedback:webUrl];
}

- (void)sendMessage:(CDVInvokedUrlCommand *)command {
    NSString *callbackId = command.callbackId;
    NSString *bodyStr = [command argumentAtIndex:0];

    NSError *err = nil;
    NSString *msgId = [GeTuiSdk sendMessage:[bodyStr dataUsingEncoding:NSUTF8StringEncoding] error:&err];

    if (err) {
        CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR
                                                      messageAsDictionary:[self errorToDict:err]];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:callbackId];
    } else {
        CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:msgId];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:callbackId];
    }
}

- (void)sendFeedbackMessage:(CDVInvokedUrlCommand *)command {
    NSString *callbackId = command.callbackId;
    NSNumber *actionId = [command argumentAtIndex:0];
    NSString *taskId = [command argumentAtIndex:1];
    NSString *msgId = [command argumentAtIndex:2];

    BOOL result = [GeTuiSdk sendFeedbackMessage:actionId.intValue andTaskId:taskId andMsgId:msgId];

    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsBool:result];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:callbackId];
}

- (void)runBackgroundEnable:(CDVInvokedUrlCommand *)command {
    [GeTuiSdk runBackgroundEnable:true];
}

- (void)runBackgroundDisable:(CDVInvokedUrlCommand *)command {
    [GeTuiSdk runBackgroundEnable:false];
}

- (void)lbsLocationEnable:(CDVInvokedUrlCommand *)command {
    BOOL locationEnable = [command argumentAtIndex:0];
    BOOL userVerif = [command argumentAtIndex:1];
    [GeTuiSdk lbsLocationEnable:locationEnable andUserVerify:userVerif];
}

- (void)clearAllNotificationForNotificationBar:(CDVInvokedUrlCommand *)command {
    [GeTuiSdk clearAllNotificationForNotificationBar];
}

#pragma mark - GeTuiSdkDelegate
- (void)GeTuiSdkDidRegisterClient:(NSString *)clientId {
    if (!_registerClientCallbackId) {
        return;
    }

    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:clientId];
    [pluginResult setKeepCallbackAsBool:YES];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:_registerClientCallbackId];
}
- (void)GeTuiSDkDidNotifySdkState:(SdkStatus)aStatus {
    if (!_notifySdkStateCallbackId) {
        return;
    }
    
    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsNSUInteger:aStatus];
    [pluginResult setKeepCallbackAsBool:YES];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:_notifySdkStateCallbackId];
}


- (void)GeTuiSdkDidReceivePayloadData:(NSData *)payloadData andTaskId:(NSString *)taskId
                              andMsgId:(NSString *)msgId andOffLine:(BOOL)offLine fromGtAppId:(NSString *)appId {
    if (!_receivePayloadCallbackId) {
        return;
    }

    NSString *payloadMsg = nil;
    if (payloadData) {
        payloadMsg = [[NSString alloc] initWithBytes:payloadData.bytes
                                              length:payloadData.length
                                            encoding:NSUTF8StringEncoding];
    }

    NSArray *array = [NSArray arrayWithObjects:payloadMsg, taskId, msgId, @(offLine), appId, nil];
    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsMultipart:array];
    [pluginResult setKeepCallbackAsBool:YES];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:_receivePayloadCallbackId];
}

- (void)GeTuiSdkDidSendMessage:(NSString *)messageId result:(int)result {
    if (!_sendMessageCallback) {
        return;
    }

    NSArray *array = [NSArray arrayWithObjects:messageId, @(result), nil];

    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsMultipart:array];
    [pluginResult setKeepCallbackAsBool:YES];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:_sendMessageCallback];
}

- (void)GeTuiSdkDidSetPushMode:(BOOL)isModeOff error:(NSError *)error {
    if (!_setPushModeCallbackId) {
        return;
    }

    CDVPluginResult *pluginResult = nil;
    [pluginResult setKeepCallbackAsBool:YES];
    if (error) {
        NSArray *array = [NSArray arrayWithObjects:@(isModeOff), [self errorToDict:error], nil];
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsMultipart:array];
    } else {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsBool:isModeOff];
    }
    [pluginResult setKeepCallbackAsBool:YES];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:_setPushModeCallbackId];
}

- (void)GeTuiSdkDidAliasAction:(NSString *)action result:(BOOL)isSuccess sequenceNum:(NSString *)aSn error:(NSError *)aError{
    if (!_aliasActionCallbackId) {
        return;
    }

    CDVPluginResult *pluginResult = nil;
    [pluginResult setKeepCallbackAsBool:YES];
    NSArray *array = [NSArray arrayWithObjects:action,@(isSuccess),aSn,[self errorToDict:aError],nil];
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsMultipart:array];
    [pluginResult setKeepCallbackAsBool:YES];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:_aliasActionCallbackId];
}

- (void)GeTuiSdkDidSetTagsAction:(NSString *)sequenceNum result:(BOOL)isSuccess error:(NSError *)aError {
    if (!_tagsActionCallbackId) {
        return;
    }
    CDVPluginResult *pluginResult = nil;
    [pluginResult setKeepCallbackAsBool:YES];
    NSArray *array = [NSArray arrayWithObjects:sequenceNum,@(isSuccess),[self errorToDict:aError],nil];
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsMultipart:array];
    [pluginResult setKeepCallbackAsBool:YES];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:_tagsActionCallbackId];
}

- (void)GetuiSdkDidQueryTag:(NSArray*)aTags sequenceNum:(NSString *)aSn error:(NSError *)aError {
    if (!_queryTagCallbackId) {
        return;
    }
    CDVPluginResult *pluginResult = nil;
    [pluginResult setKeepCallbackAsBool:YES];
    NSArray *array = [NSArray arrayWithObjects:aTags,aSn,[self errorToDict:aError],nil];
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsMultipart:array];
    [pluginResult setKeepCallbackAsBool:YES];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:_queryTagCallbackId];
}
- (void)GeTuiSdkDidOccurError:(NSError *)error {
    if (!_occurErrorCallbackId) {
        return;
    }

    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR
                                                  messageAsDictionary:[self errorToDict:error]];
    [pluginResult setKeepCallbackAsBool:YES];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:_occurErrorCallbackId];
}


- (void)setGeTuiSdkDidRegisterClientCallback:(CDVInvokedUrlCommand *)command {
    _registerClientCallbackId = command.callbackId;
}

- (void)setGeTuiSDkDidNotifySdkStateCallback:(CDVInvokedUrlCommand *)command {
    _notifySdkStateCallbackId = command.callbackId;
}

- (void)setGeTuiSdkDidReceivePayloadCallback:(CDVInvokedUrlCommand *)command {
    _receivePayloadCallbackId = command.callbackId;
}

- (void)setGeTuiSdkDidSendMessageCallback:(CDVInvokedUrlCommand *)command {
    _sendMessageCallback = command.callbackId;
}

- (void)setGeTuiSdkDidSetPushModeCallback:(CDVInvokedUrlCommand *)command {
    _setPushModeCallbackId = command.callbackId;
}

- (void)setGeTuiSdkDidAliasActionCallback:(CDVInvokedUrlCommand *)command {
    _aliasActionCallbackId = command.callbackId;
}

- (void)setGeTuiSdkDidTagsActionCallback:(CDVInvokedUrlCommand *)command {
    _tagsActionCallbackId = command.callbackId;
}

- (void)setGeTuiSdkDidQueryTagCallback:(CDVInvokedUrlCommand *)command {
    _queryTagCallbackId = command.callbackId;
}

- (void)setGeTuiSdkDidOccurErrorCallback:(CDVInvokedUrlCommand *)command {
    _occurErrorCallbackId = command.callbackId;
}


#pragma mark - VOIP related

// 实现 PKPushRegistryDelegate 协议方法

/** 系统返回VOIPToken，并提交个推服务器 */
- (void)pushRegistry:(PKPushRegistry *)registry didUpdatePushCredentials:(PKPushCredentials *)credentials forType:(NSString *)type {
    // [ GTSDK ]：（新版）向个推服务器注册 VoipToken
    [GeTuiSdk registerVoipTokenCredentials:credentials.token];
        
    // [ 测试代码 ] 日志打印DeviceToken
    NSLog(@"[ TestDemo ] [ VoipToken(NSData) ]: %@\n\n", credentials.token);
}

/** 接收VOIP推送中的payload进行业务逻辑处理（一般在这里调起本地通知实现连续响铃、接收视频呼叫请求等操作），并执行个推VOIP回执统计 */
- (void)pushRegistry:(PKPushRegistry *)registry didReceiveIncomingPushWithPayload:(PKPushPayload *)payload forType:(NSString *)type {
    //个推VOIP回执统计
    [GeTuiSdk handleVoipNotification:payload.dictionaryPayload];
    
    //TODO:接受VOIP推送中的payload内容进行具体业务逻辑处理
    NSLog(@"[Voip Payload]:%@,%@", payload, payload.dictionaryPayload);
    
    if (!_didReceiveIncomingVoipPushCallback) {
        return;
    }
    
    NSArray *array = [NSArray arrayWithObjects:payload.dictionaryPayload[@"payload"], payload.dictionaryPayload[@"_gmid_"], type, nil];
    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsMultipart:array];
    [pluginResult setKeepCallbackAsBool:YES];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:_didReceiveIncomingVoipPushCallback];
}

- (void)voipRegistrationWithVoipPushCallback:(CDVInvokedUrlCommand *)command {
    dispatch_queue_t mainQueue = dispatch_get_main_queue();
    PKPushRegistry *voipRegistry = [[PKPushRegistry alloc] initWithQueue:mainQueue];
    voipRegistry.delegate = self;
    // Set the push type to VoIP
    voipRegistry.desiredPushTypes = [NSSet setWithObject:PKPushTypeVoIP];
    _didReceiveIncomingVoipPushCallback = command.callbackId;
}

- (NSDictionary *)errorToDict:(NSError *)error {
    return error ? @{ @"code" : @(error.code),
                      @"desc" : error.localizedDescription }
    : nil;
}

@end
