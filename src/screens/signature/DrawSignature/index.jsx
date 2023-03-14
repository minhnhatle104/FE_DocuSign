import { Box } from '@mui/material'
import React, { forwardRef } from 'react'
import CanvasDraw from 'react-canvas-draw'

const DrawSignature = (props, ref) => {
  return (
    <Box>
      <Box>
        <CanvasDraw
          lazyRadius={0}
          brushRadius={2}
          canvasWidth={650}
          canvasHeight={350}
          ref={ref}
        />
      </Box>
    </Box>
  )
}

export default forwardRef(DrawSignature)
