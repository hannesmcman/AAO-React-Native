// @flow

import React from 'react'
import {Dimensions, StyleSheet} from 'react-native'

import {saveHomescreenOrder} from '../../../flux/parts/homescreen'
import {connect} from 'react-redux'
import * as c from '../../components/colors'
import fromPairs from 'lodash/fromPairs'

import SortableList from 'react-native-sortable-list'

import type {ViewType} from '../../views'
import {allViews} from '../../views'
import {EditHomeRow} from './row'

const objViews = fromPairs(allViews.map(v => [v.view, v]))

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: c.iosLightBackground,
    paddingTop: 10,
    paddingBottom: 20,
    flexDirection: 'column',
    alignItems: 'stretch',
  },
})

type Props = {
  onSaveOrder: (string[]) => any,
  order: string[],
}

type State = {
  width: number,
}

class EditHomeView extends React.PureComponent<void, Props, State> {
  static navigationOptions = {
    title: 'Edit Home',
  }

  state = {
    width: Dimensions.get('window').width,
  }

  componentWillMount() {
    Dimensions.addEventListener('change', this.handleResizeEvent)
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.handleResizeEvent)
  }

  handleResizeEvent = event => {
    this.setState(() => ({width: event.window.width}))
  }

  renderRow = ({data, active}: {data: ViewType, active: boolean}) => (
    <EditHomeRow data={data} active={active} width={this.state.width} />
  )

  onChangeOrder = (order: string[]) => this.props.onSaveOrder(order)

  render() {
    return (
      <SortableList
        contentContainerStyle={[
          styles.contentContainer,
          {width: this.state.width},
        ]}
        data={objViews}
        order={this.props.order}
        onChangeOrder={this.onChangeOrder}
        renderRow={this.renderRow}
      />
    )
  }
}

function mapState(state) {
  return {
    order: state.homescreen.order,
  }
}

function mapDispatch(dispatch) {
  return {
    onSaveOrder: newOrder => dispatch(saveHomescreenOrder(newOrder)),
  }
}

export const ConnectedEditHomeView = connect(mapState, mapDispatch)(
  EditHomeView,
)
