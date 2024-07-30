import {
  Text,
  TouchableOpacity,
  View,
  ViewProps,
} from 'react-native'
import { Icon } from './icon'

type PostProps = ViewProps & {}

function Post({ children }: PostProps) {
  return (
    <View className="w-full mb-2">
      {children}
    </View>
  )
}

Post.Header = function Header() {
  return (
    <View className="flex-row w-full items-center justify-center px-4 py-2">
      <View className="p-1 rounded-full border-2 border-orange-500">
        <View className="w-12 h-12 rounded-full bg-red-600" />
      </View>
      <Text className="flex-1 items-center justify-center px-4 font-semibold">
        Marvel
      </Text>
      <TouchableOpacity>
        <Icon>
          <Icon.SLine
            name="options-vertical"
            size={20}
          />
        </Icon>
      </TouchableOpacity>
    </View>
  )
}

export { Post }
