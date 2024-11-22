import { useQuery } from "@tanstack/react-query";
import { GraphQLClient, request } from "graphql-request";
import Cookies from 'js-cookie'

const csrfToken = getCSRFToken();
const API_URL = 'http://localhost:3000/graphql'

const graphQLClient = new GraphQLClient(API_URL, {
    headers: {'X-CSRF-TOKEN': csrfToken}
});

export const useGQLQuery = (key, query, variables, config = {}) => {
    const endpoint = 'http://localhost:3000/graphql'
    const fetchData = async () => await graphQLClient.request(query, variables)

    return useQuery(key, fetchData, config)
};

function getCSRFToken() {
    return Cookies.get('XSRF-TOKEN');
}
