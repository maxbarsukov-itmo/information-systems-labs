package ru.ifmo.is.lab1.batchoperations.dto.models;

import jakarta.validation.constraints.*;
import ru.ifmo.is.lab1.events.ResourceType;
import ru.ifmo.is.lab1.people.Color;

import java.time.LocalDate;

public class PersonBatchDto implements BatchDto {
  @NotBlank
  @Size(max = 255)
  private String name;

  @NotNull
  private Color eyeColor;

  private Color hairColor;

  private Integer locationId;
  private LocationBatchDto location;

  @NotNull
  @Past
  private LocalDate birthday;

  @NotNull
  @Min(0)
  private double height;

  private String passportId;

  @Override
  public ResourceType getResourceType() {
    return ResourceType.PEOPLE;
  }
}
