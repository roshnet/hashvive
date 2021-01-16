import AsyncStorage from '@react-native-community/async-storage'
import ViewPager from '@react-native-community/viewpager'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { Button } from 'react-native-paper'
import TypeWriter from 'react-native-typewriter'

const WIDTH = Dimensions.get('window').width

export default function Intro() {
  const navigation = useNavigation()

  const [typingStatus, setTypingStatus] = useState(0)

  useEffect(() => {
    // Trigger effect after 1 second
    setTimeout(() => {
      setTypingStatus(1)
    }, 1000)
  }, [])

  function onIntroComplete() {
    AsyncStorage.setItem('@intro_shown', 'yes').then(() => {
      navigation.navigate('Drawer', { screen: 'Settings' })
    })
  }

  return (
    <ImageBackground source={require('../assets/bg.jpg')} style={styles.image}>
      <ViewPager style={styles.viewPager} initialPage={0}>
        <View style={styles.page} key="1">
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginHorizontal: 55,
            }}
          >
            <TypeWriter
              typing={typingStatus}
              minDelay={1}
              maxDelay={2}
              initialDelay={0}
              style={styles.paragraph}
            >
              Hashvive generates your passwords for different websites.
            </TypeWriter>
            <Image
              source={require('../assets/arrow-next.png')}
              style={{
                maxHeight: 40,
                maxWidth: 40,
                backgroundColor: '#aaa',
                borderRadius: 10,
              }}
            />
          </View>
        </View>
        <View style={styles.page} key="2">
          <Text style={styles.paragraph}>
            Set a master password - one you remember or use frequently, and use
            it to generate unique passwords for different websites.
          </Text>
        </View>
        <View style={styles.page} key="3">
          <Button
            onPress={onIntroComplete}
            color="white"
            mode="outlined"
            style={{ backgroundColor: 'black', borderRadius: 0, marginTop: 10 }}
          >
            Set Master Password
          </Button>
        </View>
      </ViewPager>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  viewPager: {
    flex: 1,
  },
  page: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  foreImage: {
    width: WIDTH,
    height: 150,
  },
  heading: {
    color: 'white',
    fontSize: 35,
    fontWeight: 'bold',
    backgroundColor: '#0005',
    padding: 20,
    width: WIDTH,
    textTransform: 'uppercase',
  },
  paragraph: {
    fontSize: 20,
    color: '#fff',
    padding: 20,
    lineHeight: 40,
  },
})
