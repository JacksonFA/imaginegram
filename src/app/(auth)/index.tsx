import { Button } from '@/components/button'
import { useAuth } from '@clerk/clerk-expo'
import { router } from 'expo-router'
import { Text, View } from 'react-native'

export default function Home() {
  const { signOut } = useAuth()

  async function onSignOut() {
    await signOut()
    router.replace('(public)')
  }

  return (
    <View className="flex-1 px-8 items-center justify-center">
      <Text className="text-zinc-600 text-3xl">
        HOME!
      </Text>
      <Button
        className="w-full"
        onPress={onSignOut}>
        <Button.Title>Sair</Button.Title>
      </Button>
    </View>
  )
}
