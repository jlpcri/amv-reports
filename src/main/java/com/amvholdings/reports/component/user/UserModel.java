package com.amvholdings.reports.component.user;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserModel {
    String id;
    String name;
    String firstName;
    String lastName;
    String authUri;
    List<String> roles;
}
