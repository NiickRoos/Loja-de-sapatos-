import { fastify } from 'fastify';
import { Databasememory } from './Databasememory.js'
const server = fastify();
const database = new Databasememory()

// Metodos de POST, GET, PUT, PATCH e DELETE
server.post('/sapatos', (request , reply) =>{
    const {tamanho, id, modelo, nome, cor, preco} = request.body

    database.create({
        tamanho: tamanho,
        id: id,
        modelo: modelo,
        nome: nome,
        cor: cor,
        preco: preco
    })
   
    return reply.status(201).send()
});

server.get('/sapatos', () =>{
 return 'seu pai é gay'
});

server.put('/sapatos', () =>{

});

server.patch('/sapatos', () =>{

});

server.delete('/sapatos', () =>{

});

server.listen({
  port: 3333,

});
    
