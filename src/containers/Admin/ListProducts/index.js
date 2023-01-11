import React, { useEffect, useState } from "react";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { api } from '../../../services/api'
import { Container } from './styles'
import formatCurrency from '../../../utils/formatCurrency'
import { useHistory } from "react-router-dom";
import { useUser } from "../../../hooks/UserContext";
import { toast } from "react-toastify";
import editIcon from '../../../assets/edit-icon.svg'

function ListProducts() {
    const [products, setProducts] = useState([])
    const { push } = useHistory()
    const { logout } = useUser()

    useEffect(() => {
        async function loadProducts() {
            try {
                const { data } = await api.get('products')

                setProducts(data)
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

        loadProducts()
    }, [])

    function isOffer(offerStatus) {
        if (offerStatus) {
            return "Sim"
        }
        return "Não"
    }

    return (
        <Container>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>Nome</TableCell>
                            <TableCell align='center'>Foto do Produto</TableCell>
                            <TableCell align='center'>Preço</TableCell>
                            <TableCell align='center'>Produto em Oferta</TableCell>
                            <TableCell align='center'>Editar</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow
                                key={product.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {product.name}
                                </TableCell>
                                <TableCell align='center'>
                                    <img
                                        src={product.url}
                                        style={{
                                            width: '70px',
                                            height: '70px',
                                            borderRadius: '5px'
                                        }}
                                    />
                                </TableCell>
                                <TableCell align='center'>{formatCurrency(product.price)}</TableCell>
                                <TableCell align='center'>{isOffer(product.offer)}</TableCell>
                                <TableCell align='center'><button><img src={editIcon} /></button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}

export default ListProducts
