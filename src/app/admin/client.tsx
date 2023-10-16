"use client"
import { Flex, FormControl, FormLabel, Input, Button, Text, Alert, AlertIcon } from '@chakra-ui/react';
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { ApolloClient, InMemoryCache, gql, useQuery } from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://graphqlpokemon.favware.tech/v7',
    cache: new InMemoryCache(),
});

const GET_POKEMON_DETAILS = gql`
  {
    getPokemon(pokemon: dragonite) {
      sprite
      num
      species
      color
    }
  }
`;

export default function ClientSide() {
    const [username, setUsername] = useState('');
    const router = useRouter();  

    const handleUsername = (e: any) => setUsername(e.target.value);

    const onSubmit = () => {
        if (typeof window !== 'undefined' && username) {
            window.localStorage.setItem('username', username);
            alert('Your username has been set')
        }
        return; 
    }

    const handleGraphQL = () => client
    .query({
        query: GET_POKEMON_DETAILS,
    })
    .then((result) => {
        const data = result?.data?.getPokemon || "oops graphql failed";
        let tmp = 'oops graphql call failed';
        if(data)  tmp = JSON.stringify(data);
        window.alert(`a wild pokemon has appeared! ${tmp}`);
    })

    const handleClick = () =>{
        router.push('/jobtitle');
    }

    return((<>WELCOME BACK!
        <Flex width={"30"} height={"100"} alignContent={"center"} justifyContent={"center"}>
            <FormControl>        
                <FormLabel> Set your user name</FormLabel>
                <Input 
                    placeholder="Capybara"
                    width={'30%'} 
                    type='text' 
                    value={username} 
                    onChange={handleUsername}
                />
                <Button width={'30%'} onClick={onSubmit}>Submit</Button>
            </FormControl>
        </Flex>
        <Flex width={"30"} height={"100"} alignContent={"center"} justifyContent={"left"}>
            <Button onClick={handleClick}>Click to Set Your Job Title</Button>
        </Flex>
        <Button onClick={handleGraphQL}>I solemnly swear i'm up to no good</Button>
        </>)
    )
}