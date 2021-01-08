import AsyncStorage from '@react-native-community/async-storage'
import CryptoES from 'crypto-es'
import * as SQLite from 'expo-sqlite'

type HashMethods = 'md5' | 'sha1' | 'pbkdf2'
type Entry = {
  site: string
  password: string
}

const db = SQLite.openDatabase('app.db')
const DEFAULT_SITES: Array<string> = [
  'Amazon',
  'Facebook',
  'GitHub',
  'Google',
  'Netflix',
  'Reddit',
  'Twitter',
  'Yahoo',
]

export function createHash(
  text: string,
  key: string,
  method: HashMethods,
): string {
  if (method == 'sha1') return CryptoES.HmacSHA1(text, key).toString()

  return CryptoES.HmacMD5(text, key).toString()
}

export async function getFromStorage(item: string) {
  try {
    const v = await AsyncStorage.getItem(item)
    let value = String(v)
    return value
  } catch (err) {
    return String(err)
  }
}

export function populateDatabase(masterPassword: string) {
  let entries: Array<Entry> = []

  DEFAULT_SITES.map((site: string) => {
    entries.push({
      site,
      password: createHash(site, masterPassword, 'md5').slice(0, 12),
    })
  })

  db.transaction((tx) => {
    entries.map(({ site, password }) => {
      let query = `
      INSERT INTO credentials VALUES ('${site}', '${password}');
      `
      tx.executeSql(query)
    })
  })
}
