import React from "react";
import { useHistory } from "react-router-dom";

import { useUser } from '../../hooks/UserContext'

import Cart from '../../assets/cart.svg'
import User from '../../assets/user.svg'
import {
    Container,
    ContainerRight,
    ContainerLeft,
    ContainerText,
    Line,
    PageLink,
    PageLinkOrders,
    PageLinkExit
} from './styles'
import paths from "../../constants/paths";


export function Header() {
    const { logout, userData } = useUser()
    const { push, location: { pathname } } = useHistory()

    const logoutUser = () => {
        logout()
        push('/')
    }

    return (
        <Container>
            <ContainerLeft>
                <PageLink onClick={() => push(paths.Home)} isActive={pathname === '/'}>
                    Home
                </PageLink>
                <PageLink onClick={() => push(paths.Products)} isActive={pathname.includes('/produtos')}>
                    Ver Produtos
                </PageLink>
            </ContainerLeft>
            <ContainerRight>
                <PageLinkOrders onClick={() => push(paths.Orders)} isActive={pathname === '/meus-pedidos'}>
                    <div>
                        <p>Meus Pedidos</p>
                        <img src={User} alt="usuário" />
                    </div>
                </PageLinkOrders>
                <Line>
                </Line>
                <PageLink onClick={() => push(paths.Cart)} isActive={pathname === '/carrinho'}>
                    <img src={Cart} alt="carrinho" />
                </PageLink>
                <ContainerText>
                    <p>
                        Olá, {userData.name}
                    </p>
                    <PageLinkExit onClick={logoutUser}>
                        Sair
                    </PageLinkExit>
                </ContainerText>
            </ContainerRight>
        </Container>
    )
}
