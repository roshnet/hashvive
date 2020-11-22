import * as SQLite from 'expo-sqlite'
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import Entry from '../components/Entry'
import PasswordInput from '../components/PasswordInput'

const db = SQLite.openDatabase('app.db')

export default function HomeScreen() {
  const [entries, setEntries] = useState<
    Array<{ site: string; password: string }>
  >([])

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM credentials`, [], (t, { rows }) => {
        let results: any = rows
        setEntries(results._array)
      })
    })
  }, [])

  return (
    <View style={styles.container}>
      <PasswordInput />
      <ScrollView style={styles.entries}>
        {entries.map((entry) => {
          return (
            <Entry
              key={Math.random()}
              site={entry.site}
              password={entry.password}
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
    backgroundColor: '#224',
    alignItems: 'center',
  },
  entries: {
    width: '100%',
  },
})
