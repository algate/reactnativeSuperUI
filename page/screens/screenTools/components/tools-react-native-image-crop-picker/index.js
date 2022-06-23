import React from 'react';
import { computed, observable, observe, runInAction } from 'mobx';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { Animated, Text, View, ScrollView } from 'react-native';
import { createNavigationScrollAnimator } from '../../../../config/navigation';
import ActionSheet from '../../../../components/ActionSheet';
import ImagePicker from 'react-native-image-crop-picker';
import Dialog from '../../../../components/Dialog';

const UploadImage = styled.TouchableOpacity`
  width: 160px;
  height: 48px;
  justify-content: center;
  align-items: center;
  background: #00DCCA;
  border-radius: 10px;
  margin: 16px;
`

const absoluteFill = `
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const AnimatedBackground = styled(Animated.View)`
  ${absoluteFill}
`;
@observer
class Faker extends React.Component {

  /* static options = props => {
    console.log(props);
    const opacity = scrollAnimator ? scrollAnimator.normalizedValue : 0;
    let animateElementList = props?.animateElements;
    if (!scrollAnimator) {
      animateElementList = [];
    } else if (isUndefined(animateElements)) {
      animateElementList = float ? ['background', 'title'] : ['background'];
    }
    return {
      headerBackground: () => (
        <AnimatedBackground
          style={{
            opacity
          }}
        />
      ),
      headerTitleStyle: {
        opacity: animateElementList.includes('title') ? opacity : 1
      }
    }
  } */

  constructor(props) {
    super(props);
    // this.scrollAnimator = createNavigationScrollAnimator();
    // props.navigation.setParams({ scrollAnimator: this.scrollAnimator });
  }

  @observable images = [];

  onPressAddImage = () => {
    this.selectImages();
  }

  selectImages() {
    if (this.images.length === 9 ) {
      Dialog.alert({
        message: '最多能选9张图片'
      });
      return;
    }

    const num = 9 - this.images.length;

    ActionSheet.showActionSheetWithOptions(
      {
        title: `请选择图片上传方式`,
        options: ['拍照', '从手机相册选择', '取消'],
        cancelButtonIndex: 2,
      },
      async (index) => {
        let pickResult = null;
        try {
          if (index === 0) {
            pickResult = await ImagePicker.openCamera({
              width: 180,
              height: 180,
              loadingLabelText: '正在处理图片...',
              mediaType: 'photo'
            });
          } else if (index === 1) {
            pickResult = await ImagePicker.openPicker({
              width: 180,
              height: 180,
              loadingLabelText: '正在处理图片...',
              mediaType: 'photo',
              multiple: true,
              maxFiles: num
            });
          }
        } catch (error) {
          if (error.code === 'E_PERMISSION_MISSING') {
            // this._hud.show({ title: '无访问权限', duration: Hud.DURATION_SHORT });
          } else if (error.code === 'E_PICKER_CANNOT_RUN_CAMERA_ON_SIMULATOR') {
            // this._hud.show({ title: '请使用真机测试相机功能', duration: Hud.DURATION_SHORT });
          } else if (error.code !== 'E_PICKER_CANCELLED') {
            console.warn('Error to pick image', error);
            // this._hud.show({ title: `出现错误: ${error.code}`, duration: Hud.DURATION_SHORT });
          }
        }

        const pickImages = Array.isArray(pickResult) ? pickResult : [pickResult];

        if(!pickResult) {
          return
        }

        runInAction(() => {
          this.images = [...this.images, ...pickImages];
        })
      }
    );
  }
  render() {
    return (
      <View style={{ height: '100%' }}>
        <ScrollView>
          <UploadImage onPress={this.onPressAddImage}>
            <Text style={{color: '#fff', fontSize: 18, fontWeight: '500'}}>上传</Text>
          </UploadImage>
        </ScrollView>
      </View>
    );
  }
}

export default Faker;
