import * as SQLite from 'expo-sqlite'
import React, { useState } from 'react'
import {
  Alert,
  Clipboard,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native'
import { Button, Modal, Portal, TextInput } from 'react-native-paper'

interface Props {
  site: string
  password: string
  parentCallback: Function
}

const db = SQLite.openDatabase('app.db')

export default function Entry({ site, password, parentCallback }: Props) {
  const [_password, setPassword] = useState(password)
  const [editBoxVisible, setEditBoxVisible] = useState(false)

  function writeToClipboard() {
    try {
      Clipboard.setString(password)
      ToastAndroid.show('Password copied to clipboard!', ToastAndroid.LONG)
    } catch (err) {
      ToastAndroid.show(`Error: ${String(err)}`, ToastAndroid.LONG)
    }
  }

  function editPassword() {
    // Update password for the current site
    db.transaction((tx) => {
      tx.executeSql(
        `
        UPDATE credentials
        SET password=?
        WHERE site=?`,
        [_password, site],
        (_t, result) => {
          if (result.rowsAffected === 0)
            Alert.alert(
              'Error',
              `Sorry, but there was an error changing the password. Perhaps try
              restarting the app?`,
            )
          else {
            setEditBoxVisible(false)
            ToastAndroid.show('Done!', ToastAndroid.SHORT)
            parentCallback() // Force render Home screen to fetch fresh values
          }
        },
      )
    })
  }

  return (
    <>
      <Portal>
        <Modal
          visible={editBoxVisible}
          onDismiss={() => setEditBoxVisible(false)}
          contentContainerStyle={styles.modal}
        >
          <TextInput
            label="Edit password"
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
            value={_password}
          />
          <Button onPress={editPassword} mode="contained" style={styles.button}>
            Set
          </Button>
        </Modal>
      </Portal>
      <View style={styles.wrapper}>
        <Text style={styles.text}>{site}</Text>
        <View style={styles.subwrapper}>
          <Button
            onPress={() => setEditBoxVisible(true)}
            mode="text"
            icon="pencil"
          >
            Edit
          </Button>
          <Button onPress={writeToClipboard} mode="contained" color="white">
            Copy
          </Button>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomColor: '#000',
    borderBottomWidth: 0.4,
  },
  subwrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modal: {
    backgroundColor: 'white',
    flexDirection: 'column',
    padding: 30,
    margin: 20,
  },
  heading: {
    fontSize: 20,
  },
  input: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  button: {
    width: 50,
    marginTop: 10,
    alignSelf: 'center',
  },
  text: {
    marginHorizontal: 3,
    fontSize: 17,
  },
})
