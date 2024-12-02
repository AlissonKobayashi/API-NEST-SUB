import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../usuario/usuario.service';
import * as bcrypt from 'bcryptjs';
import { Usuario } from '../usuario/usuario.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: any) {
    const { username, password } = loginDto;

    const user = await this.usuarioService.encontrarPorEmail(username); 

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.senha);

    if (!isPasswordValid) {
      return null;
    }

    const payload = { username: user.nome, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(registerDto: any) {
    const { username, password, role } = registerDto;

    const user = await this.usuarioService.encontrarPorEmail(username); 
    if (user) {
      return { message: 'User already exists' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Usuario();
    newUser.nome = username;
    newUser.senha = hashedPassword;
    newUser.role = role || 'user';

    return this.usuarioService.criar(newUser);
  }
}
