import {
  Image,
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

Post.Img = function Img() {
  return (
    <Image
      className="w-full"
      source={require('@/assets/post.png')}
    />
  )
}

Post.Actions = function Actions() {
  return (
    <View className="flex-row justify-between">
      <View className="flex-row items-center">
        <TouchableOpacity>
          <Icon>
            <Icon.Ant name="hearto" size={26} />
          </Icon>
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon>
            <Icon.Feath
              name="message-circle"
              size={28}
            />
          </Icon>
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon>
            <Icon.Feath name="send" size={28} />
          </Icon>
        </TouchableOpacity>
      </View>
      <TouchableOpacity>
        <Icon>
          <Icon.FA name="bookmark-o" size={26} />
        </Icon>
      </TouchableOpacity>
    </View>
  )
}

Post.Likes = function Likes() {
  return (
    <View className="flex-row px- items-center">
      <Text>Liked by </Text>
      <Text className="font-semibold">
        username
      </Text>
      <Text> and </Text>
      <Text className="font-semibold">
        905,235
      </Text>
    </View>
  )
}

Post.Comments = function Comments() {
  return (
    <View className="px-4 mt-2">
      <Text className="flex-row">
        <Text className="font-semibold">
          Marvel{' '}
        </Text>
        Start your countdown to the glorious
        arrival of Marvel Studios #Loki
        <Text className="text-zinc-500">
          ...more
        </Text>
      </Text>
      <TouchableOpacity>
        <Text className="text-zinc-500">
          View all 103 comments
        </Text>
      </TouchableOpacity>
    </View>
  )
}

Post.AddComment = function AddComment() {
  return (
    <TouchableOpacity className="flex-row gap-2 p-2 items-center">
      <View className="w-10 h-10 bg-zinc-600 rounded-full" />
      <Text>add your comment...</Text>
    </TouchableOpacity>
  )
}

export { Post }
