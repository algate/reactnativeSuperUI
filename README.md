## git clone 

## yarn

## cd ios

在 `pod install` 之前

1.安装 `Icon` 图标库
[react-native-vector-icons 的所有图标集合](https://oblador.github.io/react-native-vector-icons/)

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
在 Xcode 把 `./node_modules/react-native-vector-icons` 的 `Fonts` 文件拖拽到 `reactnativeSuperUI` 的文件里边

## pod install

## yarn ios


### 配置Android

1.`react-native` 中使用 `echrts`
（由于低版本才支持 `webview`，`native-echarts` 已经不支持，因此使用 `react-native-zy-echarts` ）。
在 `android` 下显示报错，需要做如下操作，才能在 · 上正常显示：
复制文件tpl.html（路径： node_modules\native-echarts\src\components\Echarts）至android\app\src\main\assets目录下


# 项目配置
制作ICON图标(https://icon.wuruihong.com/)