package ru.ifmo.is.lab1.dragoncaves.mappers;

import org.mapstruct.*;
import ru.ifmo.is.lab1.batchoperations.contract.BatchMapper;
import ru.ifmo.is.lab1.dragoncaves.dto.DragonCaveBatchDto;
import ru.ifmo.is.lab1.common.mapper.JsonNullableMapper;
import ru.ifmo.is.lab1.common.mapper.ReferenceMapper;
import ru.ifmo.is.lab1.dragoncaves.dto.DragonCaveCreateDto;
import ru.ifmo.is.lab1.dragoncaves.dto.DragonCaveUpdateDto;

@Mapper(
  uses = { JsonNullableMapper.class, ReferenceMapper.class },
  nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
  componentModel = MappingConstants.ComponentModel.SPRING,
  unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public abstract class DragonCaveBatchMapper implements BatchMapper<DragonCaveBatchDto, DragonCaveCreateDto, DragonCaveUpdateDto> {
  public abstract DragonCaveCreateDto toCreate(DragonCaveBatchDto dto);
  public abstract DragonCaveUpdateDto toUpdate(DragonCaveBatchDto model);
}
