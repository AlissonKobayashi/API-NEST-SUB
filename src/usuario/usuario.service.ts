import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async criar(usuario: Usuario): Promise<Usuario> {
    return this.usuarioRepository.save(usuario);
  }

  async encontrarTodos(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  // Se precisar encontrar por email:
  async encontrarPorEmail(email: string): Promise<Usuario | undefined> {
    return this.usuarioRepository.findOne({
      where: { email },
    });
  }

  // Se precisar encontrar por id
  async encontrarPorId(id: number): Promise<Usuario | undefined> {
    return this.usuarioRepository.findOne({
      where: { id },
    });
  }

  async atualizar(id: number, usuario: Usuario): Promise<Usuario> {
    await this.usuarioRepository.update(id, usuario);
    return this.usuarioRepository.findOne({ where: { id } });
  }

  async remover(id: number): Promise<void> {
    await this.usuarioRepository.delete(id);
  }
}
