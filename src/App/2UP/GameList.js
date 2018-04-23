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
import { navigate } from "../../../utils/navigationWrapper";
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
      start: false,
    };
  }


  componentDidMount() {
    setTimeout(() => this.setState({start: true}), 3000);
    setTimeout(() => navigate('WinnerScreen'), 12000);
  }

  render() {
    const {start} = this.state;
    const {isVisible, balance} = this.props;
    return (
      <View style={{flex: 1, backgroundColor: color.blue, alignItems: 'center', justifyContent: 'center'}}>
        {!start ? (<View>
          <Animatable.View animation="pulse" delay={1000} iterationCount='infinite'>
            <Text style={{fontSize: 40}}>Waiting for game to start...</Text>
          </Animatable.View>
        </View>): (<View>
            <Animatable.View animation="bounceIn" delay={1000}>
              <Text style={{fontSize: 50}}>1: You won 🤑</Text>
            </Animatable.View>
            <Animatable.View animation="bounceInUp" delay={2000}>
              <Text style={{fontSize: 50}}>2: You Lost 😣</Text>
            </Animatable.View>
            <Animatable.View animation="bounceInDown" delay={3000}>
              <Text style={{fontSize: 50}}>3: You won 😁</Text>
            </Animatable.View>
            <Animatable.View animation="lightSpeedIn" delay={4000}>
              <Text style={{fontSize: 50}}>4: You won 🤩</Text>
            </Animatable.View>
            <Animatable.View animation="zoomInLeft" delay={5000}>
              <Text style={{fontSize: 50}}>5: You lost 🖕</Text>
            </Animatable.View>
            <Animatable.View animation="zoomInDown" delay={6000}>
              <Text style={{fontSize: 50}}>6: You won 😎</Text>
            </Animatable.View>
            <Animatable.View animation='fadeInUp' delay={7000}>
              <Text style={{fontSize: 50}}>7: You lost 😩</Text>
            </Animatable.View>
          </View>
          )}
      </View>
    )
  }
}

