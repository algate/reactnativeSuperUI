![](SuperIcon.png)

是不是还在为RN开发找相关合适的组件再发愁，Now，She is Coming！
有部分效果图如下：

<image src="shot2.png" style="width: 200px;"/><image src="shot3.png" style="width: 200px;"/><image src="shot4.png" style="width: 200px;"/><image src="shot5.png" style="width: 200px;"/>

本App名称为SuperUI，相关`react-native`和组件的版本在 `package.json` 查看。
简单说明下：
1. 此项目为RN开发测试为基础，建立的组件工具库项目。项目中使用的组件和特效除去本人开发的相关的内容之外，资源全部来源于网络，感谢开源的伟大精神！🙏🙏🙏！

2. 项目中使用的相关组件全部都有Github地址和官方预览地址。页面特效来源于网络资源！app中已经添加来源地址！

3. 有三个菜单 

	「1」本人项目工作和学习中测试和调试页面 - 完成之后都会总结到第二个Center页面的相关目录中；

	「2」组件工具库, 网络学习资源特效, 本人工作相关性代码暂不对外开放请尊重下

	「3」特效来源于网络，后期改造成个人中心｜或者博客｜…… 内容待定

# 项目启动
## 1. git clone 

## 2. yarn

## 3. cd ios

在 `pod install` 之前

>安装 `Icon` 图标库 react-native-vector-icons
[react-native-vector-icons 的所有图标集合](https://oblador.github.io/react-native-vector-icons/)

### 步骤1:
`cd ios/reactnativeSuperUI/Info.plist`
中增加如下代码：
``` js
  <key>UIAppFonts</key>
	<array>
		<string>AntDesign.ttf</string>
		<string>Entypo.ttf</string>
		<string>EvilIcons.ttf</string>
		<string>Feather.ttf</string>
		<string>FontAwesome.ttf</string>
		<string>FontAwesome5_Brands.ttf</string>
		<string>FontAwesome5_Regular.ttf</string>
		<string>FontAwesome5_Solid.ttf</string>
		<string>Foundation.ttf</string>
		<string>Ionicons.ttf</string>
		<string>MaterialIcons.ttf</string>
		<string>MaterialCommunityIcons.ttf</string>
		<string>SimpleLineIcons.ttf</string>
		<string>Octicons.ttf</string>
		<string>Zocial.ttf</string>
	</array>
```
### 步骤2:
在 Xcode 把 `./node_modules/react-native-vector-icons` 的 `Fonts` 文件拖拽到 `reactnativeSuperUI` 的文件里边

## 4. pod install

> 背墙问题：
（DoubleConversion）；
glob-0.3.5.tar.gz；
fmt-6.2.1.tar.gz；
Flipper-Boost-IOSX-1.76.0.1.11.tar.gz；
flipper-0.99.0.tar.gz；
…… 等等需要单独下载

下载之后具体操作：
(RN版本在>=0.58)
```json
{
	"one": "将压缩包放到 ~/Library/Caches/com.facebook.ReactNativeBuild" 
}
```
(RN版本在<0.58) -- 最新的就忽略吧
```json
{
	"one": "将压缩包放到 ~/.rncache目录下" 
}
```

## 5. yarn ios
## 6. 项目配置
### 配置app的图标和名称：(如果要区分debug和release版本继续看下方相关问题说明)
制作ICON图标(https://icon.wuruihong.com/)

----------------------------------------------------------------
# 额外配置：
### 1. 使用echarts需要 配置Android 

现提供两种方式：
#### 「1」WebView
依旧用 `WebView` 引入，用 `httpServer` 启动 echarts的HTML 达到调试渲染页面的
#### 「2」victory-native
使用SVG渲染的组件 `victory-native`，在 `page/screens/screenHome/home_victory-native.js` 作为范例

	需要提醒的是：【由于兼容性问题：此项目已经删除 `native-echarts` 或者 `react-native-zy-echarts`】

	如果简单使用，不做过度的修改可以使用（`react-native` 中使用 `echrts`： 在 `android` 下显示报错，需要做如下操作，才能在app上正常显示）：
	复制文件tpl.html。路径： node_modules\native-echarts\src\components\Echarts）至android\app\src\main\assets目录下

### 2. 配置多个RN启动项目（这个不重要，可以略过）

(1). react-native start --port=8082

(2). 永久修改Server端口
```js
{
	"1": "node_modules/react-native/local-cli/server/server.js 下修改 8081 => 80**",
	"2": "XCode 打开项目",
	"3-ios":[ 
		// 1. 可以借助 Show the Find navigator 
		// 2. 或者修改下列文件
		RCTWebSocketExecutor.m
		RCTBridgeDelegate.h
		RCTBundleURLProvider.m
		RCTInspectorDevServerHelper.mm
		RCTPackagerConnectionBridgeConfig.m
	],
	"3-android":[
		// 1. 可以通过调试工具修改 - Debug server host & port for device
		// 2. 或者修改下列文件
		AndroidInfoHelpers.java
	],
}
```

### 3. RN 加载 svg文件 （react-native-svg-transformer）
首先安装 `react-native-svg`
具体配置项看官方文档(https://github.com/kristerkari/react-native-svg-transformer)

### 4. android版本导致到app图标兼容性问题：android:roundIcon="@mipmap/ic_launcher_round"
	由于 Android8 之后 就没有这个图标了，需要修改 AndroidManifest.xml 中的此处。
	ic_launcher_round => ic_launcher

### 5. 配置buildTypes 区分DEBUG和RELEASE模式
	目录 `andriod/app/build.gradle` 非 `android/build.gradle` 中配置不同环境的包APP相关配置：resValue "string", "app_name", "SuperUI.DEBUG"
```js
{	
	"1. debug和release下增加": "resValue 'string', 'app_name', '*****.DEBUG'",
	"2. android/app/src/main/res/values/strings.xml": "注释掉app_name的相关配置"
}
```
### 6. 打包正式包（更详细具体的，签名之类的相关看官网说明）
android文件夹下执行：
```cmd
./gradlew assembleRelease
```
安装包在文件夹下：h2c_app/android/app/build/outputs/apk/release

安装包安装到外部设备： adb -s ****** install app-release.apk

