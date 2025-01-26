 import { randomUUID } from "node:crypto"

 export class Databasememory{
  #sapatos = new Map();

  // Lista todos os sapatos com possibilidade de pesquisa
  list(search) {
    const sapatosListados = Array.from(this.#sapatos.entries())
      .map(([id, data]) => ({
        id,
        ...data,
      }))
      .filter((tenis) => {
        if (search) {
          return tenis.nome && tenis.nome.indexOf(search) !== -1; // Usa indexOf para filtrar
        }
        return true;
      });
  
    console.log('Sapatos listados:', sapatosListados); // Adiciona log para ver todos os sapatos listados
    return sapatosListados;
  }
  
  
  create(tenis) {
    const tenisId = randomUUID();
    this.#sapatos.set(tenisId, tenis);
    console.log('Sapato criado:', tenisId, tenis);
    
}


update(id, tenis) {
  if (!this.#sapatos.has(id)) {
    throw new Error('Sapato não encontrado');
  }
  // Atualiza os dados
  this.#sapatos.set(id, tenis);
  
  // Verifica se o sapato foi atualizado
  console.log(`Sapato atualizado: ${id}`, tenis);
}

  delete(id){
    this.#sapatos.delete(id);
  }
}