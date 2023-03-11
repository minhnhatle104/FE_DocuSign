import { Box, Typography } from '@mui/material'
import React, { forwardRef } from 'react'
import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

const UploadSignature = (props, ref) => {
  const { mainFileRef, shortFileRef } = ref

  return (
    <Box display="flex" justifyContent="space-between">
      <Box sx={{ width: '50%' }}>
        <Typography fontWeight="bold">Main signature</Typography>
        <FilePond ref={mainFileRef} labelIdle="Drag or attach your file here" />
      </Box>
      <Box sx={{ width: '40%' }}>
        <Typography fontWeight="bold">Short signature</Typography>
        <FilePond
          ref={shortFileRef}
          labelIdle="Drag or attach your file here"
        />
      </Box>
    </Box>
  )
}

export default forwardRef(UploadSignature)
