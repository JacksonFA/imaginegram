import { useState } from 'react'
import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import {
  AntDesign,
  Entypo,
} from '@expo/vector-icons'
import { Button } from '@/components/button'
import { Show } from '@/components/show'
import { Input } from '@/components/input'

export default function Index() {
  const { top } = useSafeAreaInsets()

  const [signinType, setSigninType] = useState<
    'social' | 'email'
  >('email')

  return (
    <>
      <View
        style={{ paddingTop: top + 20 }}
        className="flex-1 w-full items-center px-6">
        <Text className="text-zinc-400">
          Português v
        </Text>

        <Image
          source={require('@/assets/logo.png')}
          className="h-20 mt-36"
          resizeMode="contain"
        />

        <Show>
          <Show.When
            isTrue={signinType === 'social'}>
            <Text className="mt-20">
              Cadastre-se para ver fotos, vídeos e
              reels de seus amigos.
            </Text>

            <Button className="w-full mt-32">
              <AntDesign
                name="google"
                size={24}
                color="white"
              />
              <Button.Title>
                Entrar com o Google
              </Button.Title>
            </Button>

            <View className="flex-1 items-center justify-center flex-row gap-4">
              <View className="flex-1 bg-zinc-200 h-1" />
              <Text>OU</Text>
              <View className="flex-1 bg-zinc-200 h-1" />
            </View>

            <TouchableOpacity className="flex-1">
              <Text className="font-semibold">
                Login com Número ou E-mail
              </Text>
            </TouchableOpacity>
          </Show.When>
          <Show.Else>
            <View className="w-full mt-12 gap-8">
              <Input>
                <Input.Field />
              </Input>

              <Button variant="secondary">
                <Button.Title>
                  Entrar
                </Button.Title>
              </Button>
            </View>

            <View className="flex-1 items-center justify-center flex-row gap-4">
              <View className="flex-1 bg-zinc-200 h-1" />
              <Text>OU</Text>
              <View className="flex-1 bg-zinc-200 h-1" />
            </View>

            <Button className="w-full mt-12">
              <AntDesign
                name="google"
                size={24}
                color="white"
              />
              <Button.Title>
                Entrar com o Google
              </Button.Title>
            </Button>
          </Show.Else>
        </Show>
      </View>
      <View className="w-full py-6 bg-zinc-200/30">
        <TouchableOpacity className="flex-row items-center justify-center gap-4">
          <Text className="text-zinc-500">
            Não possui uma conta?
          </Text>
          <Text className="text-zinc-700">
            Criar conta
          </Text>
        </TouchableOpacity>
      </View>
    </>
  )
}
