
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { usuario, cerrarSesion } = useAuth();
  const navigate = useNavigate();

  async function salir() {
    const { error } = await cerrarSesion();

    if (!error) {
      navigate('/login');
    }
  }

  if (!usuario) {
    return null;
  }

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/productos">
          ShopPanel
        </Link>

        <div className="d-flex gap-3 align-items-center">
          <Link className="text-white text-decoration-none" to="/productos">
            Productos
          </Link>

          <Link className="text-white text-decoration-none" to="/pedidos">
            Mis pedidos
          </Link>

          <button
            className="btn btn-outline-light btn-sm"
            onClick={salir}
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
