import React, { useEffect, useState } from "react";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import api from '../../../services/api'
import { Container } from './styles'
import formatCurrency from '../../../utils/formatCurrency'


function ListProducts() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        async function loadProducts() {
            const { data } = await api.get('products')

            setProducts(data)
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
                                <TableCell align='center'><button>Editar Produto</button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}

export default ListProducts
