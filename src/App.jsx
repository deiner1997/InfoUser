import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Form from './components/Form';
import UserList from "./pages/User/UserList";
import UserDetail from "./pages/User/UserDetail";
import UserRegister from "./pages/User/UserRegister";


function App() {
  return (
    <>
     <Router>
      <Routes>
        {/* Lista de usuarios */}
        <Route path="/" element={<UserList/>} />

        {/* Mostrar usuario por ID */}
        <Route path="/users/:id" element={<UserDetail />} />

        {/* Registrar usuario */}
        <Route path="/users/register" element={<UserRegister />} />

        {/* Editar usuario */}
        <Route path="/users/register/:id" element={<UserRegister />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
