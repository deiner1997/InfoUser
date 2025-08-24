import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { FaPen } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import "../../css/styles.css"
import Modal from "../../components/Modal";
import Alert from "../../components/Alert";

const UserList = () => {
  const [users, setUsers] = useState([]); // Estado para almacenar usuarios
  const [loading, setLoading] = useState(true); // Estado para indicar carga
  const [error, setError] = useState(null); // Estado para errores
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/users");
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setUsers(data); // Guardamos los usuarios en el estado
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();

  },[users]);
  const [showModal, setShowModal] = useState(false);
  const [alert, setAlert] = useState({ message: '', type: '' });
  const [id, setId] = useState("");


  if (loading) return <Spinner/>;
  if (error) return <p>Error: {error}</p>;
  const handlerConfirmDelete = (idDelete) => {
    setShowModal(true);
    setId(idDelete)
  }
  const handleDelete =  async () => {
    setLoading(true);
    try {
        const response = await fetch(`http://localhost:3000/api/users/${id}`,{method: "DELETE"});
        if (!response.ok) {
         throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        setShowModal(false);
      } catch (err) {
       setAlert({ message: err.message, type: "error" });
      } finally {
        setLoading(false);
        setAlert({ message: "User removed", type: 'success' });
      }
  }
  return (
    <div className="container">
      <Alert message={alert.message} type={alert.type} />
      {showModal && <Modal handleDelete={handleDelete} setShowModal={setShowModal} showModal={showModal} />}
       {users.length > 0 && (
        <div className="mt-5">
          <h4>Registered users</h4>
          <table className="table table-striped table-bordered mt-3">
            <thead className="table-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">BithDate</th>
                <th scope="col">Username</th>
                <th scope="col">Update</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {users.map((u, index) => (
                
                <tr key={index}>
                  <td scope="row">
                    <Link to={`/users/${u._id}`}>{index + 1}</Link>
                  </td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.dob}</td>
                  <td>{u.username}</td>
                  <td className="text-center"><Link to={`/users/register/${u._id}`}><FaPen className="icon-edit"/></Link></td>
                  <td className="text-center"><FaRegTrashAlt onClick={() => handlerConfirmDelete(u._id)} className="icon-delete"/></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Link  to="/users/register" className="btn btn-primary mt-3">
        Registrar Usuario
      </Link>
    </div>
  );
};

export default UserList;