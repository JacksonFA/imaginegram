import { createContext, useContext } from 'react'
import {
  ActivityIndicator,
  Text,
  TextProps,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native'
import clsx from 'clsx'

type Variants = 'primary' | 'secondary'

type ButtonProps = TouchableOpacityProps & {
  variant?: Variants
  isLoading?: boolean
}

const ThemeContext = createContext<{
  variant?: Variants
}>({})

function Button({
  variant = 'primary',
  children,
  isLoading,
  className,
  ...rest
}: ButtonProps) {
  return (
    <TouchableOpacity
      className={clsx(
        'h-16 flex-row items-center justify-center rounded-lg gap-2 px-2',
        {
          'bg-sky-600': variant === 'primary',
          'bg-blue-400': variant === 'secondary',
        },
        className,
      )}
      activeOpacity={0.7}
      disabled={isLoading}
      {...rest}>
      <ThemeContext.Provider value={{ variant }}>
        {isLoading ? (
          <ActivityIndicator className="text-zinc-50" />
        ) : (
          children
        )}
      </ThemeContext.Provider>
    </TouchableOpacity>
  )
}

function Title({ children }: TextProps) {
  const { variant } = useContext(ThemeContext)

  return (
    <Text
      className={clsx('text-base font-regular', {
        'text-zinc-50': variant === 'primary',
        'text-zinc-100': variant === 'secondary',
      })}>
      {children}
    </Text>
  )
}

Button.Title = Title
export { Button }
