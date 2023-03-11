import { Box, Typography } from '@mui/material'
import React, { forwardRef } from 'react'
import CanvasDraw from 'react-canvas-draw'

const DrawSignature = (props, ref) => {
  const { mainCanvasRef, shortCanvasRef } = ref
  return (
    <Box display="flex" justifyContent="space-between">
      <Box>
        <Typography fontWeight="bold">Main signature</Typography>
        <CanvasDraw
          lazyRadius={0}
          brushRadius={2}
          canvasWidth={450}
          canvasHeight={400}
          ref={mainCanvasRef}
        />
      </Box>
      <Box>
        <Typography fontWeight="bold">Short signature</Typography>
        <CanvasDraw
          lazyRadius={0}
          brushRadius={2}
          canvasWidth={350}
          canvasHeight={400}
          ref={shortCanvasRef}
        />
      </Box>
    </Box>
  )
}

export default forwardRef(DrawSignature)
