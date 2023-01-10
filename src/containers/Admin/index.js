import React from "react";

import { SideMenuAdmin } from "../../components";
import Orders from "./Orders";
import ListProducts from "./ListProducts";
import ListUsers from "./ListUsers";
import { Container, ContainerItems } from "./styles";
import paths from "../../constants/paths";
import NewProduct from "./NewProduct";

export function Admin({ match: { path } }) {

    return (
        <Container>
            <SideMenuAdmin path={path} />
            <ContainerItems>
                {path === paths.Order && <Orders />}
                {path === paths.ShowProducts && <ListProducts />}
                {path === paths.ShowUsers && <ListUsers />}
                {path === paths.NewProduct && <NewProduct />}
            </ContainerItems>
        </Container>
    )
}