import { FC } from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ProductList from "./components/ProductList";

const App: FC = () => {
    return (
        <BrowserRouter>
                <Routes>
                    <Route path="/" element={<ProductList />}/>
                </Routes>
        </BrowserRouter>
    );
}
export default App;
