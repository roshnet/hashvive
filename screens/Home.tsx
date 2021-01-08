import AsyncStorage from '@react-native-community/async-storage'
import { useNavigation } from '@react-navigation/native'
import * as SQLite from 'expo-sqlite'
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import Entry from '../components/Entry'
import PasswordInput from '../components/PasswordInput'

const db = SQLite.openDatabase('app.db')

export default function HomeScreen() {
  const navigation = useNavigation()

  useEffect(() => {
    navigation.addListener('focus', updateList)
  })

  const [_update, triggerUpdate] = useState(0)
  const [entries, setEntries] = useState<
    Array<{ site: string; password: string }>
  >([])

  AsyncStorage.getItem('@first_boot').then((value) => {
    if (!value) navigation.navigate('Intro')
  })

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM credentials`, [], (t, { rows }) => {
        let results: any = rows
        setEntries(results._array)
      })
    })
  }, [_update])

  /*
  Dummy setter function, used to force render this component.
  To be passed as callback to components that change static data.
  Children calling it triggers a re-render, which fetches fresh data.
  */
  function updateList() {
    triggerUpdate(_update + 1)
  }

  return (
    <View style={styles.container}>
      <PasswordInput parentCallback={updateList} />
      <ScrollView style={styles.entries}>
        {entries.map((entry) => {
          return (
            <Entry
              key={Math.random()}
              site={entry.site}
              password={entry.password}
              parentCallback={updateList}
            />
          )
        })}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  entries: {
    width: '100%',
  },
})
