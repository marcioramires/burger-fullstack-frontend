import React, { useEffect, useState } from "react";
import Carousel from "react-elastic-carousel";

import Category from '../../assets/categories.png'
import { Container, CategoryImg, ContainerItems, Image, Button } from './styles'
import { api } from '../../services/api'
import { toast } from "react-toastify";
import { useUser } from "../../hooks/UserContext";
import { useHistory } from "react-router-dom";

export function CategoryCarousel() {
    const [categories, setCategories] = useState([])
    const { push } = useHistory()
    const { logout } = useUser()

    useEffect(() => {

        async function loadCategories() {
            try {
                const { data } = await api.get('categories')

                setCategories(data)
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

        loadCategories()
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
            <CategoryImg src={Category} alt="logo-da-categoria" />
            <Carousel
                itemsToShow={5}
                style={{ width: '90%' }}
                breakPoints={breakPoints}
            >
                {categories && categories.map(category => (
                    <ContainerItems key={category.id}>
                        <Image src={category.url} alt="foto-da-categoria" />
                        <Button to={{
                            pathname: "/produtos",
                            state: { categoryId: category.id }
                        }}
                        >
                            {category.name}
                        </Button>
                    </ContainerItems>
                ))}
            </Carousel>
        </Container>
    )
}
