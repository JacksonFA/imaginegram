import { View, ViewProps } from 'react-native'
import {
  AntDesign,
  Entypo,
  FontAwesome,
  MaterialCommunityIcons,
  Octicons,
  SimpleLineIcons,
} from '@expo/vector-icons'

function Icon({ children }: ViewProps) {
  return <View className="p-4">{children}</View>
}

type IconProps = {
  name: any
  size?: number
  color?: string
}

Icon.Ant = function Ant({
  name,
  size = 36,
  color = 'black',
}: IconProps) {
  return (
    <AntDesign
      name={name}
      size={size}
      color={color}
    />
  )
}

Icon.Ent = function Ent({
  name,
  size = 36,
  color = 'black',
}: IconProps) {
  return (
    <Entypo
      name={name}
      size={size}
      color={color}
    />
  )
}

Icon.FA = function FA({
  name,
  size = 36,
  color = 'black',
}: IconProps) {
  return (
    <FontAwesome
      name={name}
      size={size}
      color={color}
    />
  )
}

Icon.Oct = function Oct({
  name,
  size = 36,
  color = 'black',
}: IconProps) {
  return (
    <Octicons
      name={name}
      size={size}
      color={color}
    />
  )
}

Icon.SLine = function SLine({
  name,
  size = 36,
  color = 'black',
}: IconProps) {
  return (
    <SimpleLineIcons
      name={name}
      size={size}
      color={color}
    />
  )
}

Icon.MaterialCI = function MaterialCI({
  name,
  size = 36,
  color = 'black',
}: IconProps) {
  return (
    <MaterialCommunityIcons
      name={name}
      size={size}
      color={color}
    />
  )
}

export { Icon }
