import axios from "axios";
import { Button, Label, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { URL } from "../../config/constans";
import { useNavigate, useParams } from "react-router-dom";
const Edit = () => {
    const [firstname, setFirstname] = useState<string>('');
    const [lastname, setLastname] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordConfirm, setPasswordConfirm] = useState<string>('');
    const [role, setRole] = useState<number>();
    const [roles, setRoles] = useState([]);
    const navigate = useNavigate();

    const {id} = useParams();

    useEffect(() => {
        getUser();
        getRoles();
    },[]);

    const getRoles = async () => {
        const response = await axios.get(URL + "/role");
        if(response && response.data)
        {
            setRoles(response.data);
        }
    }

    const getUser = async () => {
        try{
            const response = await axios.get(URL + "/user/" + id);
            if(response && response.data)
            {
                const user: any = response.data;
                setFirstname(user.firstname);
                setLastname(user.lastname);
                setEmail(user.email);
                setRole(user.role_id)
                // setRoles(response.data);
            }
        }catch(e)
        {
            navigate('/')
        }
     
    }

    const udpate = async (e: any) => {
        e.preventDefault();

        if(password !== passwordConfirm) return window.location.reload() ;

        await axios.put(URL + "/user/" + id, {
            email,
            password,
            role_id: role,
            firstname,
            lastname
        });
        navigate('/')
    }
    return <div className="flex items-center justify-center h-[100vh]">
    <form className="flex max-w-md flex-col gap-4 border px-12 py-6 rounded-md w-[400px]" onSubmit={e => udpate(e)}>
        <p className="text-xl font-bold text-center">Create</p>
        <div>
            <div className="mb-2 block">
                <Label htmlFor="Firstname" value="Firstname" />
            </div>
            <TextInput id="Firstname" type="text" placeholder="Firstname" value={firstname} onChange={(e) => setFirstname(e.target.value)} required />
        </div>
        <div>
            <div className="mb-2 block">
                <Label htmlFor="Lastname" value="Lastname" />
            </div>
            <TextInput id="Lastname" type="text" placeholder="Lastname" value={lastname} onChange={(e) => setLastname(e.target.value)} required />
        </div>
        <div>
            <div className="mb-2 block">
                <Label htmlFor="Role" value="Role" />
            </div>
            <Select onChange={(e) => setRole(Number(e.target.value))} required>
                {
                    roles.length ? roles.map((element: any) => (
                        <option key={element.id} value={element.id} selected={role === Number(element.id) ? true : false}>{element.name}</option>
                    )):<option >No role</option>
                }
            </Select>
        </div>
        <div>
            <div className="mb-2 block">
                <Label htmlFor="email1" value="Your email" />
            </div>
            <TextInput id="email1" type="email" placeholder="name@flowbite.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        {
            role !== 3 && <>
              <div>
            <div className="mb-2 block">
                <Label htmlFor="password1" value="Your password" />
            </div>
                <TextInput id="password1" type="text"  onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="password2" value="Confirm password" />
                </div>
                <TextInput id="password2" type="text"  onChange={(e) => setPasswordConfirm(e.target.value)} />
            </div>
            </> 
        }
      
        <Button type="submit">Login</Button>
    </form>
</div> 
}

export default Edit;