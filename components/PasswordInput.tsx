import * as SQLite from 'expo-sqlite'
import React, { useEffect, useState } from 'react'
import { Alert, View } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { createHash, getFromStorage } from '../utils'

const db = SQLite.openDatabase('app.db')

export default function PasswordInput() {
  const [site, setSite] = useState('')
  const [master, setMaster] = useState('')

  useEffect(() => {
    getFromStorage('master').then((value) => {
      setMaster(value)
    })
  }, [])

  function insertPasswordRecord() {
    if (site === '') return

    // Generate password hash, then insert an entry in database
    const hash = createHash(site, master, 'md5')

    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO credentials VALUES (?, ?)',
        [site, hash],
        (_t, result) => {
          if (result.rowsAffected === 0)
            Alert.alert('Error!', 'There was an error creating an entry.')
        },
      )
    })
  }

  return (
    <View
      style={{
        marginVertical: '5%',
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
      }}
    >
      <View style={{ flex: 1 }}>
        <TextInput
          placeholder="Website (github.com for example)"
          onChangeText={(text) => setSite(text)}
          style={{
            justifyContent: 'flex-start',
            marginRight: 10,
            height: 40,
            backgroundColor: 'white',
            borderRadius: 30,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          }}
        />
      </View>
      <View>
        <Button
          mode="contained"
          onPress={insertPasswordRecord}
          style={{
            width: '10%',
            backgroundColor: '#228',
            justifyContent: 'flex-end',
          }}
        >
          ADD
        </Button>
      </View>
    </View>
  )
}
