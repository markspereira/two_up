import React, { Component } from 'react';
import {
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

const yellow = '#fffb00';
import { text } from "./themes";
import {navigate, resetAction} from "../../../utils/navigationWrapper";
import {color} from "./themes";
import * as Animatable from 'react-native-animatable';


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
    };
  }

  _newGame = () => {
    resetAction(0, 'Home')
  };

  render() {
    const {} = this.state;
    const {isVisible, balance} = this.props;
    return (
      <View style={{flex: 1, backgroundColor: color.blue, alignItems: 'center', justifyContent: 'space-around'}}>
        <Animatable.View animation="bounceIn" delay={500} iterationCount="infinite">
          <Text style={{fontSize: 50}}>🎉 WINNER!!🎉</Text>
        </Animatable.View>
        <Animatable.View animation="fadeIn" delay={1000} easing='ease-in'>
          <TouchableOpacity onPress={this._newGame} style={{ backgroundColor: color.darkBlue, borderRadius: 10, height: 50, width: 250, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontSize: 20, color: color.blue, fontWeight: 'bold'}}>New Game</Text>
          </TouchableOpacity>
        </Animatable.View>
      </View>
    )
  }
}