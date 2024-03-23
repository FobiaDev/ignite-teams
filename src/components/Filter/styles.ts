import styled, { css } from "styled-components/native"

import { TouchableOpacity } from "react-native"

export interface FilterStyleProps {
  isActive?: boolean
}

export const Container = styled(TouchableOpacity)<FilterStyleProps>`
  height: 38px;
  width: 70px;

  align-items: center;
  justify-content: center;

  border: 1px solid transparent;

  border-radius: 4px;

  ${({theme, isActive}) => isActive && css`
    border: 1px solid ${theme.COLORS.GREEN_700};
  `}
`

export const Title = styled.Text`
  text-transform: uppercase;
  ${({theme}) => css`
    color: ${theme.COLORS.WHITE};
    font-size: ${theme.FONT_SIZE.SM}px;
    font-family: ${theme.FONT_FAMILY.BOLD};
  `}
`