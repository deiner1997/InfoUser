import Form from "../../components/Form";
import { Link, useParams } from 'react-router-dom';
const UserRegister = () => {
const { id } = useParams();
  return (
    <div className="container">
      <button type="button" class="btn btn-link">
        <Link to="/">Return to List</Link>
      </button>
      <Form id={id}/>
    </div>
  );
};

export default UserRegister;
