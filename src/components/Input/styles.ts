import styled, { css } from 'styled-components/native'

import { TextInput } from 'react-native'

//prefiro assim:
//export const Container = styled(TextInput).attrs(({theme}) => ({
//  placeholderTextColor: theme.COLORS.GRAY_300
// }))`styles`

export const Container = styled(TextInput)`
  flex: 1;

  min-height: 56px;
  max-height: 56px;

  padding: 16px;

  ${({theme}) => css`
    background-color: ${theme.COLORS.GRAY_700};

    color: ${theme.COLORS.WHITE};
    font-size: ${theme.FONT_SIZE.MD}px;
    font-family: ${theme.FONT_FAMILY.REGULAR};
  `}

  border-radius: 6px;
`