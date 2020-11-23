import AsyncStorage from '@react-native-community/async-storage'
import React, { useState } from 'react'
import { Alert, Dimensions, StyleSheet, View } from 'react-native'
import { Button, Snackbar, Text, TextInput } from 'react-native-paper'

const windowWidth = Dimensions.get('window').width

export default function SetPasswordScreen() {
  const [password, setPassword] = useState('')
  const [showSnackbar, setShowSnackbar] = useState(false)

  /* Updates master password in AsyncStorage */
  async function onPasswordSet() {
    try {
      await AsyncStorage.setItem('master', password)
      setPassword('')
      setShowSnackbar(true)
    } catch (e) {
      Alert.alert(
        'Error!',
        'An error occurred while setting the master password.',
      )
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Set a new password</Text>
      <TextInput
        mode="outlined"
        secureTextEntry={true}
        label="Type a password"
        onChangeText={(text) => setPassword(text)}
        value={password}
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
      <Snackbar
        visible={showSnackbar}
        duration={3000}
        onDismiss={() => setShowSnackbar(false)}
        style={{ width: windowWidth * 0.95 }}
      >
        Master password changed.
      </Snackbar>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#efefef',
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
