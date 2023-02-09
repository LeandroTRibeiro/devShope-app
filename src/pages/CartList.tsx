import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { useAppSelector } from "../redux/hooks/useAppSelector"

export const CartList = () => {

    const cartList = useAppSelector(state => state.cartList.cartList.product);

    if(cartList.length > 0) {
        return (
            <div>
                <Header />
                Cart Page
                <Footer />
            </div>
        );
    } else {
        return (
            <div>Não temos nada</div>
        );
    }
}