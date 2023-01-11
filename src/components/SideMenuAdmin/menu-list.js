import bag from '../../assets/bag-icon.svg'
import shop from '../../assets/products-icon.svg'
import add from '../../assets/add-product-icon.svg'
import paths from '../../constants/paths'

const listLinks = [
    {
        id: 1,
        label: 'Pedidos',
        link: paths.Order,
        icon: bag
    },
    {
        id: 2,
        label: 'Listar Produtos',
        link: paths.ShowProducts,
        icon: shop
    }
    ,
    {
        id: 3,
        label: 'Listar Usuários',
        link: paths.ShowUsers,
        icon: add
    }
]

export default listLinks