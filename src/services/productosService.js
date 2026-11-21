
export async function obtenerProductos() {
  const respuesta = await fetch('https://dummyjson.com/products');

  if (!respuesta.ok) {
    throw new Error('No se pudieron cargar los productos');
  }

  const datos = await respuesta.json();
  return datos.products;
}

export async function obtenerProductoPorId(id) {
  const respuesta = await fetch(`https://dummyjson.com/products/${id}`);

  if (!respuesta.ok) {
    throw new Error('Producto no encontrado');
  }

  const producto = await respuesta.json();
  return producto;
}
