
import { useEffect, useState } from 'react';
import { obtenerProductos } from '../services/productosService';
import ProductoCard from '../components/ProductoCard';

function Productos() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function cargarProductos() {
      try {
        const datos = await obtenerProductos();
        setProductos(datos);
      } catch (error) {
        setError('No se pudieron cargar los productos');
      } finally {
        setCargando(false);
      }
    }

    cargarProductos();
  }, []);

  if (cargando) {
    return <p className="text-center mt-5">Cargando productos...</p>;
  }

  if (error) {
    return <div className="alert alert-danger m-4">{error}</div>;
  }

  return (
    <div className="container mt-4">
      <h2>Productos disponibles</h2>
      <p>Consulta los productos de ShopPanel</p>

      <div className="row">
        {productos.map((producto) => (
          <ProductoCard
            key={producto.id}
            producto={producto}
          />
        ))}
      </div>
    </div>
  );
}

export default Productos;
