cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-actionsheet/www/ActionSheet.js",
        "id": "cordova-plugin-actionsheet.ActionSheet",
        "pluginId": "cordova-plugin-actionsheet",
        "clobbers": [
            "window.plugins.actionsheet"
        ]
    },
    {
        "file": "plugins/cordova-plugin-statusbar/www/statusbar.js",
        "id": "cordova-plugin-statusbar.statusbar",
        "pluginId": "cordova-plugin-statusbar",
        "clobbers": [
            "window.StatusBar"
        ]
    },
    {
        "file": "plugins/cordova-plugin-whitelist/whitelist.js",
        "id": "cordova-plugin-whitelist.whitelist",
        "pluginId": "cordova-plugin-whitelist",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-getuisdk/android/www/GeTuiSdk.js",
        "id": "cordova-plugin-getuisdk.GeTuiSdkPlugin",
        "pluginId": "cordova-plugin-getuisdk",
        "clobbers": [
            "GeTuiSdkPlugin"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-actionsheet": "2.2.0",
    "cordova-plugin-console": "1.0.2",
    "cordova-plugin-statusbar": "2.0.1-dev",
    "cordova-plugin-whitelist": "1.2.0",
    "cordova-plugin-getuisdk": "1.0.0"
}
// BOTTOM OF METADATA
});