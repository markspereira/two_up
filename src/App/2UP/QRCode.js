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
      players: 0
    };
  }


  componentDidMount() {
    setTimeout(() => this.setState({players: 1}), 1000);
    setTimeout(() => this.setState({players: 2}), 2000);
    setTimeout(() => this.setState({players: 3}), 3000);
    setTimeout(() => this.setState({players: 4}), 3500);
    setTimeout(() => this.setState({players: 5}), 4000);
    setTimeout(() => this.setState({players: 6}), 5000);
  }

  _startGame = () => {
    navigate('Kip');
  };

  _getPubAddress = () => {

    const clipboard = async () => {
      return await Clipboard.getString('0x37386A1c592Ad2f1CafFdc929805aF78C71b1CE7');
    };

    clipboard().then(e => this.props.toast.show('Copied!')) ;
  };

  render() {
    const {} = this.state;
    const {isVisible, balance} = this.props;
    return (
      <View style={{flex: 1, backgroundColor: color.blue, alignItems: 'center', justifyContent: 'space-around'}}>
        <QRCode
          size={300}
          value="0x37386A1c592Ad2f1CafFdc929805aF78C71b1CE7"
          logo={require('../../../public/ethereum_coin.png')}
          logoSize={100}
          logoBackgroundColor='transparent'
          color={color.darkBlue}
          backgroundColor='transparent'
        />
        <Text style={{fontSize: 20, color: color.darkBlue, fontWeight: 'bold'}}>Players: {this.state.players}</Text>
        <TouchableOpacity onPress={this._startGame} style={{ backgroundColor: color.darkBlue, borderRadius: 10, height: 50, width: 250, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{fontSize: 20, color: color.blue, fontWeight: 'bold'}}>Start Game</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

