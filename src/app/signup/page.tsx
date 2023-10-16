'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Flex, FormControl, FormLabel, Input, Link, Text } from '@chakra-ui/react'
import { signIn } from "next-auth/react";

export default function signUpPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("");
  
    const handleEmail = (e: any) => setEmail(e.target.value);
    const handlePassword = (e: any) => setPassword(e.target.value);

    const onSubmit = async () => {
        try {
            const res = await fetch('/api/user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })
            if(res?.ok)  router.push('/signin');
            else setError((await res.json()).message)

            signIn(undefined, { callbackUrl: "/" });
        } catch (err: any) {            
            if(err) setError(`${err}`)
        }
    }

    return(<>
        SIGN UP
        <Flex width={"30"} height={"100"} alignContent={"center"} justifyContent={"center"}>
            <FormControl isRequired>
                <FormLabel>Email address</FormLabel>
                <Input width={'30%'} type='email' value={email} onChange={handleEmail}/>
            </FormControl>
        </Flex>
        <Flex width={"30"} height={"100"} alignContent={"center"} justifyContent={"center"}>
            <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input width={'30%'} type='password' value={password} onChange={handlePassword}></Input>
            </FormControl>
        </Flex>
        <Flex width={"30"} height={"100"} alignContent={"center"} justifyContent={"left"}>
            <Button width={'30%'} onClick={onSubmit}>Submit</Button>
            { error && <Text color='red'>{error}</Text>}
        </Flex>
    </>)
}
