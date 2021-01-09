import * as FileSystem from 'expo-file-system'
import * as SQLite from 'expo-sqlite'
import React, { useState } from 'react'
import { Alert, StyleSheet, ToastAndroid, View } from 'react-native'
import { Button } from 'react-native-paper'

interface Credential {
  site: string
  password: string
}

const db = SQLite.openDatabase('app.db')
const exportDir = FileSystem.documentDirectory + 'credentials.json/'

export default function Export() {
  const [credentials, setCredentials] = useState<Array<Credential>>([])

  db.transaction((tx) => {
    tx.executeSql(
      'SELECT site, password FROM credentials',
      [],
      (_t, { rows }) => {
        const content: any = rows
        setCredentials(content._array)
      },
    )
  })

  async function exportPasswords() {
    FileSystem.writeAsStringAsync(exportDir, JSON.stringify(credentials), {
      encoding: 'utf8',
    })
      .then(() => {
        Alert.alert(
          'Done!',
          `Your passwords were saved on device.`,
          [{ text: 'OK' }],
          { cancelable: false },
        )
      })
      .catch(() => {
        Alert.alert('Error!', 'There was an error creating an entry.')
      })
  }

  function onDeleteConfirmed() {
    db.transaction((tx) => {
      tx.executeSql(`DELETE FROM credentials;`, [], () => {
        ToastAndroid.show('All passwords wiped.', ToastAndroid.SHORT)
      })
    })
  }

  function confirmDeletion() {
    Alert.alert(
      'Delete all passwords?',
      'Make sure you have backed up passwords before deleting.\n\nYou can reproduce a password if you remember the master password and the website name.',
      [
        {
          text: 'Back',
        },
        { text: 'DELETE', onPress: onDeleteConfirmed },
      ],
    )
  }

  return (
    <View style={styles.container}>
      <Button
        onPress={exportPasswords}
        icon="download"
        color="black"
        mode="contained"
        style={styles.button}
      >
        Export
      </Button>
      <Button
        onPress={confirmDeletion}
        icon="delete"
        color="darkred"
        mode="contained"
        style={styles.button}
      >
        Delete all passwords
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderRadius: 0,
    marginVertical: 15,
  },
})
