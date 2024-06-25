import axios from "axios";
import { Button, Table, TableBody, TableHead, TableHeadCell } from "flowbite-react";
import { useEffect, useState } from "react";
import { URL } from "../../config/constans";
import TableItem from "./TableItem";
import { Link } from "react-router-dom";
const MainTable = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        const response = await axios.get(URL + "/user");
        if(response && response.data)
        {
            setUsers(response.data);
        }
    }
    
    return <>
    <div className="container mx-auto mt-6">
      <div className="overflow-x-auto">
        <Table>
          <TableHead>
            <TableHeadCell>Firstname</TableHeadCell>
            <TableHeadCell>Lastname</TableHeadCell>
            <TableHeadCell>Email</TableHeadCell>
            <TableHeadCell>Role</TableHeadCell>
            <TableHeadCell>
              Actions
            </TableHeadCell>
          </TableHead>
          <TableBody className="divide-y">
              {
                  users.length ? users.map((user: any) => (
                    <TableItem user={user} key={user.id} getData={getUsers} />
                  )): <p className="mt-6">No users</p>
              }
          </TableBody>
        </Table>
      </div>
      <Link to={'/create'} className="flex justify-end">
        <Button>Create</Button>
      </Link>
    </div>
    </>
}

export default MainTable