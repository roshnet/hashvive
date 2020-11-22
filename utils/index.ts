import AsyncStorage from '@react-native-community/async-storage'
import CryptoES from 'crypto-es'

type HashMethods = 'md5' | 'sha1' | 'pbkdf2'

export function createHash(
  text: string,
  key: string,
  method: HashMethods,
): string | undefined {
  if (method == 'md5') return CryptoES.HmacMD5(text, key).toString()

  if (method == 'sha1') return CryptoES.HmacSHA1(text, key).toString()
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
