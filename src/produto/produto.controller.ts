import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { Produto } from './produto.entity';

@Controller('produtos')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Post()
  async criar(@Body() produto: Produto): Promise<Produto> {
    return this.produtoService.criar(produto);
  }

  @Get()
  async listar(): Promise<Produto[]> {
    return this.produtoService.listar();
  }

  @Get(':id')
  async encontrarPorId(@Param('id') id: number): Promise<Produto> {
    return this.produtoService.encontrarPorId(id);
  }

  @Put(':id')
  async atualizar(
    @Param('id') id: number,
    @Body() produto: Produto,
  ): Promise<Produto> {
    return this.produtoService.atualizar(id, produto);
  }

  @Delete(':id')
  async remover(@Param('id') id: number): Promise<void> {
    return this.produtoService.remover(id);
  }
}
