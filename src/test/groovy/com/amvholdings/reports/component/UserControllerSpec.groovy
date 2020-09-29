package com.amvholdings.reports.component

import com.amvholdings.reports.component.user.UserController
import com.amvholdings.reports.component.user.UserModel
import org.springframework.security.core.Authentication
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.test.web.servlet.setup.MockMvcBuilders
import spock.lang.Specification

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import static com.amvholdings.reports.TestUtil.fromJson

class UserControllerSpec extends Specification {

    def userController = new UserController()
    def mvc = MockMvcBuilders.standaloneSetup(userController).build()
    def auth = Mock(Authentication)
    def roles = [ new SimpleGrantedAuthority('ROLE_Any Group')]

    def 'calls user-info endpoint'() {
        when:
        def response = mvc.perform(get('/user/user-info').principal(auth)).andReturn().response.contentAsString
        def userModel = fromJson(response, UserModel)

        then:
        2 * auth.getName() >> 'Bart Simpson'
        1 * auth.getAuthorities() >> roles
        userModel
    }
}
