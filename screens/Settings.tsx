import React from 'react'
import { View } from 'react-native'
import MenuItem from '../components/MenuItem'

export default function SettingsScreen() {
  return (
    <View style={{ flex: 1 }}>
      <MenuItem title="Change master password" goto="Set Password" />
      <MenuItem title="Change website passwords" goto="Home" />
      <MenuItem title="About" goto="Home" />
    </View>
  )
}
