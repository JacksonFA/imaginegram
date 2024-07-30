import { useEffect, useState } from 'react'
import {
  Image,
  Keyboard,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import {
  coolDownAsync,
  maybeCompleteAuthSession,
  warmUpAsync,
} from 'expo-web-browser'
import {
  useOAuth,
  useSignIn,
} from '@clerk/clerk-expo'
import {
  AntDesign,
  Entypo,
} from '@expo/vector-icons'
import { Button } from '@/components/button'
import { Show } from '@/components/show'
import { Input } from '@/components/input'

maybeCompleteAuthSession()

export default function Index() {
  const { top } = useSafeAreaInsets()
  const router = useRouter()
  const googleOAuth = useOAuth({
    strategy: 'oauth_google',
  })
  const { isLoaded, signIn, setActive } =
    useSignIn()

  const [isLoading, setIsLoading] =
    useState(false)
  const [signinType, setSigninType] = useState<
    'social' | 'email'
  >('social')
  const [
    isKeyboardVisible,
    setIsKeyboardVisible,
  ] = useState(false)
  const [emailAddress, setEmailAddress] =
    useState('')
  const [password, setPassword] = useState('')
  const [
    isPasswordVisible,
    setIsPasswordVisible,
  ] = useState(false)

  useEffect(() => {
    const keyboardDidShowListener =
      Keyboard.addListener(
        'keyboardDidShow',
        () => setIsKeyboardVisible(true),
      )
    const keyboardDidHideListener =
      Keyboard.addListener(
        'keyboardDidHide',
        () => setIsKeyboardVisible(false),
      )

    warmUpAsync()

    return () => {
      keyboardDidHideListener.remove()
      keyboardDidShowListener.remove()
      coolDownAsync()
    }
  }, [])

  async function onEmailSignIn() {
    if (!isLoaded) return
    setIsLoading(true)

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      })

      if (signInAttempt.status === 'complete') {
        await setActive({
          session: signInAttempt.createdSessionId,
        })
        setIsLoading(false)
      } else {
        console.error(
          JSON.stringify(signInAttempt, null, 2),
        )
        setIsLoading(false)
      }
    } catch (error) {
      console.error(
        JSON.stringify(error, null, 2),
      )
      setIsLoading(false)
    }
  }

  async function onGoogleSignIn() {
    try {
      setIsLoading(true)

      const oAuthFlow =
        await googleOAuth.startOAuthFlow()

      if (
        oAuthFlow.authSessionResult?.type ===
        'success'
      ) {
        if (oAuthFlow.setActive) {
          await oAuthFlow.setActive({
            session: oAuthFlow.createdSessionId,
          })
        }
      } else setIsLoading(false)
    } catch (error) {
      console.error(
        JSON.stringify(error, null, 2),
      )
      setIsLoading(false)
    }
  }

  return (
    <>
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}>
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
                Cadastre-se para ver fotos, vídeos
                e reels de seus amigos.
              </Text>

              <Button
                className="w-full mt-32"
                disabled={isLoading}
                onPress={onGoogleSignIn}>
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

              <TouchableOpacity
                className="flex-1"
                onPress={() =>
                  setSigninType('email')
                }>
                <Text className="font-semibold">
                  Login com Número ou E-mail
                </Text>
              </TouchableOpacity>
            </Show.When>
            <Show.Else>
              <View className="w-full mt-12 gap-8">
                <Input>
                  <Input.Field
                    placeholder="Número de telefone ou e-mail"
                    keyboardType="email-address"
                    autoComplete="email"
                    onChangeText={setEmailAddress}
                    value={emailAddress}
                  />
                </Input>

                <Input>
                  <Input.Field
                    placeholder="Senha"
                    secureTextEntry={
                      !isPasswordVisible
                    }
                    autoComplete="current-password"
                    onChangeText={setPassword}
                    value={password}
                  />
                  <Entypo
                    name={
                      isPasswordVisible
                        ? 'eye-with-line'
                        : 'eye'
                    }
                    size={18}
                    color="gray"
                    className="px-2"
                    onPress={() =>
                      setIsPasswordVisible(
                        !isPasswordVisible,
                      )
                    }
                  />
                </Input>

                <Button
                  variant="secondary"
                  disabled={isLoading}
                  onPress={onEmailSignIn}>
                  <Button.Title>
                    Entrar
                  </Button.Title>
                </Button>
              </View>

              <View className="items-center justify-center flex-row gap-4 mt-12">
                <View className="flex-1 bg-zinc-200 h-1" />
                <Text>OU</Text>
                <View className="flex-1 bg-zinc-200 h-1" />
              </View>

              <Button
                className="w-full mt-12"
                disabled={isLoading}
                onPress={onGoogleSignIn}>
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
      </TouchableWithoutFeedback>
      <Show>
        <Show.When isTrue={!isKeyboardVisible}>
          <View className="w-full py-6 bg-zinc-200/30">
            <TouchableOpacity
              className="flex-row items-center justify-center gap-4"
              onPress={() =>
                router.push('(public)/signup')
              }>
              <Text className="text-zinc-500">
                Não possui uma conta?
              </Text>
              <Text className="text-zinc-700">
                Criar conta
              </Text>
            </TouchableOpacity>
          </View>
        </Show.When>
      </Show>
    </>
  )
}
