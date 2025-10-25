import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}
  create(createRoleDto: CreateRoleDto) {
    const role = new Role();
    Object.assign(role, createRoleDto);

    return this.roleRepository.save(role);
  }

  async getRole(name: string) {
    const role = await this.roleRepository.findOne({
      where: { name, isActive: true },
      relations: { users: true },
    });

    if (!role) throw new BadRequestException(`Role ${name} not found`);

    return role;
  }

  async findAll() {
    return await this.roleRepository.find({ where: { isActive: true } });
  }

  async update(name: string, updateRoleDto: UpdateRoleDto) {
    const role = await this.getRole(name);

    role.description = updateRoleDto.description;

    return this.roleRepository.save(role);
  }

  async remove(name: string) {
    const role = await this.getRole(name);

    if (role?.users.length > 0)
      throw new BadRequestException(`Role ${name} not removed`);

    role.isActive = false;

    return this.roleRepository.save(role);
  }
}
