import React from "react";

import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { ProductImg, ReactSelectStyle } from "./styles";
import { api } from '../../../services/api'
import status from "./orderStatus";
import { toast } from "react-toastify";
import { useUser } from "../../../hooks/UserContext";
import { useHistory } from "react-router-dom";
import apiURL from "../../../constants/url";

function Row({ row, setOrders, orders }) {
    const [open, setOpen] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)
    const { push } = useHistory()
    const { logout } = useUser()

    async function setNewStatus(id, status) {
        setIsLoading(true)
        try {
            await api.put(`orders/${id}`, { status })

            const newOrders = orders.map(order => {
                return order._id === id ? { ...order, status } : order
            })

            setOrders(newOrders)
            setIsLoading(false)
        } catch (error) {
            if (error.response.data.error === 'Token is invalid') {
                toast.error('Tempo de conexão expirado, faça login novamente!', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                setTimeout(() => {
                    logout()
                    push('/')
                }, 1500)
            }
        }
    }

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? '-' /* <KeyboardArrowUpIcon /> */ : '+'  /* <KeyboardArrowDownIcon /> */}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.orderId}
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>
                    <ReactSelectStyle
                        options={status.filter(sts => sts.value !== 'Todos')}
                        menuPortalTarget={document.body}
                        placeholder="Status"
                        defaultValue={
                            status.find(option => option.value === row.status) || null
                        }
                        onChange={newStatus => {
                            setNewStatus(row.orderId, newStatus.value)
                        }}
                        isLoading={isLoading}
                    />
                </TableCell>
                <TableCell>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Pedido
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Quantidade</TableCell>
                                        <TableCell>Produto</TableCell>
                                        <TableCell>Categoria</TableCell>
                                        <TableCell>Imagem do Produto</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.products.map((productRow) => (
                                        <TableRow key={productRow.id}>
                                            <TableCell component="th" scope="row">
                                                {productRow.quantity}
                                            </TableCell>
                                            <TableCell>{productRow.name}</TableCell>
                                            <TableCell>{productRow.category}</TableCell>
                                            <TableCell>
                                                <ProductImg src={apiURL + productRow.url} alt="imagem-do-produto" />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default Row