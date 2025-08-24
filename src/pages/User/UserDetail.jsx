import { useParams,Link,useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import Spinner from "../../components/Spinner";
import Alert from "../../components/Alert";
import Modal from "../../components/Modal";

const UserDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState({}); // Estado para almacenar usuarios
  const [loading, setLoading] = useState(true); // Estado para indicar carga
  const [alert, setAlert] = useState({ message: '', type: '' });// Estado para alerts
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/users/${id}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setUser(data); // Guardamos el usuario en el estado
      } catch (err) {
         setAlert({ message: err.message, type: "error" });
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();

  },[id]);
  if (loading) return <Spinner/>;
  const handlerConfirmDelete = () => {
    setShowModal(true);
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
        navigate("/");
      }
  }
  return (
    <div className="container mt-5">
      <Alert message={alert.message} type={alert.type} />
      {showModal && <Modal handleDelete={handleDelete} setShowModal={setShowModal} showModal={showModal} />}
      <div className="card shadow-lg" style={{ width: '28rem', borderRadius: '15px' }}>
        <div className="card-header bg-primary text-white text-center" style={{ borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}>
          <h3 className="mb-0">{user.name}</h3>
          <small className="text-light">User Details</small>
        </div>
        <div className="card-body">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <strong>Email:</strong> {user.email}
            </li>
            <li className="list-group-item">
              <strong>Birthdate:</strong> {user.dob}
            </li>
            <li className="list-group-item">
              <strong>Username:</strong> {user.username}
            </li>
            <li className="list-group-item">
              <strong>User ID:</strong>
              <span className="text-muted d-block" style={{ fontSize: '0.9rem' }}>{user._id}</span>
            </li>
          </ul>
        </div>
        <div className="card-footer text-center bg-light">
          <button className="btn btn-outline-primary me-2">
            <Link to={`/users/register/${user._id}`}>Edit</Link>
          </button>
          <button className="btn btn-outline-danger" onClick={() => handlerConfirmDelete(user._id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;