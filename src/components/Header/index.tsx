import { useNavigation } from "@react-navigation/native"

import { BackButton, BackIcon, Container, Logo } from "./styles"

import LogoImg from '@assets/logo.png'

interface HeaderProps {
  showBackButton?: boolean
}

export const Header = ({ showBackButton = false }: HeaderProps) => {
  const navigation = useNavigation()

  const handleGoBack = () => {
    navigation.navigate('groups')
  }

  return (
    <Container>
      {showBackButton && (
        <BackButton
          onPress={handleGoBack}
        >
          <BackIcon />
        </BackButton>
      )}

      <Logo source={LogoImg} />
    </Container>
  )
}