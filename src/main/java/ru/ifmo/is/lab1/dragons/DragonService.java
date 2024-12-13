package ru.ifmo.is.lab1.dragons;

import org.springframework.stereotype.Service;
import ru.ifmo.is.lab1.common.errors.ResourceAlreadyExists;
import ru.ifmo.is.lab1.common.framework.CrudService;
import ru.ifmo.is.lab1.common.search.SearchMapper;
import ru.ifmo.is.lab1.dragons.dto.*;
import ru.ifmo.is.lab1.events.EventService;
import ru.ifmo.is.lab1.users.UserService;

@Service
public class DragonService
  extends CrudService<
    Dragon,
    DragonRepository,
    DragonMapper,
    DragonPolicy,
    DragonDto,
    DragonCreateDto,
    DragonUpdateDto
  > {

  public DragonService(
    DragonRepository repository,
    DragonMapper mapper,
    DragonPolicy policy,
    SearchMapper<Dragon> searchMapper,
    UserService userService,
    EventService<Dragon> eventService
  ) {
    super(repository, mapper, policy, searchMapper, userService, eventService);
  }

  @Override
  protected void validateCreate(Dragon obj, DragonCreateDto dto) {
    if (this.repository.countByName(dto.getName()) != 0L) {
      throw new ResourceAlreadyExists(errorMessage(dto.getName()));
    }
  }

  @Override
  protected void validateUpdate(Dragon obj, DragonUpdateDto dto) {
    if (dto.getName().isPresent()) {
      if (this.repository.countByName(dto.getName().get()) != 0L) {
        throw new ResourceAlreadyExists(errorMessage(dto.getName().get()));
      }
    }
  }

  private String errorMessage(String name) {
    return "Dragon with name '" + name + "' already exists";
  }
}
