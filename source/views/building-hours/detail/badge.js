/**
 * @flow
 *
 * <Badge/> renders the [Open] / [Closed] / [IDK] badge on the detai view
 */

import React from 'react'
import {View, Text, StyleSheet, Platform} from 'react-native'
import * as c from '../../components/colors'

const BGCOLORS = {
  Open: c.moneyGreen,
  Closed: c.salmon,
}

export class Badge extends React.PureComponent {
  props: {status: string}

  render() {
    const {status} = this.props
    const bgColor = BGCOLORS[status] || c.goldenrod

    return (
      <View style={[styles.badge, {backgroundColor: bgColor}]}>
        <Text selectable={true} style={styles.badgeText}>
          {status}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  badge: {
    marginTop: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 5,
    alignSelf: 'center',
    ...Platform.select({
      android: {
        marginBottom: 14,
      },
    }),
  },
  badgeText: {
    color: c.white,
    fontSize: 18,
  },
})
