import axios from "axios";
import { Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { URL } from "../config/constans";

const Login = (props: {setAuth:any}) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');


    const login = async (e: any) => {
        e.preventDefault();
        const response = await axios.post(URL + "/auth/login", {
            email,
            password
        });

        if(response && response.data)
        {
            localStorage.setItem("token", response.data.token);
            props.setAuth(true);
        }
        
    }


    return <div className="flex items-center justify-center h-[100vh]">
        <form className="flex max-w-md flex-col gap-4 border px-12 py-6 rounded-md w-[400px]" onSubmit={e => login(e)}>
            <p className="text-xl font-bold text-center">Login</p>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="email1" value="Your email" />
                </div>
                    <TextInput id="email1" type="email" placeholder="name@flowbite.com" onChange={(e) => setEmail(e.target.value)} required />
                </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="password1" value="Your password" />
                </div>
                <TextInput id="password1" type="password" required onChange={(e) => setPassword(e.target.value)} />
            </div>
            <Button type="submit">Login</Button>
        </form>
    </div> 
}

export default Login;