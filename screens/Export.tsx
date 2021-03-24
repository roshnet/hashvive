import React, { useState } from 'react'
import { Alert, Share, StyleSheet, ToastAndroid, View } from 'react-native'
import { Button } from 'react-native-paper'
import { openDatabase } from 'react-native-sqlite-storage'

interface Credential {
  site: string
  password: string
}

const db = openDatabase({
  name: 'app.db',
  location: 'default',
})

export default function Export() {
  const [credentials, setCredentials] = useState<Array<Credential>>([])

  db.transaction((tx) => {
    tx.executeSql(
      'SELECT site, password FROM credentials',
      [],
      (_t, { rows }) => {
        let resultSet: any = []
        for (let i = 0; i < rows.length; i++) {
          resultSet.push(rows.item(i))
        }
        setCredentials(resultSet)
      },
    )
  })

  async function exportPasswords() {
    Share.share(
      {
        title: 'Hashvive',
        message: JSON.stringify(credentials),
      },
      {
        dialogTitle: 'Export credentials as JSON',
      },
    )
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
        mode="outlined"
        style={styles.button}
      >
        Export
      </Button>
      <Button
        onPress={confirmDeletion}
        icon="delete"
        color="darkred"
        mode="outlined"
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
