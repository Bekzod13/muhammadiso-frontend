import axios from "axios";
import { Button, TableCell, TableRow } from "flowbite-react";
import { BiSolidTrash } from "react-icons/bi";
import { MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import { URL } from "../../config/constans";

const TableItem = (props: {user: any, getData: any}) => {
    const {user, getData}= props

  const deleteUser = async () => {
    await axios.delete(URL + "/user/" + user.id)
    await getData();
  }  

  return <TableRow key={user.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
    <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
      {user.firstname}
    </TableCell>
    <TableCell> {user.lastname}</TableCell>
    <TableCell>{user.email}</TableCell>
    <TableCell>
      {
        (user.role && user.role.name === 'admin') &&  <span className="bg-black text-orange-400 font-bold rounded inline-flex px-4 py-1">
          {user.role.name}
        </span>
      }
      {
        (user.role && user.role.name === 'manager') &&  <span className="bg-gray-400 text-white font-bold rounded inline-flex px-4 py-1">
          {user.role.name}
        </span>
      }
      {
        (user.role && user.role.name === 'worker') &&  <span className="bg-yellow-900 text-white font-bold rounded inline-flex px-4 py-1">
          {user.role.name}
        </span>
      }
     
    </TableCell>
    <TableCell>
      <div className="flex gap-3">
      <Link to={'/edit/' + user.id}>
        <Button className="bg-green-700">
          <MdEdit />
        </Button>
      </Link>
      <Button onClick={deleteUser} className="bg-red-700">
        <BiSolidTrash />
      </Button>
      </div>
    </TableCell>
  </TableRow>
}

export default TableItem;