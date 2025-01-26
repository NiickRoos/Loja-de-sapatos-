 import { randomUUID } from "node:crypto"
 
 export class Databasememory{
  #sapatos = new Map()

     // Lista todos os sapatos com possibilidade de pesquisa
  list(search) {
    return Array.from(this.#sapatos.entries())
      .map(([id, data]) => ({
        id,
        ...data,
      }))
      .filter((tenis) => {
        if (search) {
          return tenis.nome && tenis.nome.toLowerCase().includes(search.toLowerCase());
        }
        return true; // Retorna todos os tênis caso não haja filtro
      });
  }
  
  create(tenis){
    const tenisId = randomUUID()
    this.#sapatos.set(tenisId, tenis)
  }

  update(id, tenis){
    this.#sapatos.set(id, tenis)
  }
  delete(id){
    this.#sapatos.delete(id)
  }
}