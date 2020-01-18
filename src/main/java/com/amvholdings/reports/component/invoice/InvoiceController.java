package com.amvholdings.reports.component.invoice;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class InvoiceController {
    private final InvoiceDomain invoiceDomain;
    @GetMapping("/invoices")
    public List<InvoiceModel> getInvoices(
            @RequestParam String startDate,
            @RequestParam String stopDate,
            @RequestParam String channel) {
        return invoiceDomain.getInvoices(startDate, stopDate, channel);
    }
}
