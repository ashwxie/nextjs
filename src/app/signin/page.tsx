"use client"

import { Button, Flex, FormControl, FormLabel, Input, Link, Text } from '@chakra-ui/react'
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function signInPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("");
  
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/admin";
  
    const handleEmail = (e: any) => setEmail(e.target.value);
    const handlePassword = (e: any) => setPassword(e.target.value);

    const onSubmit = async () => {
        try{
            const res = await signIn('credentials', {
                email: email,
                password: password,
                redirect: false,
                callbackUrl
            })
            if (!res?.error) {
                router.push(callbackUrl);
            } else {
                setError("invalid email or password");
            }
        } catch (err: any){
            console.error(err);
            if(err) setError(`${err}`);
        }
    }

    return (<>
            SIGN IN
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
            <Flex width={"30"} height={"100"} alignContent={"center"} justifyContent={"left"}>
                <Link width={'30%'} href='./signup'>Don't have account ? Sign up :D</Link>
            </Flex>
            <Flex width={"30"} height={"100"} alignContent={"center"} justifyContent={"left"}>
                <Button width={'30%'} onClick={() => signIn("github", { callbackUrl })}>Use Github</Button>
            </Flex>
    </>)    
}