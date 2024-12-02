import { Controller, Post, Body } from '@nestjs/common';
import { UsuarioService } from '../usuario/usuario.service';
import * as bcrypt from 'bcryptjs';
import { Usuario } from '../usuario/usuario.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private usuarioService: UsuarioService,
  ) {}

  @Post('register')
  async register(@Body() body: any) {
    const { username, email, senha } = body;
    const hashedPassword = await bcrypt.hash(senha, 10);
    const usuario = new Usuario();
    usuario.nome = username;
    usuario.email = email;
    usuario.senha = hashedPassword;
    usuario.role = 'user';
    return this.usuarioService.criar(usuario);
  }
}
