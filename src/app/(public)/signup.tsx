import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { Show } from '@/components/show'
import { useSignUp } from '@clerk/clerk-expo'
import { Entypo } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import {
  Alert,
  Image,
  Keyboard,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function SignUp() {
  const { top } = useSafeAreaInsets()
  const router = useRouter()
  const { isLoaded, signUp, setActive } =
    useSignUp()

  const [isLoading, setIsLoading] =
    useState(false)
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
  const [code, setCode] = useState('')
  const [
    isPendingVerification,
    setIsPendingVerification,
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

    return () => {
      keyboardDidHideListener.remove()
      keyboardDidShowListener.remove()
    }
  }, [])

  async function onEmailSignUp() {
    if (!isLoaded) return
    setIsLoading(true)

    if (!emailAddress || !password) {
      Alert.alert(
        'Criar conta',
        'Preencha todos os campos',
      )
      setIsLoading(false)
      return
    }

    try {
      await signUp.create({
        emailAddress,
        password,
        username: emailAddress
          .split('@')[0]
          .replace(/[^a-zA-Z0-9]/g, ''),
      })

      await signUp.prepareEmailAddressVerification(
        { strategy: 'email_code' },
      )

      setIsPendingVerification(true)
      setIsLoading(false)
    } catch (error) {
      const errorToJSON = JSON.parse(
        JSON.stringify(error, null, 2),
      )
      if (errorToJSON.clerkError) {
        console.log(errorToJSON)
      }
      console.error(error)
      setIsLoading(false)
    }
  }

  async function onEmailVerify() {
    if (!isLoaded) return
    setIsLoading(true)

    try {
      const completeSignUp =
        await signUp.attemptEmailAddressVerification(
          { code },
        )

      if (completeSignUp.status === 'complete') {
        await setActive({
          session:
            completeSignUp.createdSessionId,
        })
        setIsLoading(false)
        router.replace('(auth)')
      } else {
        console.error(
          JSON.stringify(completeSignUp, null, 2),
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
              isTrue={isPendingVerification}>
              <View className="w-full mt-12 gap-10">
                <Text className="text-center">
                  Um código foi enviado para o
                  e-mail que você informou. {''}
                  Insira-o abaixo para verificar
                  sua conta
                </Text>
                <Input>
                  <Input.Field
                    placeholder="Digite o código recebido no e-mail"
                    onChangeText={setCode}
                    value={code}
                  />
                </Input>

                <Button
                  variant="secondary"
                  onPress={onEmailVerify}
                  isLoading={isLoading}>
                  <Button.Title>
                    Verificar conta
                  </Button.Title>
                </Button>
              </View>
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
                  onPress={onEmailSignUp}>
                  <Button.Title>
                    Criar conta
                  </Button.Title>
                </Button>
              </View>
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
                router.push('(public)')
              }>
              <Text className="text-zinc-500">
                Já possui uma conta?
              </Text>
              <Text className="text-zinc-700">
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </Show.When>
      </Show>
    </>
  )
}
