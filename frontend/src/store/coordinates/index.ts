import CoordinatesService from 'services/api/CoordinatesService';
import { CoordinateDto } from 'interfaces/dto/coordinates/CoordinateDto';
import { CoordinateCreateDto } from 'interfaces/dto/coordinates/CoordinateCreateDto';
import { CoordinateUpdateDto } from 'interfaces/dto/coordinates/CoordinateUpdateDto';
import createCrudSlice from 'interfaces/crud/CrudSlice';

const coordinateSlice = createCrudSlice<CoordinateDto, CoordinateCreateDto, CoordinateUpdateDto>(
  'coordinate',
  CoordinatesService
);

export const {
  fetchItems: fetchCoordinates,
  getItem: getCoordinate,
  searchItems: searchCoordinates,
  createItem: createCoordinate,
  updateItem: updateCoordinate,
  deleteItem: deleteCoordinate,
} = coordinateSlice.actions;

export default coordinateSlice.slice.reducer;
