const btnAgregar = document.getElementById('btnAgregar');
const entradaTexto = document.getElementById('entradaTexto');
const lista = document.getElementById('lista');

btnAgregar.addEventListener('click', () => {
  const texto = entradaTexto.value.trim();

  if (texto !== "") {
    // Crear nuevo <li>
    const nuevoElemento = document.createElement('li');
    nuevoElemento.textContent = texto;

    // Crear botón de eliminar
    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = "Eliminar";
    btnEliminar.className = "eliminar";

    // Evento para eliminar el <li>
    btnEliminar.addEventListener('click', () => {
      lista.removeChild(nuevoElemento);
    });

    // Agregar botón al <li> y <li> a la lista
    nuevoElemento.appendChild(btnEliminar);
    lista.appendChild(nuevoElemento);

    // Limpiar input
    entradaTexto.value = "";
  }
});
