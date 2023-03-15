import { IconButton, styled, TablePagination } from '@mui/material'

export const StyledTablePagination = styled(TablePagination)`
  & p {
    margin-bottom: 0;
  }
`

export const StyledIconButton = styled(IconButton)`
  &:focus {
    outline: none;
  }
`
