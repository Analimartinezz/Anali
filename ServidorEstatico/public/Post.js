let posts = [];
let pagina = 1;
const porPagina = 10; // menos por post para que se vea mejor

// Cargar todos los posts del servidor
async function getPosts() {
  try {
    const resp = await fetch("/api/post");
    posts = await resp.json();
    mostrarPagina(pagina);
  } catch (err) {
    console.error("Error al cargar posts:", err);
  }
}

// Mostrar los posts de una página
function mostrarPagina(numPagina) {
  const totalPaginas = Math.ceil(posts.length / porPagina);
  if (numPagina < 1) numPagina = 1;
  if (numPagina > totalPaginas) numPagina = totalPaginas;

  const inicio = (numPagina - 1) * porPagina;
  const fin = inicio + porPagina;
  const datosPagina = posts.slice(inicio, fin);

  const tbody = document.getElementById("tbl_posts");
  tbody.innerHTML = datosPagina.map(p => `
    <tr>
      <td>${p.userId}</td>
      <td>${p.id}</td>
      <td>${p.title}</td>
      <td>
        <button class="w3-button w3-small w3-teal" onclick="verDetalles(${p.id})">Ver</button>
        <button class="w3-button w3-small w3-pink" onclick="editar(${p.id})">Editar</button>
        <button class="w3-button w3-small w3-red" onclick="eliminar(${p.id})">Eliminar</button>
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

// Ver detalles del post
async function verDetalles(id) {
  try {
    const resp = await fetch(`/api/post/${id}`);
    const post = await resp.json();
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
      <p><strong>ID:</strong> ${post.id}</p>
      <p><strong>User ID:</strong> ${post.userId}</p>
      <p><strong>Título:</strong> ${post.title}</p>
      <p><strong>Contenido:</strong></p>
      <p>${post.body}</p>
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
  alert(`Editar post ${id}`);
}

function eliminar(id) {
  alert(`Eliminar post ${id}`);
}

// Inicializar
getPosts();
