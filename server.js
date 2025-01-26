import { fastify } from 'fastify';
import { Databasememory } from './Databasememory.js'
import { request } from 'node:http';
const server = fastify();
const database = new Databasememory()

// Metodos de POST, GET, PUT, PATCH e DELETE
server.post('/sapatos', (request , reply) =>{
    const {tamanho,  modelo, nome, cor, preco} = request.body

    database.create({
        tamanho: tamanho,
        modelo: modelo,
        nome: nome,
        cor: cor,
        preco: preco
    })
    console.log(database.list())
    return reply.status(201).send()
});

server.get('/sapatos', () =>{
   const sapatos = database.list()
   console.log(sapatos)
   return sapatos
});

server.put('/sapatos/:id', (request, reply) =>{
  const tenisId = request.params.id
  const {tamanho,  modelo, nome, cor, preco} = request.body
  database.update(tenisId, {
   tamanho,
   modelo,
   nome,
   cor,
   preco
  })
  return reply.status(204).send
});

server.patch('/sapatos', () =>{

});

server.delete('/sapatos/:id', (request, reply) =>{
 const tenisId = request.params.id
 database.delete(tenisId)
 return reply.status(204).send()
});

server.listen({ port: 3333 }, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Servidor rodando em ${address}`);
  });
