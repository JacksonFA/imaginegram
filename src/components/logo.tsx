import { Image, ImageProps } from 'react-native'

type LogoProps = ImageProps & {
  size?: string
}

export function Logo({
  size,
  className,
  ...rest
}: LogoProps) {
  return (
    <Image
      source={require('@/assets/logo.png')}
      className={`h-12 ${className}`}
      resizeMode="contain"
      {...rest}
    />
  )
}
