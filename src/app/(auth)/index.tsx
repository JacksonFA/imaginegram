import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Button } from '@/components/button'
import { Logo } from '@/components/logo'
import { Nav } from '@/components/nav'
import { Icon } from '@/components/icon'
import { Stories } from '@/components/stories'
import { Post } from '@/components/post'
import { Feed } from '@/components/feed'
import { router } from 'expo-router'

export default function Home() {
  const { top } = useSafeAreaInsets()
  // const { signOut } = useAuth()

  // async function onSignOut() {
  //   await signOut()
  //   router.replace('(public)')
  // }

  return (
    <>
      <ScrollView
        style={{
          paddingTop: top,
        }}
        className="flex-1">
        <View className="w-full h-16 flex-row items-center justify-between">
          <Logo size="12" className="w-44" />

          <View className="flex-row">
            <TouchableOpacity
              onPress={() =>
                router.push('(auth)/story')
              }>
              <Icon>
                <Icon.Oct
                  name="diff-added"
                  size={24}
                />
              </Icon>
            </TouchableOpacity>

            <TouchableOpacity>
              <Icon>
                <Icon.Ant
                  name="hearto"
                  size={24}
                />
              </Icon>
            </TouchableOpacity>

            <TouchableOpacity>
              <Icon>
                <Icon.MaterialCI
                  name="facebook-messenger"
                  size={24}
                />
              </Icon>
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <View className="h-28 border-b border-zinc-300">
            <Stories />
          </View>

          <Feed />
        </View>
      </ScrollView>
      <Nav currentPath="home" />
    </>
  )
}
