import React from 'react';
import { computed, observable, observe, runInAction } from 'mobx';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { Animated, Text, View, ScrollView, Image } from 'react-native';
import { createNavigationScrollAnimator, 
  appStackNavigationOptions, 
  NAVIGATION_TOP_AREA_HEIGHT 
} from '../../../../config/navigation';
import ActionSheet from '../../../../components/ActionSheet';
import ImagePicker from 'react-native-image-crop-picker';
import Dialog from '../../../../components/Dialog';
import { TransitionPresets } from '@react-navigation/stack';
import { system } from '../../../../config/system';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

const UploadImage = styled.TouchableOpacity`
  width: 160px;
  height: 48px;
  justify-content: center;
  align-items: center;
  background: #00DCCA;
  border-radius: 10px;
  margin: 16px;
`

const RecordImages = styled(View)`
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 10px;
`;

const ImageBox = styled(View)`
  flex-direction: row;
  width: ${(system.width-16*4)/3 - 12}px;
  height: ${(system.width-16*4)/3 - 12}px;
  position: relative;
  margin-right: 12px;
  margin-bottom: 12px;
`;

const DeleteIcon = styled.TouchableOpacity`
  position: absolute;
  right: -6px;
  top: -6px;
  background: #F86060;
  width: 16px;
  height: 16px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
`;

@observer
class ImageCropPicker extends React.Component {

  static options = appStackNavigationOptions(({ route }) => ({
    title: '图片上传组件',
    float: true,
    scrollAnimator: route.params?.scrollAnimator,    
    backgroundStyle: {
      backgroundColor: '#00DCCA'
    },
    // dark: true,
    headerTitleStyle: {
      color: '#fff'
    },
    ...TransitionPresets.ModalSlideFromBottomIOS
  }));

  constructor(props) {
    super(props);
    this.scrollAnimator = createNavigationScrollAnimator();
    props.navigation.setParams({ scrollAnimator: this.scrollAnimator });
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
            console.warn('Error to pick image', error);
          } else if (error.code === 'E_PICKER_CANNOT_RUN_CAMERA_ON_SIMULATOR') {
            console.warn('Error to pick image', error);
          } else if (error.code !== 'E_PICKER_CANCELLED') {
            console.warn('Error to pick image', error);
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

  deleteImage = (index) => {
    if (this.images.length === 1 ) {
      Dialog.alert({
        message: '至少保留一张照片',
        confirmText: '我知道了'
      });
      return;
    }
    runInAction(() => {
      this.images.splice(index, 1)
    });
  }

  render() {
    return (
      <ScrollView {...this.scrollAnimator.scrollProps}>
        <View style={{paddingTop: NAVIGATION_TOP_AREA_HEIGHT}}>
          <UploadImage onPress={this.onPressAddImage}>
            <Text style={{color: '#fff', fontSize: 18, fontWeight: '500'}}>上传</Text>
          </UploadImage>
          <RecordImages>
            {!!this.images.length ? this.images.map((image, index) => {
              const localPath = image.path;
              return (
                <ImageBox key={image.path}>
                  <Image style={{width: '100%', height: '100%', borderRadius: 8}} 
                    source={{ uri: 'file://' + localPath }}></Image>
                  <DeleteIcon onPress={() => this.deleteImage(index)}>
                    <Ionicons name={'close'} size={16} color={'#fff'} />
                  </DeleteIcon>
                </ImageBox>
              )
            }) : null}
          </RecordImages>
        </View>
      </ScrollView>
    );
  }
}

export default ImageCropPicker;
