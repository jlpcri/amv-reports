package com.amvholdings.reports.component.user;

import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class UserController {

    @GetMapping(value = "/user/user-info", produces = MediaType.APPLICATION_JSON_VALUE)
    UserModel getUserInfo(Authentication auth)  {
        List<String> roles = auth.getAuthorities().stream()
                .map(Object::toString)
                .map(role -> role.replaceFirst("^ROLE_",""))
                .collect(Collectors.toList());

        // See AD attributes here: https://docs.microsoft.com/en-us/azure/active-directory-b2c/user-profile-attributes
        DefaultOidcUser user = (DefaultOidcUser) auth.getPrincipal();

        return UserModel.builder()
                .name(user.getName())
                .firstName(user.getGivenName())
                .lastName(user.getFamilyName())
                .roles(roles)
                .build();
    }

}
