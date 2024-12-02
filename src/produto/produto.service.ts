import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produto } from './produto.entity';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
  ) {}

  // Criar um novo produto
  async criar(produto: Produto): Promise<Produto> {
    return this.produtoRepository.save(produto);
  }

  // Listar todos os produtos
  async listar(): Promise<Produto[]> {
    return this.produtoRepository.find();
  }

  // Encontrar um produto pelo ID
  async encontrarPorId(id: number): Promise<Produto> {
    return this.produtoRepository.findOne({
      where: { id },
    });
  }

  // Atualizar um produto
  async atualizar(id: number, produto: Produto): Promise<Produto> {
    await this.produtoRepository.update(id, produto);
    return this.produtoRepository.findOne({
      where: { id },
    });
  }

  // Deletar um produto
  async remover(id: number): Promise<void> {
    await this.produtoRepository.delete(id);
  }
}
