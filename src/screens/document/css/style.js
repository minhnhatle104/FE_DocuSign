import { TableCell, tableCellClasses } from '@mui/material'
import { styled } from '@mui/material'

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#1872cb',
    color: theme.palette.common.white,
  },
}))
