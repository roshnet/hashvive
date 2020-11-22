import React from 'react'
import { StyleSheet, View } from 'react-native'
import PasswordInput from '../components/PasswordInput'

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <PasswordInput />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#224',
    alignItems: 'center',
  },
})
