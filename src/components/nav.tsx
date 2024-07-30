import {
  Platform,
  TouchableOpacity,
  View,
} from 'react-native'
import { Icon } from './icon'
import { router } from 'expo-router'

type NavProps = {
  currentPath:
    | 'home'
    | 'search'
    | 'reels'
    | 'shopping'
    | 'profile'
}

export function Nav({ currentPath }: NavProps) {
  function onNavigation(path: string) {
    router.push(`(auth)${path}`)
  }

  return (
    <View
      className={`w-full flex-row items-center justify-center gap-4 border-t border-zinc-300 ${Platform.OS === 'ios' ? 'h-24' : 'h-20'}`}>
      <TouchableOpacity
        onPress={() => onNavigation('')}>
        <Icon>
          <Icon.MaterialCI
            name={`home-variant${currentPath === 'home' ? '' : '-outline'}`}
          />
        </Icon>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onNavigation('/search')}>
        <Icon>
          {currentPath === 'search' ? (
            <Icon.FA name="search" size={33} />
          ) : (
            <Icon.Ant name="search1" size={34} />
          )}
        </Icon>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onNavigation('/reels')}>
        <Icon>
          <Icon.MaterialCI
            name={`movie-play${currentPath === 'reels' ? '' : '-outline'}`}
          />
        </Icon>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onNavigation('/shopping')}>
        <Icon>
          <Icon.MaterialCI
            name={`shopping${currentPath === 'shopping' ? '' : '-outline'}`}
          />
        </Icon>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onNavigation('/profile')}>
        <Icon>
          <Icon.MaterialCI
            name={`account-circle${currentPath === 'profile' ? '' : '-outline'}`}
          />
        </Icon>
      </TouchableOpacity>
    </View>
  )
}
