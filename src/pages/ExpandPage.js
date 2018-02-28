import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Animated
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import ScalingButton from '../components/ScalingButton';

export default class ExpandPage extends Component {

  constructor(props) {
    super(props);
    this.y_translate = new Animated.Value(0);
    this.state = {
      menu_expanded: false
    };
  }

  openMenu() {
    this.setState({
      menu_expanded: true
    }, () => {
      this.y_translate.setValue(0);
      Animated.spring(
        this.y_translate,
        {
          toValue: 1,
          friction: 3
        }
      ).start();
    });
  }

  hideMenu() {
    this.setState({
      menu_expanded: false
    }, () => {
      this.y_translate.setValue(1);
      Animated.spring(
        this.y_translate,
        {
          toValue: 0,
          friction: 4
        }
      ).start();
    });
  }

  render() {
    const menu_moveY = this.y_translate.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -300]
    });
    
    return (
      <View style={styles.container}>
        <View style={styles.body}></View>
        <Animated.View 
          style={[ 
            styles.footer_menu,
            {
              transform: [
                {
                  translateY: menu_moveY
                }
              ]
            }
          ]}
        >
          {
            !this.state.menu_expanded &&
            <View style={styles.tip_menu}>
              <ScalingButton onPress={this.openMenu.bind(this)} noDefaultStyles={true}>
                <Icon name="ellipsis-h" size={50} color="#fff" />
              </ScalingButton>
            </View>
          } 
          
          {
            this.state.menu_expanded &&
            <View>
              <ScalingButton 
                onPress={this.hideMenu.bind(this)} 
                label="add people" 
                style={{ button: styles.button, label: styles.button_label }} />
              <ScalingButton 
                onPress={this.hideMenu.bind(this)} 
                label="sign out" 
                style={{ button: styles.button, label: styles.button_label }} />
              <ScalingButton 
                onPress={this.hideMenu.bind(this)} 
                label="cancel" 
                style={{ button: styles.button, label: styles.button_label }} />
            </View>
          }
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 10,
    flexDirection: 'column'
  },
  body: {
    flex: 10,
    backgroundColor: '#ccc'
  },
  footer_menu: {
    position: 'absolute',
    width: 600,
    height: 350, 
    bottom: -300, 
    backgroundColor: '#1fa67a',
    alignItems: 'center'
  },
  tip_menu: {
    flexDirection: 'row'
  },
  button: {
    backgroundColor: '#fff'
  },
  button_label: {
    fontSize: 20,
    fontWeight: 'bold'
  }
});
