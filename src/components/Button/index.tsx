import { TouchableOpacityProps } from "react-native"

import { ButtonTypeStyleProps, Container, Title } from "./styles"

interface ButtonProps extends TouchableOpacityProps {
  children: string
  type?: ButtonTypeStyleProps
}

export const Button = ({ children, type = 'PRIMARY', ...rest }: ButtonProps) => {
  return (
    <Container type={type} {...rest}>
      <Title>{children}</Title>
    </Container>
  )
}