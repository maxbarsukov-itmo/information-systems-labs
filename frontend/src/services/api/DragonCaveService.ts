import api from 'services/api/api';
import { AxiosResponse } from 'axios';
import { SearchDto } from 'interfaces/dto/search/SearchDto';
import { DragonCaveDto } from 'interfaces/dto/dragoncaves/DragonCaveDto';
import { DragonCaveCreateDto } from 'interfaces/dto/dragoncaves/DragonCaveCreateDto';
import { DragonCaveUpdateDto } from 'interfaces/dto/dragoncaves/DragonCaveUpdateDto';
import CrudService, { staticImplements } from 'interfaces/crud/CrudService';
import Paged from 'interfaces/models/Paged';
import { createCrudUri } from './utils/uri';

@staticImplements<CrudService<DragonCaveDto, DragonCaveCreateDto, DragonCaveUpdateDto>>()
export default class DragonCaveService {
  static async getAll(page: number, size: number, sort: string[]): Promise<AxiosResponse<Paged<DragonCaveDto>>> {
    return api.get<Paged<DragonCaveDto>>(`/dragon-caves${createCrudUri(page, size, sort)}`);
  }

  static async get(id: number): Promise<AxiosResponse<DragonCaveDto>> {
    return api.get<DragonCaveDto>(`/dragon-caves/${id}`);
  }

  static async search(search: SearchDto, page: number, size: number, sort: string[]): Promise<AxiosResponse<Paged<DragonCaveDto>>> {
    return api.post<Paged<DragonCaveDto>>(`/dragon-caves/search${createCrudUri(page, size, sort)}`, search);
  }

  static async create(dragonCave: DragonCaveCreateDto): Promise<AxiosResponse<DragonCaveDto>> {
    return api.post<DragonCaveDto>('/dragon-caves', dragonCave);
  }

  static async update(id: number, dragonCave: DragonCaveUpdateDto): Promise<AxiosResponse<DragonCaveDto>> {
    return api.patch<DragonCaveDto>(`/dragon-caves/${id}`, dragonCave);
  }

  static async delete(id: number): Promise<AxiosResponse> {
    return api.delete(`/dragon-caves/${id}`);
  }
}
