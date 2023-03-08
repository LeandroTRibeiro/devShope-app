import { Link } from "react-router-dom";
import { Header } from "../components/Header";

 export const ConectionError = () => {
    return (
        <>
            <Header />
            <div>
                Erro de conexão, verifique sua conexão e tente novamente mais tarde!
                <Link to="/" className="btn btn-primary">Voltar</Link>
            </div>
        </>
    );
 };