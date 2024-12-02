// src/usuario/usuario.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario.entity';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  async criar(@Body() usuario: Usuario): Promise<Usuario> {
    return this.usuarioService.criar(usuario);
  }

  @Get()
  async encontrarTodos(): Promise<Usuario[]> {
    return this.usuarioService.encontrarTodos();
  }

  @Get(':id')
  async encontrarPorId(@Param('id') id: number): Promise<Usuario> {
    return this.usuarioService.encontrarPorId(id);
  }

  @Put(':id')
  async atualizar(
    @Param('id') id: number,
    @Body() usuario: Usuario,
  ): Promise<Usuario> {
    return this.usuarioService.atualizar(id, usuario);
  }

  @Delete(':id')
  async remover(@Param('id') id: number): Promise<void> {
    return this.usuarioService.remover(id);
  }
}
