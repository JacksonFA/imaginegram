import { useEffect, useState } from 'react'
import {
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import {
  CameraCapturedPicture,
  CameraType,
  CameraView,
  FlashMode,
  useCameraPermissions,
  useMicrophonePermissions,
} from 'expo-camera'
import { Icon } from '@/components/icon'
import { Button } from '@/components/button'
import { Loading } from '@/components/loading'
import { router } from 'expo-router'

export default function Story() {
  let camera: CameraView | null
  const { top } = useSafeAreaInsets()

  const [isModalVisible, setIsModalVisible] =
    useState(false)
  const [isPreviewVisible, setIsPreviewVisible] =
    useState(false)
  const [imgPreview, setImgPreview] = useState<
    CameraCapturedPicture | undefined
  >()
  const [facing, setFacing] =
    useState<CameraType>('back')
  const [flashMode, setFlashMode] =
    useState<FlashMode>('auto')
  const [camPermission, requestCamPermission] =
    useCameraPermissions()
  const [micPermission, requestMicPermission] =
    useMicrophonePermissions()

  useEffect(() => {
    if (camPermission && !camPermission.granted) {
      setIsModalVisible(true)
    }
    if (micPermission && !micPermission.granted) {
      setIsModalVisible(true)
    }
  }, [camPermission, micPermission])

  if (!camPermission || !micPermission)
    return <Loading />

  async function onRequestPermission() {
    await requestCamPermission()
    await requestMicPermission()
    setIsModalVisible(false)
  }

  function onSetFlashMode() {
    if (flashMode === 'auto') setFlashMode('on')
    if (flashMode === 'on') setFlashMode('off')
    if (flashMode === 'off') setFlashMode('auto')
  }

  async function onTakePicture() {
    if (!camera) return
    const photo = await camera.takePictureAsync({
      quality: 1,
    })
    if (!photo) return
    setImgPreview(photo)
    setIsPreviewVisible(true)
  }

  return (
    <>
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() =>
          setIsModalVisible(false)
        }>
        <View
          style={{ paddingTop: top }}
          className="flex-1 items-center justify-center">
          <View className="bg-zinc-200 rounded px-8 py-12 items-center justify-center shadow-black shadow-sm">
            <Text className="font-semibold mb-4">
              Câmera
            </Text>
            <Text>
              Nós precisamos de sua permissão
            </Text>
            <Text>para abrir a câmera</Text>
            <View className="flex-row gap-4 mt-4">
              <Button
                variant="secondary"
                onPress={() =>
                  setIsModalVisible(false)
                }>
                <Button.Title>
                  Cancelar
                </Button.Title>
              </Button>
              <Button
                onPress={onRequestPermission}>
                <Button.Title>
                  Permitir
                </Button.Title>
              </Button>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        visible={isPreviewVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() =>
          setIsPreviewVisible(false)
        }>
        <View
          style={{ paddingTop: top }}
          className="flex-1 items-center justify-center">
          <View className="bg-zinc-200 rounded px-8 py-12 items-center justify-center shadow-black shadow-sm">
            {imgPreview && (
              <Image
                source={{
                  uri: imgPreview.uri,
                  width: imgPreview.width,
                  height: imgPreview.height,
                }}
                resizeMode="contain"
              />
            )}
          </View>
        </View>
      </Modal>
      <CameraView
        style={{ flex: 1 }}
        facing={facing}
        flash={flashMode}
        zoom={0}
        ref={(r) => {
          camera = r
        }}>
        <View className="absolute w-full top-6 flex-row justify-between">
          <TouchableOpacity>
            <Icon>
              <Icon.Ant
                name="setting"
                color="white"
              />
            </Icon>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onSetFlashMode}>
            <Icon>
              {flashMode === 'auto' && (
                <Icon.MaterialCI
                  name="flash"
                  color="white"
                />
              )}
              {flashMode === 'on' && (
                <Icon.MaterialCI
                  name="flash-off"
                  color="white"
                />
              )}
              {flashMode === 'off' && (
                <Icon.MaterialCI
                  name="flash-auto"
                  color="white"
                />
              )}
            </Icon>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.back()}>
            <Icon>
              <Icon.Ant
                name="close"
                color="white"
              />
            </Icon>
          </TouchableOpacity>
        </View>
        <View className="absolute w-full bottom-20 items-center">
          <TouchableOpacity
            onPress={onTakePicture}>
            <View className="p-2 items-center justify-center bg-transparent border-4 border-white rounded-full">
              <View className="w-16 h-16 rounded-full bg-white" />
            </View>
          </TouchableOpacity>
        </View>
        <View className="absolute w-full bottom-0 flex-row justify-between">
          <TouchableOpacity>
            <Icon>
              <Icon.Feath
                name="square"
                color="white"
              />
            </Icon>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              setFacing((current) =>
                current === 'back'
                  ? 'front'
                  : 'back',
              )
            }>
            <Icon>
              <Icon.Feath
                name="refresh-cw"
                color="white"
              />
            </Icon>
          </TouchableOpacity>
        </View>
      </CameraView>
    </>
  )
}
