
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Productos from './pages/Productos.jsx';
import DetalleProducto from './pages/DetalleProducto.jsx';
import Pedidos from './pages/Pedidos.jsx';
import Navbar from './components/Navbar.jsx';
import { useAuth } from './context/AuthContext.jsx';

function RutaProtegida({ children }) {
  const { usuario, cargando } = useAuth();

  if (cargando) {
    return <p className="text-center mt-5">Cargando...</p>;
  }

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={<Navigate to="/productos" replace />}
        />

        <Route path="/login" element={<Login />} />

        <Route
          path="/productos"
          element={
            <RutaProtegida>
              <Productos />
            </RutaProtegida>
          }
        />

        <Route
          path="/productos/:id"
          element={
            <RutaProtegida>
              <DetalleProducto />
            </RutaProtegida>
          }
        />

        <Route
          path="/pedidos"
          element={
            <RutaProtegida>
              <Pedidos />
            </RutaProtegida>
          }
        />

        <Route
          path="*"
          element={
            <div className="container mt-5 text-center">
              <h2>Página no encontrada</h2>
              <p>La página que buscas no existe.</p>

              <Link to="/productos" className="btn btn-primary">
                Volver a productos
              </Link>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
