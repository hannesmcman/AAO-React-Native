// @flow

import React from 'react'
import type {OtherModeType} from '../types'
import {ListRow, Detail, Title} from '../../components/list'
import {Column, Row} from '../../components/layout'

type Props = {
  onPress: OtherModeType => any,
  mode: OtherModeType,
}

export class OtherModesRow extends React.PureComponent<Props> {
  _onPress = () => this.props.onPress(this.props.mode)

  render() {
    const {mode} = this.props

    return (
      <ListRow onPress={this._onPress} arrowPosition="top">
        <Row alignItems="center">
          <Column flex={1}>
            <Title lines={1}>{mode.name}</Title>
            <Detail lines={1}>{mode.description}</Detail>
          </Column>
        </Row>
      </ListRow>
    )
  }
}
