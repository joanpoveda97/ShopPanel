
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { obtenerPedidos, guardarPedidos } from '../services/pedidosService';

function Pedidos() {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    setPedidos(obtenerPedidos());
  }, []);

  function cambiarEstado(id, nuevoEstado) {
    const lista = pedidos.map((pedido) => {
      if (pedido.id === id) {
        return { ...pedido, estado: nuevoEstado };
      }
      return pedido;
    });

    setPedidos(lista);
    guardarPedidos(lista);
  }

  return (
    <div className="container mt-4">
      <h2>Mis pedidos</h2>
      <p>Consulta y cambia el estado de tus pedidos.</p>

      {pedidos.length === 0 ? (
        <div className="alert alert-info">
          No tienes pedidos registrados.
        </div>
      ) : (
        <div className="row">
          {pedidos.map((pedido) => (
            <div className="col-md-4 mb-4" key={pedido.id}>
              <div className="card h-100">
                <img
                  src={pedido.imagen}
                  alt={pedido.nombre}
                  className="card-img-top"
                  style={{ height: '180px', objectFit: 'contain' }}
                />

                <div className="card-body">
                  <h5>{pedido.nombre}</h5>

                  <p>
                    Precio: {new Intl.NumberFormat('es-CO', {
                      style: 'currency',
                      currency: 'COP',
                      maximumFractionDigits: 0
                    }).format(pedido.precio)}
                  </p>

                  <p>
                    <strong>Estado:</strong> {pedido.estado}
                  </p>

                  <label
                    htmlFor={`estado-${pedido.id}`}
                    className="form-label"
                  >
                    Cambiar estado
                  </label>

                  <select
                    id={`estado-${pedido.id}`}
                    className="form-select"
                    value={pedido.estado}
                    onChange={(e) =>
                      cambiarEstado(pedido.id, e.target.value)
                    }
                  >
                    <option value="Pendiente">Pendiente</option>
                    <option value="Confirmado">Confirmado</option>
                    <option value="Enviado">Enviado</option>
                    <option value="Cancelado">Cancelado</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Link to="/productos" className="btn btn-primary">
        Volver a productos
      </Link>
    </div>
  );
}

export default Pedidos;
