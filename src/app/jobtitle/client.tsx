"use client"
import { Flex, FormControl, FormLabel, Input, Button, Text } from '@chakra-ui/react';
import { useState } from "react";

export default function ClientSide() {
    const [jobTitle, setJobTitle] = useState('');

    const handleJobTitle = (e: any) => setJobTitle(e.target.value);

    const onSubmit = () => {
        if (typeof window !== 'undefined' && jobTitle) {
            window.localStorage.setItem('jobTitle', jobTitle);
            alert('Your job title has been set')
        }
        return; 
    }
    
    const onClick = () =>{
        if (typeof window !== 'undefined') {            
            const username = window.localStorage.getItem('username');
            const jobTitle = window.localStorage.getItem('jobTitle');
            const result = (username: string | null, jobTitle: string | null) => {
                if(username && jobTitle) return (`Your Username: ${username} \nYour Job Title:  ${jobTitle}`)
                else if(username || jobTitle) {
                    if(username) return (`Your Username: ${username} \nYou didn't set jobtitle.`)
                    else if(jobTitle) return (`You didn't set username. \nYour Job Title: ${jobTitle}`)
                }
                else return (`you didn't set both.`)
                               
            }
            alert(`${result(username, jobTitle)}`);
        }
    }

    return((<>WELCOME BACK!
        <Flex width={"30"} height={"100"} alignContent={"center"} justifyContent={"center"}>
            <FormControl>
                <FormLabel>Your Job Title</FormLabel>
                <Input 
                    placeholder="Reader"
                    width={'30%'} 
                    type='text' 
                    value={jobTitle} 
                    onChange={handleJobTitle}
                />
                <Button width={'30%'} onClick={onSubmit}>Submit</Button>
            </FormControl>
        </Flex>
        <Button onClick={onClick}>Check Your username and job title.</Button>
        </>)
    )
}