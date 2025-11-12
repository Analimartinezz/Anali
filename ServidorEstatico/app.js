// Anali del Carmen Pérez Martínez
// Francisco Gúzman Mora
// Myha Tamara García García

import express from 'express';
import path from 'path';
const app = express();
app.use(express.static('public'));


app.get('/',(req,res)=>{
    res.sendFile(path.join('public','index.html'));
});

app.get('/users',(req,res)=>{
    res.sendFile(path.join('public','Usuarios.html'));
});

app.get('/comments',(req,res)=>{
    res.sendFile(path.join('public','Comentarios.html'));
});
app.get('/post',(req,res)=>{
    res.sendFile(path.join('public','Post.html'));
});

// Ruta que obtiene los datos desde JSONPlaceholder
app.get('/api/users', async (req, res) => {
  try {
    const resp = await fetch('https://jsonplaceholder.typicode.com/users')
    const data = await resp.json()
    res.json(data) // enviamos los datos al navegador
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al obtener los usuarios' })
  }
})
// Obtener un usuario específico
app.get('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const resp = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    const user = await resp.json();
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el usuario' });
  }
});

// Ruta que obtiene los datos desde JSONPlaceholder
app.get('/api/comments', async (req, res) => {
  try {
    const resp = await fetch('https://jsonplaceholder.typicode.com/comments')
    const data = await resp.json()
    res.json(data) // enviamos los datos al navegador
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al obtener los comentarios' })
  }
})
// Obtener un usuario específico
app.get('/api/comments/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const resp = await fetch(`https://jsonplaceholder.typicode.com/comments/${id}`);
    const user = await resp.json();
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el comentario' });
  }
});


// Ruta que obtiene los datos desde JSONPlaceholder
app.get('/api/post', async (req, res) => {
  try {
    const resp = await fetch('https://jsonplaceholder.typicode.com/posts')
    const data = await resp.json()
    res.json(data) // enviamos los datos al navegador
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al obtener los comentarios' })
  }
})
// Obtener un usuario específico
app.get('/api/post/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const resp = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    const user = await resp.json();
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el comentario' });
  }
});



const port =3000;
app.listen(port,()=>{
    console.log(`Servidor corriendo en http://127.0.0.1:${port}`)
});