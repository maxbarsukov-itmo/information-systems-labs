import api from 'services/api/api';
import { AxiosResponse } from 'axios';
import { SearchDto } from 'interfaces/dto/search/SearchDto';
import { DragonHeadDto } from 'interfaces/dto/dragonheads/DragonHeadDto';
import { DragonHeadCreateDto } from 'interfaces/dto/dragonheads/DragonHeadCreateDto';
import { DragonHeadUpdateDto } from 'interfaces/dto/dragonheads/DragonHeadUpdateDto';
import CrudService, { staticImplements } from 'interfaces/crud/CrudService';
import Paged from 'interfaces/models/Paged';
import { createCrudUri } from './utils/uri';

@staticImplements<CrudService<DragonHeadDto, DragonHeadCreateDto, DragonHeadUpdateDto>>()
export default class DragonHeadService {
  static async getAll(page: number, size: number, sort: string[]): Promise<AxiosResponse<Paged<DragonHeadDto>>> {
    return api.get<Paged<DragonHeadDto>>(`/dragon-heads${createCrudUri(page, size, sort)}`);
  }

  static async get(id: number): Promise<AxiosResponse<DragonHeadDto>> {
    return api.get<DragonHeadDto>(`/dragon-heads/${id}`);
  }

  static async search(search: SearchDto, page: number, size: number, sort: string[]): Promise<AxiosResponse<Paged<DragonHeadDto>>> {
    return api.post<Paged<DragonHeadDto>>(`/dragon-heads/search${createCrudUri(page, size, sort)}`, search);
  }

  static async create(dragonHead: DragonHeadCreateDto): Promise<AxiosResponse<DragonHeadDto>> {
    return api.post<DragonHeadDto>('/dragon-heads', dragonHead);
  }

  static async update(id: number, dragonHead: DragonHeadUpdateDto): Promise<AxiosResponse<DragonHeadDto>> {
    return api.patch<DragonHeadDto>(`/dragon-heads/${id}`, dragonHead);
  }

  static async delete(id: number): Promise<AxiosResponse> {
    return api.delete(`/dragon-heads/${id}`);
  }
}
