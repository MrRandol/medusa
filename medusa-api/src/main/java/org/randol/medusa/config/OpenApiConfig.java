package org.randol.medusa.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {
    
    @Bean
    public OpenAPI medusaOpenAPI() {
        return new OpenAPI()
            .info(new Info()
                .title("Medusa API")
                .description("API for managing media files in Medusa")
                .version("v1"));
    }
} 