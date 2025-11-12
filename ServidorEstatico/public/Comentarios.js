let comentarios = [];
let pagina = 1;
const porPagina = 25;

// Cargar todos los comentarios del servidor
async function getComments() {
  try {
    const resp = await fetch("/api/comments");
    comentarios = await resp.json();
    mostrarPagina(pagina);
  } catch (err) {
    console.error("Error al cargar comentarios:", err);
  }
}

// Mostrar los comentarios de una página
function mostrarPagina(numPagina) {
  const totalPaginas = Math.ceil(comentarios.length / porPagina);
  if (numPagina < 1) numPagina = 1;
  if (numPagina > totalPaginas) numPagina = totalPaginas;

  const inicio = (numPagina - 1) * porPagina;
  const fin = inicio + porPagina;
  const datosPagina = comentarios.slice(inicio, fin);

  const tbody = document.getElementById("tbl_comentarios");
  tbody.innerHTML = datosPagina.map(c => `
    <tr>
      <td>${c.postId}</td>
      <td>${c.id}</td>
      <td>${c.name}</td>
      <td>${c.email}</td>
      <td>
        <button class="w3-button w3-small w3-teal" onclick="verDetalles(${c.id})">Ver</button>
        <button class="w3-button w3-small w3-pink" onclick="editar(${c.id})">Editar</button>
        <button class="w3-button w3-small w3-red" onclick="eliminar(${c.id})">Eliminar</button>
      </td>
    </tr>
  `).join('');

  document.getElementById("paginaActual").innerText = 
    `Página ${numPagina} de ${totalPaginas}`;
  
  pagina = numPagina;
}

// Botones de navegación
function siguientePagina() {
  mostrarPagina(pagina + 1);
}

function anteriorPagina() {
  mostrarPagina(pagina - 1);
}

// Ver detalles del comentario
async function verDetalles(id) {
  try {
    const resp = await fetch(`/api/comments/${id}`);
    const comment = await resp.json();
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
      <p><strong>Post ID:</strong> ${comment.postId}</p>
      <p><strong>Nombre:</strong> ${comment.name}</p>
      <p><strong>Email:</strong> ${comment.email}</p>
      <p><strong>Comentario:</strong></p>
      <p>${comment.body}</p>
    `;
    document.getElementById('modal').style.display = 'block';
  } catch (err) {
    console.error("Error al obtener detalles:", err);
  }
}

// Cerrar modal
function closeModal() {
  document.getElementById('modal').style.display = 'none';
}

// Funciones demo (editar y eliminar)
function editar(id) {
  alert(`Editar comentario ${id}`);
}

function eliminar(id) {
  alert(`Eliminar comentario ${id}`);
}

// Inicializar
getComments();
