import React, { useEffect, useState } from "react";

import ProductsLogo from '../../assets/products-logo.svg'
import api from "../../services/api";
import { CardProduct } from '../../components'
import { Container, ProductImg, CategoryButton, CategoriesMenu, ProductsContainer } from './styles'
import formatCurrency from '../../utils/formatCurrency'

export function Products({ location: { state } }) {

    let categoryId = 0
    if (state?.categoryId) {
        categoryId = state.categoryId
    }

    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [activeCategory, setActiveCategory] = useState(categoryId)

    useEffect(() => {

        async function loadCategories() {
            const { data } = await api.get('categories')

            const allCategories = [{ id: 0, name: 'Todas' }, ...data]

            setCategories(allCategories)
        }

        async function loadProducts() {
            const { data } = await api.get('products')

            const newProducts = data.map(product => {
                return { ...product, formatedPrice: formatCurrency(product.price) }
            })

            setProducts(newProducts)
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
