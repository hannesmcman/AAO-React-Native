// @flow

import React from 'react'
import {Platform} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import {Touchable} from '../touchable'
import {rightButtonStyles as styles} from './styles'

export class ShareButton extends React.PureComponent {
  props: {
    onPress: () => any,
  }

  render() {
    return (
      <Touchable
        highlight={false}
        style={styles.button}
        onPress={this.props.onPress}
      >
        {Platform.OS === 'ios' ? (
          <Icon style={styles.icon} name="ios-share-outline" />
        ) : (
          <Icon style={styles.icon} name="md-share" />
        )}
      </Touchable>
    )
  }
}
