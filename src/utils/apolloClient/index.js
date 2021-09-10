import {
    ApolloClient,
    ApolloLink,
    concat,
    HttpLink,
    InMemoryCache,
    gql
} from '@apollo/client';
// import { setContext } from '@apollo/client/link/context';
import { useHistory } from 'react-router-dom';

const httpLink = new HttpLink({uri: 'http://localhost:8080/graphql'});



// const authLink = setContext((_, { headers }) => {
//     const token = localStorage.getItem('token');
//     if (token){
//         console.log(`Access token not found`, token);
//         console.log(`Access token`)
//         return {
//             headers: {
//                 ...headers,
//                 HTTP_Authorization: `Bearer ${token}`
//             }
//         };
//     }
//     else {
//         console.log(`Access token not found`);
//         return {headers: {...headers}};
//     }
// });

const authMiddleware = new ApolloLink((operation, forward) => {
    // if (operation.name == 'asfd')
    let token = localStorage.getItem('token');
    let history = useHistory();
    if (token){
        console.log(`Access token found`);
        operation.setContext({
            headers: {HTTP_authorization: token}
        });
        return;
    }
    if (!token){
        /** Update Refresh token on token missing or expired */
        console.log(`Access token not found`);
        let refresh = localStorage.getItem('refresh');
        if (refresh){
            console.log(`Refresh token found`);
            // const client = new ApolloClient({link: httpLink});
            // client.query(gql`
            //     query refresh($refreshToken: String!){refreshToken(refreshToken: $refreshToken){
            //         token
            //     }}`,
            //     {variables: {refreshToken: refresh}}
            // )
            // .then(result => {
            //     window.location.assign('/authenticate');

            // })
            // .catch(error => console.log(`Error catched refreshing token`));
        }
        
    };

    console.log(`Operation`, operation)
    return forward(operation).map((data) => {
        console.log(`After operation operation=`, operation);
        console.log(`After operation data=`, data);
        if (data.errors[0].message === 'You do not have permission to perform this action'){
            console.log(`Authentication error`);

            // Making new query 
            // const client = new ApolloClient({link: httpLink});
            let refresh = localStorage.getItem('refresh');
            if (!refresh){
                history.push('/auth/signin');
                
            }
            console.log('Refresh token not found');
            
                
            client.query({query:gql`
                query refresh($refreshToken: String!){refreshToken(refreshToken: $refreshToken){
                    token
                }}`,
                variables: {refreshToken: refresh}
            }).then((data) => {
                console.log(`Executed fetching Access token`);
                localStorage.setItem(token, `Bearer ${data.token}`);
            }).catch(error => {
                // TODO: Find out what type of error: if refresh token obtaining error, then reauthenticate
            });
            
            return data;
        }
        return data;
    });
});


const client = new ApolloClient({
    link: authMiddleware.concat(httpLink),
    cache: new InMemoryCache(),
    // headers: { 
    //     'HTTP_authorization': localStorage.getItem('token') || preAuth()
    // }
});

export default client;