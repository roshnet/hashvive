import AsyncStorage from '@react-native-community/async-storage'
import React, { useState } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'

export default function SetPasswordScreen() {
  const [password, setPassword] = useState('')

  /* Updates master password in AsyncStorage */
  async function onPasswordSet() {
    try {
      await AsyncStorage.setItem('master', password)
    } catch (e) {
      Alert.alert(
        'Error!',
        'An error occurred while setting the master password.',
      )
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Set a new passphrase</Text>
      <TextInput
        secureTextEntry={true}
        label="Type a password"
        onChangeText={(text) => setPassword(text)}
      />
      <Text>{'\n'}</Text>
      <Button
        icon="check"
        mode="contained"
        onPress={onPasswordSet}
        style={styles.button}
      >
        Set
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: '500',
    marginVertical: 20,
  },
  button: {
    width: '25%',
    backgroundColor: '#228',
  },
})
