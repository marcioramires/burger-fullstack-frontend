import React from "react";

import { SideMenuAdmin } from "../../components";
import Orders from "./Orders";
import ListProducts from "./ListProducts";
import { Container, ContainerItems } from "./styles";
import paths from "../../constants/paths";

export function Admin({ match: { path } }) {

    return (
        <Container>
            <SideMenuAdmin path={path} />
            <ContainerItems>
                {path === paths.Order && <Orders />}
                {path === paths.ShowProducts && <ListProducts />}
                {/* {path === paths.NewProduct && <NewProducts />} */}
            </ContainerItems>
        </Container>
    )
}