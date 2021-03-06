// @flow

import React from 'react'
import glamorous from 'glamorous-native'

export const Code = glamorous.text({})

export const CodeBlock = glamorous.text({})

export class HighlightedCodeBlock extends React.PureComponent {
  render() {
    const {nodeKey, language, literal} = this.props
    return (
      <CodeBlock key={nodeKey} language={language}>
        <Code>{literal}</Code>
      </CodeBlock>
    )
  }
}
