/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var KAppId = 'iMahVVxurw6BNr7XSn9EF2';
var KAppKey = 'yIPfqwq6OMAPp6dkqgLpG5';
var KAppSecret = 'G0aBqAD6t79JfzTB6Z5lo5';

var app = {
    _isPushModeOff: false,

    initialize: function() {

        app.bindEvents();
    },

    bindEvents: function() {
        document.addEventListener('deviceready', app.onDeviceReady, false);
    },

    onDeviceReady: function() {

        StatusBar.styleDefault();

        var isPushModeOff = localStorage.getItem('isPushModeOff');
        if (isPushModeOff != null) {
            _isPushModeOff = isPushModeOff;
        } else {
            _isPushModeOff = false;
        }
        app.updatePushModeView(_isPushModeOff);

        var updateVersion = function(version) {
            $('#title-label').html('个推开发平台测试客户端' + version);
        };
        GeTuiSdk.version(updateVersion);
        GeTuiSdk.setGeTuiSdkDidRegisterClientCallback(app.onRegisterClient);
        GeTuiSdk.setGeTuiSdkDidReceivePayloadCallback(app.onReceivePayload);
        GeTuiSdk.setGeTuiSdkDidSendMessageCallback(app.onSendMessage);
        GeTuiSdk.setGeTuiSdkDidOccurErrorCallback(app.onOccurError);
        GeTuiSdk.setGeTuiSDkDidNotifySdkStateCallback(app.onNotifySdkState);
        GeTuiSdk.setGeTuiSdkDidSetPushModeCallback(app.onSetPushMode);
        GeTuiSdk.setGeTuiSdkDidAliasActionCallback(app.onSetAliasAction);

        app.startGeTuiSdk();

        $('#appKey').val(KAppKey);
        $('#appSecret').val(KAppSecret);
        $('#appId').val(KAppId);

        app.registerRemoteNotification();
    },

    startGeTuiSdk: function() {
        GeTuiSdk.startSdkWithAppId(KAppId, KAppKey, KAppSecret);
    },

    registerRemoteNotification: function() {
        var options = {
            ios: {
                alert: "true",
                badge: "true",
                sound: "true"
            }
        };

        var push = PushNotification.init(options);

        var onRegistration = function(data) {
            console.log(data.registrationId+' deviceToken');
            GeTuiSdk.registerDeviceToken(data.registrationId);
        };
        push.on('registration', onRegistration);

        var onNotification = function(data) {
            var date = new Date();
            var dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
            app.log('[APN] ' + dateStr + 'title:' + data.title + ' message:' + data.message);
        };
        push.on('notification', onNotification);

        var onError = function(e) {
            GeTuiSdk.registerDeviceToken('');
            app.log('didFailToRegisterForRemoteNotificationsWithError' + e.message);
        };
        push.on('error', onError);
    },

    onRegisterClient: function(clientId) {
        $('#clientId').val(clientId);
    },

    onReceivePayload: function(payloadData, taskId, msgId, offLine, appId) {
        app.log('payloadData:' + payloadData)
    },

    onSendMessage: function(messageId, result) {
        app.log('SendMessage:' + messageId + 'result:' + result);
    },

    onOccurError: function(err) {
        app.log('OccurError Error code:' + err.code + ' error desc:' + err.desc);
    },

    onNotifySdkState: function(status) {
        var callback = function(status) {
            switch (status) {
                case GeTuiSdk.GeTuiSdkStatus.KSdkStatusStarting:
                    $('#status').val('正在启动');
                    $('#startupBtn').html('正在启动');
                    break;
                case GeTuiSdk.GeTuiSdkStatus.KSdkStatusStarted:
                    $('#status').val('已启动');
                    $('#startupBtn').html('销毁');
                    break;
                case GeTuiSdk.GeTuiSdkStatus.KSdkStatusStoped:
                    $('#status').val('已销毁');
                    $('#startupBtn').html('启动');
                    $('#clientId').val('');
                    break;
                default:
                    break;
            }
        };

        GeTuiSdk.status(callback);
    },

    onSetPushMode: function(isModeOff, err) {
        if (err != null) {
            app.log('SetPushMode Error code:' + err.code + ' error desc:' + err.desc);
        } else {
            _isPushModeOff = isModeOff;
            localStorage.setItem('isPushModeOff', _isPushModeOff);
            app.updatePushModeView(isModeOff);
        }
    },

    onSetAliasAction: function(action, isSuccess, aSn,err) {
        if (err != null) {
            app.log('SetPushMode Error code:' + err.code + ' error desc:' + err.desc);
        } else {
            app.log('action ->'+action+' isSuccess ->'+isSuccess+' sn ->'+aSn);
        }
    },

    updatePushModeView: function(isModeOff) {
        if (isModeOff) {
            $('#pushModle').val('销毁');
            $('#pushModeBtn').html('开启推送');
        } else {
            $('#pushModeBtn').html('销毁推送');
            $('#pushModle').val('开启');
        }
    },

    log: function(txt) {
        if (txt) {
            var logger = $('#logger');
            if (logger) {
                logger.val(logger.val() + txt + '\n');
            }
        }
    },

    cleanLog: function() {
        var logger = $('#logger');
        if (logger) {
            logger.val('');
        }
    },

    onPushModeBtnClicked: function() {
        if (_isPushModeOff) {
            GeTuiSdk.setPushModeOn();
        } else {
            GeTuiSdk.setPushModeOff();
        }
    },

    onStartupBtnClicked: function() {
        GeTuiSdk.status(function(status) {
                        switch (status) {
                            case GeTuiSdk.GeTuiSdkStatus.KSdkStatusStarted:
                                GeTuiSdk.destroy();
                                break;
                            case GeTuiSdk.GeTuiSdkStatus.KSdkStatusStoped:
                                app.startGeTuiSdk();
                                break;
                            default:
                                break;
                        }
                    });
    },

    onTestMoreBtnClicked: function() {
        var callback = function(buttonIndex) {
            if (buttonIndex == 1) {
                var html = $('#testMoreViewWrapper').val();
                var pageii = layer.open({
                                        type: 1,
                                        content: html,
                                        style: 'position:fixed; left:0; top:0; width:100%; height:100%; border:none; background:white;'
                                    });
            }

        };

        var options = {
            'addDestructiveButtonWithLabel' : '更多功能测试',
            'addCancelButtonWithLabel': '取消'
        };

        plugins.actionsheet.show(options, callback);
    },

    updateTestGetLabel:function(txt) {
        $('#test-get-label').val(txt);
    },

    onTestGetVersion: function() {
        GeTuiSdk.version(app.updateTestGetLabel);
    },

    onTestGetClientId: function() {
        GeTuiSdk.clientId(app.updateTestGetLabel);
    },

    onTestSetBadge:function() {
      var badge = $('#badge').val();

      if (badge && badge.length > 0) {
          GeTuiSdk.setBadge(Number(badge));
          app.showDialog('Badge', '角标设置成功');
      }
    },

    onTestResetBadge:function() {
       GeTuiSdk.resetBadge()
       app.showDialog('Badge', '重置角标成功');
    },

    onTestGetStatus: function() {
        var callback = function(status) {
            switch (status) {
                case GeTuiSdk.GeTuiSdkStatus.KSdkStatusStarting:
                    app.updateTestGetLabel('正在启动');
                    break;
                case GeTuiSdk.GeTuiSdkStatus.KSdkStatusStarted:
                    app.updateTestGetLabel('已启动');
                    break;
                case GeTuiSdk.GeTuiSdkStatus.KSdkStatusStoped:
                    app.updateTestGetLabel('已销毁');
                    break;
                default:
                    break;
            }
        };

        GeTuiSdk.status(callback);
    },

    onTestCleanAllNotification: function() {
        GeTuiSdk.clearAllNotificationForNotificationBar();
        app.updateTestGetLabel('清除所有通知');
    },

    showDialog: function(title, content) {
        layer.open({ content: content, btn: ['OK'] });
    },

    onTestRegisterDeviceToken: function() {
        var token = $('#deviceToken').val();
        if (token && token.length > 0) {

            GeTuiSdk.registerDeviceToken(token);
            app.showDialog('DeviceToken', '设置成功');
        }
    },

    onTestSetTags: function() {
        var tags = $('#tags').val();
        if (tags && tags.length > 0) {
            var callback = function(result) {
                if (result) {
                   app.showDialog('tags', '设置成功');
                } else {
                    app.showDialog('tags', '设置失败');
                }
            }
            GeTuiSdk.setTags(callback, tags.split(','));
        }
    },

    onTestBindAlias: function() {
        var alias = $('#alias').val();
        var sn = $('#sn').val();
        if (alias && alias.length > 0 && sn && sn.length > 0) {
            GeTuiSdk.bindAlias(alias,sn);
            app.showDialog('Alias', '设置成功');
        }

    },

    onTestUnbindAlias: function() {
        var alias = $('#alias').val();
         var sn = $('#sn').val();
        if (alias && alias.length > 0 && sn && sn.length > 0) {
            GeTuiSdk.unbindAlias(alias,sn);
            app.showDialog('Alias', '设置成功');
        }
    },

    onTestSendMessage: function() {
        var message = $('#message').val();
        if (message && message.length > 0) {
            var successCallback = function(msgId) {
                app.showDialog('SendMessage', '发送成功');
            }

            var errorCallback = function(error) {
                app.showDialog('SendMessage', '发送失败');
            }

            GeTuiSdk.sendMessage(successCallback, errorCallback, message);
        }
    },

    onTestSetChannelId: function(){
        var channelId = $('#channelid').val();
        if (channelId && channelId.length > 0) {
            GeTuiSdk.setChannelId(channelId);
            app.showDialog('setChannelId', '设置成功');
        }
    }
};
