import { Dialog, IconButton, styled, TablePagination } from '@mui/material'

export const StyledDialog = styled(Dialog)`
  & .MuiPaper-root {
    width: 50rem;
    max-width: 50rem;
  }
`

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
