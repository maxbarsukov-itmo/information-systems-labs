# Лабораторная работа 1

## Вариант `331514`

<img alt="anime" src="./.resources/anime.gif" height="249">

> Why are we still here? Just to suffer? Every night, I can feel my web-programming course... and my programming course ... even my Java labs. The easiness of laboratory works I've lost... the comrades...

[![Made with: Spring](https://img.shields.io/badge/Spring-white?style=for-the-badge&logo=spring&logoColor=6DB33F)](https://spring.io/)
[![Made with: Spring Boot](https://img.shields.io/badge/Spring%20Boot-white?style=for-the-badge&logo=springboot&logoColor=6DB33F)](https://spring.io/projects/spring-boot)
[![Made with: Spring Security](https://img.shields.io/badge/Spring%20Security-white?style=for-the-badge&logo=springsecurity&logoColor=6DB33F)](https://spring.io/projects/spring-security) \
[![Made with: Java](https://img.shields.io/badge/Java-176579?style=for-the-badge&logo=coffeescript&logoColor=E78A2A)](https://www.java.com)
[![Made with: Flyway](https://img.shields.io/badge/Flyway-CC0000?style=for-the-badge&logo=flyway&logoColor=white)](https://www.red-gate.com/products/flyway/)
[![Made with: PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/) \
[![Made with: Docker](https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Made with: React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=23272f)](https://react.dev/)

|.pdf|.docx|
|-|-|
| [report](./docs/report.pdf) | [report](./docs/report.docx) |

---

### Команда

- **Группа:** `P3315`
- **Студенты:**
  - [@maxbarsukov](https://github.com/maxbarsukov): Барсуков Максим Андреевич `367081`;
  - [@pmpknu](https://github.com/pmpknu): Горляков Даниил Петрович `367165`.


### Задание

**Реализовать информационную систему**, которая позволяет взаимодействовать с объектами класса `Dragon`, описание которого приведено ниже:

```java
public class Dragon {
    private long id; //Значение поля должно быть больше 0, Значение этого поля должно быть уникальным, Значение этого поля должно генерироваться автоматически
    private String name; //Поле не может быть null, Строка не может быть пустой
    private Coordinates coordinates; //Поле не может быть null
    private java.time.ZonedDateTime creationDate; //Поле не может быть null, Значение этого поля должно генерироваться автоматически
    private DragonCave cave; //Поле может быть null
    private Person killer; //Поле может быть null
    private int age; //Значение поля должно быть больше 0
    private int wingspan; //Значение поля должно быть больше 0
    private boolean speaking;
    private DragonType type; //Поле не может быть null
    private DragonHead head;
}

public class Coordinates {
    private Integer x; //Максимальное значение поля: 301, Поле не может быть null
    private Float y; //Поле не может быть null
}

public class DragonCave {
    private float depth;
}

public class Person {
    private String name; //Поле не может быть null, Строка не может быть пустой
    private Color eyeColor; //Поле не может быть null
    private Color hairColor; //Поле может быть null
    private Location location; //Поле не может быть null
    private java.time.LocalDate birthday; //Поле не может быть null
    private Double height; //Поле не может быть null, Значение поля должно быть больше 0
    private String passportID; //Поле может быть null
}

public class DragonHead {
    private long size;
    private Float toothCount; //Поле может быть null
}

public class Location {
    private double x;
    private long y;
    private Long z; //Поле не может быть null
}

public enum DragonType {
    WATER,
    UNDERGROUND,
    AIR,
    FIRE
}

public enum Color {
    GREEN,
    RED,
    BLACK,
    YELLOW,
    BROWN
}
```

Разработанная система должна удовлетворять следующим требованиям:

- Основное назначение информационной системы - **управление объектами**, созданными на основе заданного в варианте класса.
- Необходимо, чтобы с помощью системы можно было выполнить следующие операции с объектами: **создание нового** объекта, **получение информации** об объекте по ИД, **обновление объекта** (модификация его атрибутов), **удаление объекта**. Операции должны осуществляться **в отдельных окнах** (интерфейсах) приложения. При получении информации об объекте класса должна также выводиться информация **о связанных с ним объектах**.
- При создании объекта класса необходимо дать пользователю **возможность связать новый объект с объектами вспомогательных классов**, которые могут быть связаны с созданным объектом и уже есть в системе.
- Выполнение операций по управлению объектами должно осуществляться **на серверной части** (не на клиенте), изменения должны **синхронизироваться с базой данных**.
- На главном экране системы должен выводиться **список текущих объектов** в виде таблицы (каждый атрибут объекта - отдельная колонка в таблице). При отображении таблицы должна использоваться **пагинация** (если все объекты не помещаются на одном экране).
- Нужно обеспечить возможность **фильтровать/сортировать строки таблицы**, которые показывают объекты (по значениям любой из строковых колонок). Фильтрация элементов должна производиться по неполному совпадению.
- **Переход к обновлению** (модификации) объекта должен быть возможен **из таблицы с общим списком объектов** и из области с визуализацией объекта (при ее реализации).
- При добавлении/удалении/изменении объекта, он должен **автоматически появиться/исчезнуть/измениться в интерфейсах у других пользователей, авторизованных в системе**.
- Если **при удалении** объекта с ним **связан другой объект**, операция должна быть **отменена**, пользователю нужно **сообщить о невозможности удаления объекта**.
- Пользователю системы должен быть предоставлен интерфейс для **авторизации/регистрации нового пользователя**. У каждого пользователя должен быть один пароль. Требования к паролю: **пароль должен быть уникален** (прим. ред. _лолшто?_). В системе предполагается использование следующих видов пользователей (ролей): **незарегистрированные пользователи**, **обычные пользователи** и **администраторы**. Если в системе уже создан хотя бы один администратор, зарегистрировать нового администратора можно только при одобрении одним из существующих администраторов (у администратора должен быть реализован интерфейс **со списком заявок и возможностью их одобрения**).
- **Редактировать и удалять** объекты могут только **пользователи, которые их создали, и администраторы** (администраторы могут удалять все объекты).
- Зарегистрированные пользователи должны иметь возможность **просмотра всех объектов**, но модифицировать (обновлять) могут только принадлежащие им (объект принадлежит пользователю, если он его создал). Для модификации объекта должно открываться отдельное диалоговое окно. При вводе некорректных значений в поля объекта должны появляться информативные сообщения о соответствующих ошибках.

В системе должен быть реализован отдельный пользовательский интерфейс для выполнения специальных операций над объектами:

- Рассчитать среднее значение поля `age` для всех объектов.
- Вернуть один (любой) объект, значение поля `age` которого является максимальным.
- Вернуть массив объектов, значение поля `name` которых начинается с заданной подстроки.
- Найти дракона, живущего в самой глубокой пещере.
- Убить указанного дракона.

Представленные операции должны быть реализованы **в рамках компонентов бизнес-логики приложения** без прямого использования функций и процедур БД.

Особенности хранения объектов, которые должны быть реализованы в системе:

- Организовать хранение данных об объектах в реляционной СУБД (`PostgreSQL`). Каждый объект, с которым работает ИС, должен быть сохранен в базе данных.
- Все требования к полям класса (указанные в виде комментариев к описанию классов) должны быть выполнены на уровне ORM и БД.
- Для генерации поля `id` использовать средства базы данных.
- Пароли при хранении хэшировать алгоритмом `SHA-512`.
- **При хранении объектов сохранять информацию о пользователе, который создал этот объект, а также фиксировать даты и пользователей, которые обновляли и изменяли объекты. Для хранения информации о пользователях и об изменениях объектов нужно продумать и реализовать соответствующие таблицы.**
- Таблицы БД, не отображающие заданные классы объектов, должны содержать необходимые связи с другими таблицами и соответствовать **3НФ**.
- Для подключения к БД на кафедральном сервере использовать хост `pg`, имя базы данных - `studs`, имя пользователя/пароль совпадают с таковыми для подключения к серверу.


При создании системы нужно учитывать следующие особенности организации взаимодействия с пользователем:

- Система должна реагировать на некорректный пользовательский ввод, ограничивая ввод недопустимых значений и информируя пользователей о причине ошибки.
- Переходы между различными логически обособленными частями системы должны осуществляться с помощью меню.
- Во всех интерфейсах системы должно быть реализовано отображение **информации о текущем пользователе** (кто авторизован) и предоставляться возможность изменить текущего пользователя.
- [**Опциональное задание - +2 балл**] В отдельном окне ИС должна осуществляться **визуализация объектов коллекции**. При визуализации использовать данные о координатах и размерах объекта. Объекты от разных пользователей должны быть нарисованы разными цветами. При нажатии на объект должна выводиться информация об этом объекте.
- **При добавлении/удалении/изменении объекта, он должен автоматически появиться/исчезнуть/измениться на области у всех других клиентов.** 


При разработке ИС должны учитываться следующие требования:

- В качестве основы для реализации ИС необходимо использовать `Spring MVC`.
- Для создания уровня хранения необходимо использовать `Hibernate`.
- Разные уровни приложения должны быть отделены друг от друга, разные логические части ИС должны находиться в отдельных компонентах.

### Содержание отчёта:

1. Текст задания.
2. UML-диаграммы классов и пакетов разработанного приложения.
3. Исходный код системы или ссылка на репозиторий с исходным кодом.
4. Выводы по работе.

### Вопросы к защите лабораторной работы:

1. **Шаблоны проектирования** и **архитектурные шаблоны**.
2. Платформа `Jakarta EE`. Виды компонентов.
3. `Jakarta EE`. **Управляемые бины**. **CDI-бины**.
4. Концепция **ORM**. Библиотеки `ORM Hibernate` и `EclipseLink`. Особенности, API, сходства и отличия.
5. Технология `Jakarta Persistence`. Особенности, API, интеграция с ORM-провайдерами.
6. Технология `Jakarta Data`.
7. Платформа `Spring`. Сходства и отличия с `Java EE`.
8. `Spring Boot`.
9. `Spring Data`.


### Как запустить?

Экспорт переменных окружения:

    export $(cat .env | xargs)

База данных:

    docker compose up

Запуск **back-end**:

    ./gradlew bootRun

Запуск **front-end**:

    cd frontend
    npm run dev


## Лицензия <a name="license"></a>

Проект доступен с открытым исходным кодом на условиях [Лицензии MIT](https://opensource.org/licenses/MIT). \
*Авторские права 2024 Max Barsukov*

**Поставьте звезду :star:, если вы нашли этот проект полезным.**
