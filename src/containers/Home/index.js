import React from "react";

import CategoryCarousel from '../../components/CategoryCarousel/index.js'
import HomeLogo from '../../assets/home-logo.svg'
import { Container, HomeImg } from './styles'
import OffersCarousel from "../../components/OffersCarousel/index.js";

function Home() {

    return (
        <Container>
            <HomeImg src={HomeLogo} alt="logo-da-home" />
            <CategoryCarousel />
            <OffersCarousel />
        </Container>
    )
}

export default Home