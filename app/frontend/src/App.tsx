import React from "react"
import { FC } from 'react';
import { useForm } from  'react-hook-form';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import { ProductTemplate} from "./components/ProductTemplate";
import { Product} from "./components/Product";
import Layout from "./components/Layout";
import { Button } from "./components/ui/button"
import { HStack } from "@chakra-ui/react"
import { Heading, Text, Box, Flex, Table,  } from "@chakra-ui/react"

const App: FC = () => {


    return (
        // <Router>
        //     <Layout>
        //         <Routes>
        //             <Route path="/" exact>
                        <Flex
                            width={"100vw"}
                            height={"100vh"}
                            alignContent={"center"}
                            justifyContent={"center"}
                        >
                            <Box maxW="2xl" m="0 auto">
                                <Heading as="h1" textAlign="center" fontSize="5xl" mt="100px">
                                    Welcome To ShipSticks!
                                </Heading>
                                <p>&nbsp;</p>
                                <ProductList />
                            </Box>
                            <Box>
                                <ProductForm />
                            </Box>
                        </Flex>
                    // {/*</Route>*/}
                    // {/*<Route path="/product/:id">*/}
                    // {/*    <ProductTemplate />*/}
                    // {/*</Route>*/}
                // {/*</Routes>*/}
            // </Layout>
        // </Router>
    );
}
export default App;
