import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useUser } from '../../hooks/UserContext'
import { api } from '../../services/api'
import { Container, Header, Body, EmptyCart } from './styles'

export function OrderResume() {
    const [orders, setOrders] = useState([])
    const { push } = useHistory()
    const { logout } = useUser()

    useEffect(() => {
        async function loadOrders() {
            try {
                const { data } = await api.get('orders')
                setOrders(data)

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
    }, [orders])

    return (
        <Container>
            <h2>Meus Pedidos</h2>
            <Header>
                <p></p>
                <p>Itens</p>
                <p>Quantidade</p>
                <p>Preço</p>
                <p>Total</p>
            </Header>

            <Body>
                <EmptyCart>Sem pedidos até o momento</EmptyCart>
            </Body>
        </Container>
    )
}
