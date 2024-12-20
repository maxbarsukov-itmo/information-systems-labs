package ru.ifmo.is.lab1.common.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

import ru.ifmo.is.lab1.auth.JwtAuthenticationFilter;
import ru.ifmo.is.lab1.common.utils.crypto.Sha512PasswordEncoder;
import ru.ifmo.is.lab1.users.UserService;

import java.util.Arrays;
import java.util.List;

import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {
  private final JwtAuthenticationFilter jwtAuthenticationFilter;
  private final UserService userService;

  private static final List<String> crudResources = Arrays.asList(
    "dragons",
    "coordinates",
    "dragon-caves",
    "people",
    "dragon-heads",
    "locations"
  );

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http.csrf(AbstractHttpConfigurer::disable)
      // Отключаем CORS
      .cors(cors -> cors.configurationSource(request -> {
        var corsConfiguration = new CorsConfiguration();
        corsConfiguration.setAllowedOrigins(List.of("http://localhost:3000", "http://localhost:5000"));
        corsConfiguration.setAllowedMethods(List.of(
          "GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD", "CONNECT", "OPTIONS")
        );
        corsConfiguration.setAllowedHeaders(List.of("*"));
        corsConfiguration.setAllowCredentials(true);
        corsConfiguration.setMaxAge(10L);
        corsConfiguration.addExposedHeader("X-Response-Uuid");
        corsConfiguration.addExposedHeader("X-Total-Count");
        return corsConfiguration;
      }))

      .authorizeHttpRequests(request -> {
        request
          // WebSockets
          .requestMatchers("/ws/**").permitAll()
          .requestMatchers("/ws").permitAll()

          // Доступ к методам /api/auth/** открыт для всех
          .requestMatchers("/api/auth/**").permitAll()

          // Доступ к Swagger UI (для документации)
          .requestMatchers("/swagger-ui/**", "/swagger-resources/*", "/v3/api-docs/**").permitAll();

        request
          // Доступ к данным запросов на администрирование
          .requestMatchers(HttpMethod.GET, "/api/admin-requests/pending").hasRole("ADMIN") // только админы могут просматривать все ожидающие запросы
          .requestMatchers(HttpMethod.GET, "/api/admin-requests/**").authenticated() // только авторизованные могут читать данные
          .requestMatchers(HttpMethod.POST, "/api/admin-requests/**").hasRole("USER") // подавать запросы могут только пользователи
          .requestMatchers(HttpMethod.PUT, "/api/admin-requests/**").hasRole("ADMIN"); // рассматривать запросы могут только админы

        request
          // Доступ к данным операций импорта
          .requestMatchers(HttpMethod.GET, "/api/import/**").authenticated() // только авторизованные пользователи могут читать данные
          .requestMatchers(HttpMethod.POST, "/api/import/**").authenticated(); // только авторизованные пользователи могут создавать операции импорта

        request
          // Доступ к специальным операциям над объектами
          .requestMatchers(HttpMethod.GET, "/api/special-operations/average-age").permitAll() // рассчитать среднее значение поля age для всех объектов
          .requestMatchers(HttpMethod.GET, "/api/special-operations/oldest-dragon").permitAll() // вернуть один (любой) объект, значение поля age которого является максимальным
          .requestMatchers(HttpMethod.GET, "/api/special-operations/filter-by-name").permitAll() // вернуть массив объектов, значение поля name которых начинается с заданной подстроки
          .requestMatchers(HttpMethod.GET, "/api/special-operations/deepest-cave-dragon").permitAll() // найти дракона, живущего в самой глубокой пещере
          .requestMatchers(HttpMethod.POST, "/api/special-operations/kill-dragon/**").permitAll(); // убить указанного дракона

        crudResources.forEach(resource ->
          request
            // Доступ к данным ресурса
            .requestMatchers(HttpMethod.GET, "/api/" + resource + "/**").permitAll() // все пользователи могут читать данные
            .requestMatchers(HttpMethod.POST, "/api/" + resource + "/search").permitAll() // все пользователи могут искать данные
            .requestMatchers(HttpMethod.POST, "/api/" + resource + "/**").authenticated() // только авторизованные могут создавать данные
            .requestMatchers(HttpMethod.PUT, "/api/" + resource + "/**").authenticated() // обновление доступно только авторам или администраторам
            .requestMatchers(HttpMethod.PATCH, "/api/" + resource + "/**").authenticated() // обновление доступно только авторам или администраторам
            .requestMatchers(HttpMethod.DELETE, "/api/" + resource + "/**").authenticated() // удаление доступно только авторам или администраторам
        );

        request
          // Любой другой запрос должен быть аутентифицирован
          .anyRequest().authenticated();
      })
      .sessionManagement(manager -> manager.sessionCreationPolicy(STATELESS))
      .authenticationProvider(authenticationProvider())
      .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
    return http.build();
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new Sha512PasswordEncoder();
  }

  @Bean
  public AuthenticationProvider authenticationProvider() {
    DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
    authProvider.setUserDetailsService(userService.userDetailsService());
    authProvider.setPasswordEncoder(passwordEncoder());
    return authProvider;
  }

  @Bean
  public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
    return config.getAuthenticationManager();
  }
}
