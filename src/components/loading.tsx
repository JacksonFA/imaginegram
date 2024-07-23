import { ActivityIndicator } from 'react-native'

export function Loading() {
  return (
    <ActivityIndicator
      size={48}
      className="flex-1 bg-zinc-100 items-center justify-center text-sky-600"
    />
  )
}
