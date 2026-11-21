
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const { iniciarSesion } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setMensaje('');

    if (!email.trim() || !password) {
      setMensaje('Debes completar todos los campos');
      return;
    }

    setCargando(true);

    const { error } = await iniciarSesion(email, password);

    setCargando(false);

    if (error) {
      setMensaje('Correo o contraseña incorrectos');
      return;
    }

    navigate('/productos');
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow-sm">
            <div className="card-body p-4">

              <h2 className="text-center mb-3">
                ShopPanel
              </h2>

              <p className="text-center">
                Inicio de sesión
              </p>

              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Correo electrónico
                  </label>

                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Contraseña
                  </label>

                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                {mensaje && (
                  <div className="alert alert-danger" role="alert">
                    {mensaje}
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={cargando}
                >
                  {cargando ? 'Ingresando...' : 'Ingresar'}
                </button>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
