import React, {useEffect, useLayoutEffect, useRef, useState} from 'react'
import {
  Viewer,
  Worker,
  SpecialZoomLevel,
  ScrollMode,PdfLoader
} from '@react-pdf-viewer/core'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'
import './css/pdf.viewer.css'
import axios from 'axios'
function PdfViewer() {
    const [currentPage, setCurrentPage] = useState(0)
    const [pdfFile, setPDFFile] = useState(false)
    const [viewPDF, setViewPDF] = useState(null)

    const [pdfFrameWidth, setFrameWidth] = useState(0)
    const [pdfFrameHeight, setFrameHeight] = useState(0)
    const [fileHeight, setFileHeight] = useState(0)
    const [fileWidth, setFileWdith] = useState(0)

    const [imageHeight, setIMGHeight] = useState(0)
    const [imageWidth, setIMGWidth] = useState(0)

    const [image, setImage] = useState(null)
    const imageRef = useRef(null)
    const fullRef = useRef(null)
    const viewerContainerRef = useRef(null)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const handleViewerLoad = () => {
        const viewerContainerRect = viewerContainerRef.current.getBoundingClientRect()
      // console.log(`Viewer position: (${viewerContainerRect.left}, ${viewerContainerRect.top})`);
    }
    useEffect(()=>{
        const data = {
          fileName: 'https://firebasestorage.googleapis.com/v0/b/signatext.appspot.com/o/user%2FjGzIwPIXM7RGcvvbDpJ10JYewUw1%2Fdocuments%2F07.pdf?alt=media&token=535a60f3-93fb-4e9f-801c-2551c36eae62',
          imageName: './assets/test/khuong.png',
        }
        axios.post('http://localhost:4040/api/document/fileDimension', data).then(
            (response) => {
                console.log(response)
                setFileHeight(response.data.fileHeight+ 50)
                setFileWdith(response.data.fileWidth + 30)
                setIMGHeight(response.data.imageHeight)
                setIMGWidth(response.data.signatureImageWidth)
                setPDFFile(true)
            },
            (error) => {
              console.log(error)
            }
        )
    }, [])

    const fileType = ['application/pdf']

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber.currentPage)
    }


    const newplugin = defaultLayoutPlugin()

    const handleFileInputChange = (event) => {
        const file = event.target.files[0]
        console.log(file.width)
        const reader = new FileReader()

        reader.onload = (event) => {
          setImage(event.target.result)
        }
        reader.readAsDataURL(file)
    }

    const handleMouseDown = (event) => {
        if (imageRef.current) {
            const { clientX, clientY } = event
            const offsetX = clientX - parseInt(imageRef.current.style.left)
            const offsetY = clientY - parseInt(imageRef.current.style.top)
            const handleMouseMove = (event) => {
                const { clientX, clientY } = event
                let left = clientX - offsetX
                let top = clientY - offsetY
                imageRef.current.style.left = `${left}px`
                imageRef.current.style.top = `${top}px`
                setPosition({ x: left, y: top })
            }
            document.addEventListener('mousemove', handleMouseMove)
            document.addEventListener('mouseup', () => {
                document.removeEventListener('mousemove', handleMouseMove)
            })
        }
    }

    ///---
    useLayoutEffect(() => {
        setFrameWidth(fullRef.current.offsetWidth)
        setFrameHeight(fullRef.current.offsetHeight)
    }, [])

    //// cal position
    async function CalCoordinates() {
        console.log("Rìa tới ảnh: " + position.x)
        console.log("Rìa tới frame pdf: " + viewerContainerRef.current.getBoundingClientRect().left)
        console.log("Rìa tới frame pdf: " + (pdfFrameWidth - fileWidth))
        const leftToBear =
        position.x - viewerContainerRef.current.getBoundingClientRect().left
        const page = parseInt(fileWidth)
        const ratio = leftToBear / page

        const bottomSize = (fileHeight - position.y - (parseInt(imageHeight/2))) / fileHeight //60 là height ảnh / 2
        console.log(ratio + " - " + bottomSize)
        const data = {
            x_coor: parseFloat(ratio.toFixed(3)),
            y_coor: parseFloat(bottomSize.toFixed(3)),
            current_page: currentPage,
        }
        await axios.post('http://localhost:4040/api/document/sign', data).then(
            (response) => {
                console.log(response)
            },
            (error) => {
                console.log(error)
            }
        )
    }

    return (
        <div className="row" style={{ marginTop: '20px', marginBottom: '20px' }}>
            <div className="col-lg-12 d-flex justify-content-between">
                <div className="col-lg-4" style={{ fontFamily: 'Jost' }}>
                <input
                  style={{ fontSize: '12px' }}
                  type="file"
                  accept="image/*"
                  onChange={handleFileInputChange}
                />
                {image && (
                    <img
                        src={image}
                        alt="image"
                        ref={imageRef}
                        style={{
                            position: 'absolute',
                            left: '0px',
                            top: '0px',
                            cursor: 'grab',
                            maxWidth: imageWidth + "px",
                            maxHeight: imageHeight+ "px",
                            zIndex: 10000,
                        }}
                        onMouseDown={handleMouseDown}
                    />
                )}
                {image && (
                    <p>
                        Current position: {position.x}px, {position.y}px
                    </p>
                )}
                <button
                    className="btn btnViewPdf btnPress"
                    onClick={() => CalCoordinates()}
                > Check
                </button>
            </div>
            <div
                ref={fullRef}
                className="col-lg-8"
                style={{ fontSize: '12px', fontFamily: 'Jost' }} >
                    {pdfFile == true && (
                        <div
                            className="pdf-container"
                            style={{ fontSize: '12px', height: fileHeight +"px", width: fileWidth+"px"}}
                            ref={viewerContainerRef}>
                            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                                <>
                                    <Viewer
                                        defaultScale={SpecialZoomLevel.PageWidth}
                                        scrollMode={ScrollMode.Page}
                                        onPageChange={handlePageChange}
                                        onDocumentLoad={handleViewerLoad}
                                        fileUrl="https://firebasestorage.googleapis.com/v0/b/signatext.appspot.com/o/user%2FjGzIwPIXM7RGcvvbDpJ10JYewUw1%2Fdocuments%2F07.pdf?alt=media&token=535a60f3-93fb-4e9f-801c-2551c36eae62"
                                        plugins={[newplugin]}
                                    />
                                </>
                            </Worker>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default PdfViewer
