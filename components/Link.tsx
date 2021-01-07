import React from 'react'
import { Linking, Text } from 'react-native'

interface Props {
  url: string
  text?: string
}

export default function Link({ url, text }: Props) {
  return (
    <Text
      onPress={() => Linking.openURL(url)}
      style={{
        color: 'grey',
        textDecorationLine: 'underline',
      }}
    >
      {text}
    </Text>
  )
}
