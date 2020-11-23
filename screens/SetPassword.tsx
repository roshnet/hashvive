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
        mode="outlined"
        secureTextEntry={true}
        label="Type a password"
        onChangeText={(text) => setPassword(text)}
      />
      <View style={{ alignItems: 'center' }}>
        <Button
          icon="check"
          color="black"
          mode="contained"
          onPress={onPasswordSet}
          style={styles.button}
        >
          Set
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: '500',
    marginVertical: 20,
  },
  button: {
    width: '25%',
    marginTop: 20,
  },
})
