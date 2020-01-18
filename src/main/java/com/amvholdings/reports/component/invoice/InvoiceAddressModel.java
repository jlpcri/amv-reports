package com.amvholdings.reports.component.invoice;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class InvoiceAddressModel {
    String firstName;
    String lastName;
    String line1;
    String line2;
    String city;
    String state;
    String zipCode;
}
