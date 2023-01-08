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
    PageLinkExit
} from './styles'


export function Header() {
    const { logout, userData } = useUser()
    const { push, location: { pathname } } = useHistory()

    const logoutUser = () => {
        logout()
        push('/login')
    }

    return (
        <Container>
            <ContainerLeft>
                <PageLink onClick={() => push('/')} isActive={pathname === '/'}>
                    Home
                </PageLink>
                <PageLink onClick={() => push('/produtos')} isActive={pathname.includes('/produtos')}>
                    Ver Produtos
                </PageLink>
            </ContainerLeft>
            <ContainerRight>
                <PageLink>
                    <img src={User} alt="usuário" />
                </PageLink>
                <Line>
                </Line>
                <PageLink onClick={() => push('/carrinho')} isActive={pathname === '/carrinho'}>
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
