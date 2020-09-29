package com.amvholdings.reports.application

import spock.lang.Specification

class BasicAuthFilterSpec extends Specification {

    def config = new Config(reportsApiUsername: 'homer', reportsApiPassword: 'huh')
    def basicAuthFilter = new BasicAuthFilter(config)

    def 'filter type is "pre"'() {
        when:
        def result = basicAuthFilter.filterType()

        then:
        result == 'pre'
    }

    def 'filter order is 10'() {
        when:
        def result = basicAuthFilter.filterOrder()

        then:
        result == 10
    }

    def 'should filter is true'() {
        when:
        def result = basicAuthFilter.shouldFilter()

        then:
        result

    }
}
