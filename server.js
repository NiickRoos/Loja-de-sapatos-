import { fastify } from 'fastify';
import { Databasememory } from './Databasememory.js'

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


server.get('/sapatos', (request) =>{

  const search = request.query.search;
  console.log('Parâmetro de pesquisa:', search); // Verifica o valor de "search"
  const sapatos = database.list(search);
  console.log('Sapatos encontrados:', sapatos); // Verifica se os sapatos estão sendo encontrados
  return sapatos;
  
});


server.put('/sapatos/:id', (request, reply) => {
  const tenisId = request.params.id; // Pegando o ID do sapato
  const { tamanho, modelo, nome, cor, preco } = request.body; // Pegando os dados do corpo da requisição

  // Atualizando o sapato
  try {
    database.update(tenisId, {
      tamanho,
      modelo,
      nome,
      cor,
      preco
    });

    // Retornando um status 200 para confirmar que a atualização foi feita
    return reply.status(200).send({ message: "Sapato atualizado com sucesso" });
  } catch (error) {
    // Caso o sapato não seja encontrado, retorna um erro 404
    return reply.status(404).send({ error: "Sapato não encontrado" });
  }
});


//Atualizar os recursos

server.patch('/sapatos/:id', (request, reply) => {
  const tenisId = request.params.id;
  const Dadosatualizados = request.body;
  const sapatos = database.list();
  const sapato = sapatos.find((tenis) => tenis.id === tenisId);

  if (!sapato) { // Verifica se o tênis existe.
    return reply.status(404).send({ error: 'Tênis não encontrado' });
  }

  // Atualiza apenas os atributos enviados. Os atributos ausentes permanecem iguais ao original.
  const sapatoAtualizado = { ...sapato, ...Dadosatualizados };

  // Substitui o objeto original pelo objeto atualizado no banco de dados em memória.
  database.update(tenisId, sapatoAtualizado);

  // Retorna o sapato atualizado com status 200 OK
  return reply.status(200).send(sapatoAtualizado);
});


server.delete('/sapatos/:id', (request, reply) => {
  const tenisId = request.params.id;

  // Tente encontrar o sapato antes de deletá-lo
  const sapato = database.list().find((tenis) => tenis.id === tenisId);

  if (!sapato) {
    return reply.status(404).send({ error: 'Tênis não encontrado' });
  }

  // Deletar o sapato
  database.delete(tenisId);

  // Retornar mensagem de sucesso
  return reply.status(200).send({ message: 'Sapato deletado com sucesso' });
});


server.listen({ port: 3333 }, (err, address) => {

    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Servidor rodando em ${address}`);

  });
