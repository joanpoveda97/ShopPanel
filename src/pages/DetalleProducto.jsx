
import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { obtenerProductoPorId } from '../services/productosService.js';
import { obtenerPedidos, guardarPedidos } from '../services/pedidosService.js';

function DetalleProducto() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function cargarProducto() {
      setCargando(true);
      setError('');

      try {
        const datos = await obtenerProductoPorId(id);
        setProducto(datos);
      } catch (error) {
        setError('No se pudo cargar el producto');
      } finally {
        setCargando(false);
      }
    }

    cargarProducto();
  }, [id]);

  function agregarPedido() {
    if (!producto) {
      return;
    }

    const pedidos = obtenerPedidos();

    const nuevoPedido = {
      id: Date.now(),
      productoId: producto.id,
      nombre: producto.title,
      imagen: producto.thumbnail,
      precio: producto.price * 4000,
      estado: 'Pendiente'
    };

    const listaActualizada = [...pedidos, nuevoPedido];

    guardarPedidos(listaActualizada);

    navigate('/pedidos');
  }

  if (cargando) {
    return (
      <p className="text-center mt-5">
        Cargando producto...
      </p>
    );
  }

  if (error || !producto) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">
          {error || 'Producto no encontrado'}
        </div>

        <Link to="/productos" className="btn btn-primary">
          Volver a productos
        </Link>
      </div>
    );
  }

  const precioColombiano = producto.price * 4000;

  const precioFormateado = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  }).format(precioColombiano);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-5">
          <img
            src={producto.thumbnail}
            alt={producto.title}
            className="img-fluid"
          />
        </div>

        <div className="col-md-7">
          <h2>{producto.title}</h2>

          <p>{producto.description}</p>

          <h4 className="text-success">
            {precioFormateado}
          </h4>

          <p>
            <strong>Categoría:</strong> {producto.category}
          </p>

          <p>
            <strong>Disponibles:</strong> {producto.stock}
          </p>

          <div className="d-flex gap-2 mt-3">
            <button
              type="button"
              className="btn btn-success"
              onClick={agregarPedido}
            >
              Agregar pedido
            </button>

            <Link
              to="/productos"
              className="btn btn-secondary"
            >
              Volver a productos
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetalleProducto;
