import {
  Platform,
  TextInput,
  TextInputProps,
  View,
  ViewProps,
} from 'react-native'
import clsx from 'clsx'

type Variants = 'primary' | 'secondary'

type InputProps = ViewProps & {
  variant?: Variants
}

function Input({
  children,
  variant = 'primary',
  className,
  ...rest
}: InputProps) {
  return (
    <View
      className={clsx(
        'min-h-16 max-h-16 px-6 flex-row items-center gap-2 rounded-md',
        {
          'bg-zinc-200/50 border border-zinc-300':
            variant === 'primary',
        },
        className,
      )}>
      {children}
    </View>
  )
}

function Field({ ...rest }: TextInputProps) {
  return (
    <TextInput
      className="flex-1 text-lg font-regular text-zinc-600"
      placeholderTextColor="gray"
      cursorColor="gray"
      selectionColor={
        Platform.OS === 'ios' ? 'gray' : undefined
      }
      {...rest}
    />
  )
}

Input.Field = Field
export { Input }
