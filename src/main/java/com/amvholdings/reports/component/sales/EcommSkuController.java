package com.amvholdings.reports.component.sales;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class EcommSkuController {

    private final EcommSkuDomain ecommSkuDomain;

    @GetMapping("/api/v1/sales/ecomm-sku")
    List<EcommSkuModel> getEcommSkus(String startDate, String stopDate) {
        return ecommSkuDomain.getEcommSkus(startDate, stopDate);
    }
}
