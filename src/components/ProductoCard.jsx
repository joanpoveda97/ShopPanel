
import { Link } from 'react-router-dom';

function ProductoCard({ producto }) {

  const precioColombiano = producto.price * 4000;

  const precioFormateado = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  }).format(precioColombiano);

  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100">

        <img
          src={producto.thumbnail}
          className="card-img-top"
          alt={producto.title}
          style={{ height: '200px', objectFit: 'contain' }}
        />

        <div className="card-body d-flex flex-column">

          <h5 className="card-title">
            {producto.title}
          </h5>

          <p className="card-text">
            {producto.description}
          </p>

          <p className="fw-bold mt-auto">
            Precio: {precioFormateado}
          </p>

          <Link
            to={`/productos/${producto.id}`}
            className="btn btn-primary"
          >
            Ver detalle
          </Link>

        </div>
      </div>
    </div>
  );
}

export default ProductoCard;
