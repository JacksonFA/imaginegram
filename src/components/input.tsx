import {
  TextInputProps,
  ViewProps,
} from 'react-native'

type Variants = 'primary' | 'secondary'

type InputProps = ViewProps & {
  variant?: Variants
}

function Input({
  children,
  variant = 'primary',
  className,
  ...rest
}: InputProps) {}

function Field({ ...rest }: TextInputProps) {}

Input.Field = Field
export { Input }
