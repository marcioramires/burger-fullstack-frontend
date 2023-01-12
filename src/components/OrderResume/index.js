import React, { useEffect, useState } from "react";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Row from "./row";
import formatDate from "../../utils/formatDate";
import { api } from "../../services/api";
import { Container } from "./styles";

import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { useUser } from "../../hooks/UserContext";

export function OrderResume() {
    const [orders, setOrders] = useState([])
    const [filteredOrders, setFilteredOrders] = useState([])
    const [rows, setRows] = useState([])
    const { push } = useHistory()
    const { logout, userData } = useUser()

    useEffect(() => {
        async function loadOrders() {
            try {
                const { data } = await api.get('orders')
                const userOrders = []
                for (let i = 0; i < data.length; i++) {
                    if (data[i].user.name === userData.name) {
                        userOrders.push(data[i])
                    }
                }
                setOrders(userOrders)
                setFilteredOrders(userOrders)

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

        loadOrders()
    }, [])

    function createData(order) {
        return {
            name: order.user.name,
            orderId: order._id,
            date: formatDate(order.createdAt),
            status: order.status,
            products: order.products
        };
    }

    useEffect(() => {
        const newRows = filteredOrders.map(ord => createData(ord))
        setRows(newRows)

    }, [filteredOrders])

    return (
        <Container>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Pedido</TableCell>
                            <TableCell>Nome do Cliente</TableCell>
                            <TableCell>Data do Pedido</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <Row
                                key={row.orderId}
                                row={row}
                                setOrders={setOrders}
                                orders={orders}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}
