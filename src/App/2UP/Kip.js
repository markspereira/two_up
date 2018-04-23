import React, { Component } from 'react';
import {
  Animated,
  Easing,
  AlertIOS,
  AppRegistry,
  Clipboard,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableNativeFeedback,
  Vibration,
  View,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import LottieView from 'lottie-react-native';

const yellow = '#fffb00';
import { text } from "./themes";
import { navigate } from "../../../utils/navigationWrapper";
import {color} from "./themes";

let {height, width} = Dimensions.get('window');

export default class PublicQRCode extends Component {
  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return {
      tabBarVisible: false,
      headerVisible: false,
      headerStyle:
        {
          position: 'absolute',
          marginTop: -100,
          backgroundColor: 'transparent',
          zIndex: 100,
          top: 0,
          left: 0,
          right: 0,
          borderBottomWidth: 0,
        },
    }
  };

  constructor() {
    super();
    this.state = {
      visibleModal: null,
      receiverAddress: '',
      amount: null,
      publicAddress: '0x37386A1c592Ad2f1CafFdc929805aF78C71b1CE7',
      privKey: 'cf06f0b35515af10b5dfef470e3a1e743470bf9033d06f198b4e829cb2e7ef05',
      progress: new Animated.Value(0),
    };
    this.setAnim = this.setAnim.bind(this);
  }

  componentDidMount() {
    this.anim.play();

    Animated.timing(this.state.progress, {
      toValue: 1,
      easing: Easing.linear,
    }).start();
  }

  setAnim(anim) {
    this.anim = anim;
  }

  _startGame = () => {
    navigate('Kip');
  };

  _getPubAddress = () => {

    const clipboard = async () => {
      return await Clipboard.getString('0x37386A1c592Ad2f1CafFdc929805aF78C71b1CE7');
    };

    clipboard().then(e => this.props.toast.show('Copied!'));
  };

  render() {
    const {} = this.state;
    const {isVisible, balance} = this.props;
    return (
    <View style={{flex: 1, backgroundColor: color.blue, alignItems: 'center', justifyContent: 'flex-end'}}>
      <View style={{backgroundColor: '#60211A', borderTopLeftRadius: 10, borderTopRightRadius: 10, width: 250, height: 550, alignItems: 'center', justifyContent: 'space-around' }}>
        {/*<Image style={{height: 200, resizeMode: 'contain'}} source={require('../../../public/ethereum_coin.png')} />*/}
        <LottieView style={{height: 200}} source={require('../../../public/data.json')} ref={this.setAnim} autoplay loop/>
        <Image style={{height: 200, resizeMode: 'contain'}} source={require('../../../public/tails.png')} />
      </View>
    </View>

    )
  }
}

