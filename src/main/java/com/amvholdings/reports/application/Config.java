package com.amvholdings.reports.application;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

@Getter
@Setter
@Component
@Configuration
@ConfigurationProperties(prefix = "amv-reports")
public class Config {
    String mysqlTrustStore;
    String mysqlKeyStore;
}
