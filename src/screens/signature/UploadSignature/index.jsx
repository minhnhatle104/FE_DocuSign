import { Box } from '@mui/material'
import React, { forwardRef } from 'react'
import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

const UploadSignature = (props, ref) => {
  return (
    <Box sx={{ paddingRight: '1rem' }}>
      <Box>
        <FilePond ref={ref} labelIdle="Drag or attach your file here" />
      </Box>
    </Box>
  )
}

export default forwardRef(UploadSignature)
