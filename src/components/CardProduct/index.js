import React from "react";
import { useHistory } from "react-router-dom";
import { useCart } from "../../hooks/CartContext";

import { Button } from '../'
import { Container, Image, ProductName, ProductPrice } from './styles'
import apiURL from "../../constants/url";

export function CardProduct({ product }) {
    const { putProductInCart } = useCart()
    const { push } = useHistory()
    return (
        <Container>
            <Image src={apiURL + product.url} alt='imagem-do-produto' />
            <div>
                <ProductName>{product.name}</ProductName>
                <ProductPrice>{product.formatedPrice}</ProductPrice>
                <Button onClick={() => {
                    putProductInCart(product)
                    push('carrinho')
                }}>
                    Adicionar
                </Button>
            </div>
        </Container >
    )
}
