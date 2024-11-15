import { FC } from 'react';
import gql from 'graphql-tag';
import { useGQLQuery } from "./useGQLQuery";

const GET_PRODUCTS = gql`
    query ListProducts {
      products {
        id
        name
        type
        length
        width
        height
        weight
      }
    }
`
// const App: FC = () => {
//   return (
//     <div>
//       <h1>Hello, World!</h1>
//     </div>
// )};

const App: FC = () => {
    const { data, isLoading, error } = useGQLQuery(['products'], GET_PRODUCTS)
    console.log(data)
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Something went wrong ...</div>;

    return (
        <div>
          <p>Product Listing</p>
            {data.products.map(product => (
                <div key={product.name}>{product.name}</div>
            ))}
        </div>
    );
};

export default App;
