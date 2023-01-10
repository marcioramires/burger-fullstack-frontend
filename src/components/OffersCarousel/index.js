import React, { useEffect, useState } from "react";
import Carousel from "react-elastic-carousel";
import { useHistory } from "react-router-dom";

import { useCart } from "../../hooks/CartContext";
import Offers from '../../assets/offers.png'
import { Container, OfferImg, ContainerItems, Image, Button } from './styles'
import { api } from '../../services/api'
import formatCurrency from "../../utils/formatCurrency";
import { toast } from "react-toastify";
import { useUser } from "../../hooks/UserContext";

export function OffersCarousel() {
    const [offers, setOffers] = useState([])
    const { putProductInCart } = useCart()
    const { push } = useHistory()
    const { logout } = useUser()

    useEffect(() => {

        async function loadOffers() {
            try {
                const { data } = await api.get('products')

                const onlyOffers = data.filter(product => product.offer).map(product => {
                    return { ...product, formatedPrice: formatCurrency(product.price) }
                })

                setOffers(onlyOffers)
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

        loadOffers()
    }, [])

    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 400, itemsToShow: 2 },
        { width: 600, itemsToShow: 3 },
        { width: 900, itemsToShow: 4 },
        { width: 1300, itemsToShow: 5 },
    ]

    return (
        <Container>
            <OfferImg src={Offers} alt="logo-da-oferta" />
            <Carousel
                itemsToShow={5}
                style={{ width: '90%' }}
                breakPoints={breakPoints}
            >
                {offers && offers.map(product => (
                    <ContainerItems key={product.id}>
                        <Image src={product.url} alt="foto-do-produto" />
                        <p>{product.name}</p>
                        <p>{product.formatedPrice}</p>
                        <Button onClick={() => {
                            putProductInCart(product)
                            push('carrinho')
                        }}
                        >
                            Peça agora
                        </Button>
                    </ContainerItems>
                ))}
            </Carousel>
        </Container>
    )
}