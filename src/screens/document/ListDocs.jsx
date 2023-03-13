import React, {useCallback, useEffect, useState} from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
    Typography, Button, Box
} from "@mui/material";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Layout from '../../components/Layout/index.jsx'
import {useNavigate} from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete.js";
import {StyledIconButton, StyledTablePagination} from "../signature/ManageSignature/styles.js";
import DeleteDocument from "./DeleteDocument/index.jsx";
import axios from "axios";

function createData(id,name, status, date) {
    return { id,name, status, date };
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function ListDocs(){
    const navigate = useNavigate()
    const [value, setValue] = useState(0);
    const [documentList, setDocumentList] = useState([])
    const [page, setPage] = useState(1)
    const [deleteId, setDeleteId] = useState()
    const [openDeleteModal, setOpenDeleteModal] = useState(false)

    useEffect(() => {
        setDocumentList([
            createData(1,'Hop_Dong_Thue_Nha.pdf', "Not Completed", "2023-02-21 17:05"),
            createData(2,'Hop_Dong_Ban_Nha.pdf', "Completed", "2023-02-21 17:05"),
            createData(3,'Hop_Dong_Thue.pdf', "Not Completed", "2023-02-21 17:05"),
            createData(4,'Hop_Dong_TTNCN.pdf', "Completed", "2023-02-21 17:05"),
            createData(5,'Hop_Dong_Lao_Dong.pdf', "Not Completed", "2023-02-21 17:05"),
        ])

        // TODO: Integrate with BE
        // axios.get('http://localhost:4040/api/signature').then(
        //   (response) => {
        //     console.log(response)
        //   },
        //   (error) => {
        //     console.log(error)
        //   }
        // )
    }, [])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const navigateToCreateNewDocument = () => {
        navigate('/document/upload')
    }
    const handleChangePage = useCallback((event, newPage) => {
        setPage(newPage)
    }, [])
    const handleDeleteSignature = useCallback(() => {
        // TODO: Integrate with BE
        // axios.delete(`api`).then(
        //     (response) => {
        //         console.log(response)
        //     },
        //     (error) => {
        //         console.log(error)
        //     }
        // )
    }, [deleteId])
    return(
        <>
            <Layout>
                <Box
                    marginTop={10}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Typography component="h1" variant="h5">
                        Documents List
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={navigateToCreateNewDocument}
                    >
                        Upload
                    </Button>
                </Box>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Self Made" {...a11yProps(0)} sx={{ '&.Mui-selected': { outline: 'none' } }}/>
                            <Tab label="Other Made" {...a11yProps(1)} sx={{ '&.Mui-selected': { outline: 'none' } }}/>
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>No.</TableCell>
                                        <TableCell>Name file</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Updated At</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {documentList.map((document) => (
                                        <TableRow key={document.id}>
                                            <TableCell component="th" scope="row">
                                                {document.id}
                                            </TableCell>
                                            <TableCell>{document.name}</TableCell>
                                            {document.status == 'Completed' ? <TableCell sx={{color:'#5D9C59'}}>{document.status}</TableCell> : <TableCell sx={{color:'#F96666'}}>{document.status}</TableCell>}

                                            <TableCell>{document.date}</TableCell>
                                            <TableCell align="right">
                                                <StyledIconButton
                                                    size="medium"
                                                    onClick={() => {
                                                        setDeleteId(document.id)
                                                        setOpenDeleteModal(true)
                                                    }}
                                                >
                                                    <DeleteIcon fontSize="inherit" color="error" />
                                                </StyledIconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                                <StyledTablePagination
                                    rowsPerPageOptions={[]}
                                    count={documentList.length}
                                    rowsPerPage={3}
                                    page={page}
                                    onPageChange={handleChangePage}
                                />
                            </Table>
                        </TableContainer>
                    </TabPanel>
                    <TabPanel value={value} index={1}></TabPanel>
                </Box>

                <DeleteDocument
                    open={openDeleteModal}
                    onClose={() => setOpenDeleteModal(false)}
                    onClickCancel={() => setOpenDeleteModal(false)}
                    onClickConfirm={handleDeleteSignature}
                />
            </Layout>
        </>
    )
}

export default ListDocs