import '@/styles/global.css'

import { useEffect } from 'react'
import { StatusBar, View } from 'react-native'
import { router, Slot } from 'expo-router'
import * as SecureStore from 'expo-secure-store'
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from '@expo-google-fonts/inter'
import {
  ClerkProvider,
  ClerkLoaded,
  useAuth,
} from '@clerk/clerk-expo'
import { Loading } from '@/components/loading'

const publishableKey =
  process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

const tokenCache = {
  async getToken(key: string) {
    try {
      const item =
        await SecureStore.getItemAsync(key)
      if (item) {
        console.log(`${key} was used 🔐 \n`)
      } else {
        console.log(
          'No values stored under key: ' + key,
        )
      }
      return item
    } catch (error) {
      console.error(
        'SecureStore get item error: ',
        error,
      )
      await SecureStore.deleteItemAsync(key)
      return null
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value)
    } catch (err) {
      return
    }
  },
}

function InitialLayout() {
  const { isSignedIn, isLoaded } = useAuth()

  useEffect(() => {
    if (!isLoaded) return

    router.replace(
      isSignedIn ? '(auth)' : '(public)',
    )
  }, [isLoaded, isSignedIn])

  return <Slot />
}

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  })

  if (!publishableKey) {
    throw new Error(
      'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
    )
  }

  if (!fontsLoaded) {
    return <Loading />
  }

  return (
    <View className="flex-1 bg-zinc-100">
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <ClerkProvider
        tokenCache={tokenCache}
        publishableKey={publishableKey}>
        <ClerkLoaded>
          <InitialLayout />
        </ClerkLoaded>
      </ClerkProvider>
    </View>
  )
}
