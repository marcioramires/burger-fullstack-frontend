import React from "react";

import CartLogo from '../../assets/cart-logo.svg'
import { Container, CartImg, Wrapper } from './styles'
import { OrderResume } from '../../components'

export function Orders() {

    return (
        <Container>
            <CartImg src={CartLogo} alt="logo do carrinho" />
            <Wrapper>
                <OrderResume />
            </Wrapper>
        </Container>
    )
}
