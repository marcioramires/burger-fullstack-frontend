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
import { useHistory } from "react-router-dom";
import { useUser } from "../../../hooks/UserContext";
import { toast } from "react-toastify";

function ListUsers() {
    const [users, setUsers] = useState([])
    const { push } = useHistory()
    const { logout } = useUser()

    useEffect(() => {
        async function loadUsers() {
            try {
                const { data } = await api.get('users')

                setUsers(data)
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

        loadUsers()
    }, [])

    return (
        <Container>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>Id do Usuário</TableCell>
                            <TableCell align='center'>foto</TableCell>
                            <TableCell align='center'>Nome</TableCell>
                            <TableCell align='center'>Endereço</TableCell>
                            <TableCell align='center'>Telefone</TableCell>
                            <TableCell align='center'>E-mail</TableCell>
                            <TableCell align='center'>Data de Nascimento</TableCell>
                            <TableCell align='center'>Login</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow
                                key={user.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align='center' component="th" scope="row">
                                    {user.id}
                                </TableCell>
                                <TableCell align='center'>{user.name}</TableCell>
                                <TableCell align='center'>
                                    <img
                                        src={user.url} style={{
                                            width: '70px',
                                            height: '70px',
                                            borderRadius: '5px'
                                        }} />
                                </TableCell>
                                <TableCell align='center'>{user.address}</TableCell>
                                <TableCell align='center'>{user.phone}</TableCell>
                                <TableCell align='center'>{user.email}</TableCell>
                                <TableCell align='center'>{user.birthday}</TableCell>
                                <TableCell align='center'>{user.login}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}

export default ListUsers
