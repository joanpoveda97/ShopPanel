
export function obtenerPedidos() {
  const datos = localStorage.getItem('pedidos');

  if (datos) {
    return JSON.parse(datos);
  }

  return [];
}

export function guardarPedidos(pedidos) {
  localStorage.setItem('pedidos', JSON.stringify(pedidos));
}
