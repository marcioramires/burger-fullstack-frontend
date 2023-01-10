import React, { useEffect, useState } from "react";

import ProductsLogo from '../../assets/products-logo.svg'
import { api } from "../../services/api";
import { CardProduct } from '../../components'
import { Container, ProductImg, CategoryButton, CategoriesMenu, ProductsContainer } from './styles'
import formatCurrency from '../../utils/formatCurrency'
import { useHistory } from "react-router-dom";
import { useUser } from "../../hooks/UserContext";
import { toast } from "react-toastify";

export function Products({ location: { state } }) {

    let categoryId = 0
    if (state?.categoryId) {
        categoryId = state.categoryId
    }

    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [activeCategory, setActiveCategory] = useState(categoryId)
    const { push } = useHistory()
    const { logout } = useUser()

    useEffect(() => {

        async function loadCategories() {
            try {
                const { data } = await api.get('categories')

                const allCategories = [{ id: 0, name: 'Todas' }, ...data]

                setCategories(allCategories)

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

        async function loadProducts() {
            try {
                const { data } = await api.get('products')

                const newProducts = data.map(product => {
                    return { ...product, formatedPrice: formatCurrency(product.price) }
                })

                setProducts(newProducts)
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
        loadCategories()

    }, [])

    useEffect(() => {
        if (activeCategory === 0) {
            setFilteredProducts(products)
        } else {
            const newFilteredProducts = products.filter(
                product => product.category_id === activeCategory
            )

            setFilteredProducts(newFilteredProducts)
        }
    }, [activeCategory, products])

    return (
        <Container>
            <ProductImg src={ProductsLogo} alt="logo-da-pagina-de-produtos" />
            <CategoriesMenu>
                {categories && categories.map(category => (
                    <CategoryButton
                        type="button"
                        key={category.id}
                        isActiveCategory={activeCategory === category.id}
                        onClick={() => {
                            setActiveCategory(category.id)
                        }}
                    >
                        {category.name}
                    </CategoryButton>
                ))}
            </CategoriesMenu>
            <ProductsContainer>
                {filteredProducts && filteredProducts.map(product => (
                    <CardProduct key={product.id} product={product} />
                ))}
            </ProductsContainer>
        </Container>
    )
}
