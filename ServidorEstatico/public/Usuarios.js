// Cargar todos los usuarios y poblar la tabla
async function getData() {
  try {
    const resp = await fetch("/api/users");
    const users = await resp.json();
    const tbody = document.getElementById("tbl_users");
    tbody.innerHTML = users.map(u => `
      <tr>
        <td>${u.id}</td>
        <td>${u.name}</td>
        <td>${u.username}</td>
        <td>${u.email}</td>
        <td>
        <button class="w3-button w3-small w3-teal" onclick="verDetalles(${u.id})">Ver</button>
        <button class="w3-button w3-small w3-pink" onclick="editar(${u.id})">Editar</button>
        <button class="w3-button w3-small w3-red" onclick="eliminar(${u.id})">Eliminar</button>
        </td>
      </tr>
    `).join('');
  } catch (err) {
    console.error("Error al cargar usuarios:", err);
  }
}

// Ver detalles pidiendo al servidor
async function verDetalles(id) {
  try {
    console.log("Solicitando detalles de", id); // ayuda a depurar
    const resp = await fetch(`/api/users/${id}`);
    const user = await resp.json();
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
      <p><strong>Dirección:</strong> ${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}</p>
      <p><strong>Coordenadas:</strong> ${user.address.geo.lat}, ${user.address.geo.lng}</p>
      <p><strong>Teléfono:</strong> ${user.phone}</p>
      <p><strong>Web:</strong> ${user.website}</p>
      <p><strong>Compañía:</strong> ${user.company.name}, ${user.company.catchPhrase}, ${user.company.bs}</p>
    `;
    document.getElementById('modal').style.display = 'block';
  } catch (err) {
    console.error("Error al obtener detalles:", err);
  }
}

function closeModal() {
  document.getElementById('modal').style.display = 'none';
}
// Funciones demo (editar y eliminar)

// Buscar usuario por ID
async function buscar() {
  const id = document.getElementById("buscarUsuario").value.trim();
  const tbody = document.getElementById("tbl_users");

  // Si no se escribió nada, muestra todos los usuarios
  if (!id) {
    getData();
    return;
  }

  try {
    const resp = await fetch(`/api/users/${id}`);
    const user = await resp.json();

    // Si no existe el usuario
    if (!user.id) {
      tbody.innerHTML = `<tr><td colspan="5" class="w3-center">Usuario no encontrado</td></tr>`;
      return;
    }

    // Mostrar solo el usuario encontrado
    tbody.innerHTML = `
      <tr>
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.username}</td>
        <td>${user.email}</td>
        <td>
          <button class="w3-button w3-small w3-teal" onclick="verDetalles(${user.id})">Ver</button>
          <button class="w3-button w3-small w3-pink" onclick="editar(${user.id})">Editar</button>
          <button class="w3-button w3-small w3-red" onclick="eliminar(${user.id})">Eliminar</button>
        </td>
      </tr>
    `;
  } catch (err) {
    console.error("Error al buscar usuario:", err);
    tbody.innerHTML = `<tr><td colspan="5" class="w3-center">Error al buscar usuario</td></tr>`;
  }
}



getData();
