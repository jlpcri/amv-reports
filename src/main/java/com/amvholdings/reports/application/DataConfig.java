package com.amvholdings.reports.application;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;

@Configuration
@Component
@RequiredArgsConstructor
public class DataConfig {

    private final Config config;

    @Bean
    @Primary
    @ConfigurationProperties("spring.datasource")
    DataSourceProperties dataSourceProperties() {
        return new DataSourceProperties();
    }

    @Bean
    @Primary
    @ConfigurationProperties("spring.datasource.configuration")
    DataSource dataSource() {

        // System.setProperty("javax.net.ssl.trustStore", config.mysqlTrustStore);
        // System.setProperty("javax.net.ssl.keyStore", config.mysqlKeyStore);

        DataSourceProperties dataSourceProperties = dataSourceProperties();
        return dataSourceProperties.initializeDataSourceBuilder()
                .build();
    }
}
