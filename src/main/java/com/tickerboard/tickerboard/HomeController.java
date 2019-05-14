package com.tickerboard.tickerboard;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

// @Controller annotation marks class as Spring MVC controller

/**
 * Our controller class for Spring MVC API
 * Annotation @Controller marks this class as a Spring MVC Controller
 */
@Controller
public class HomeController {

    /**
     * Our route for "/". Loads index.html when a GET request is sent to baseURL + "/"
     * Annotation @RequestMapping flags the index() method to support "/" route for Spring
     * @return index - our template mapped to src/main/resources/templates/index.html by Spring Boot
     */
    @RequestMapping(value = "/")
    public String index() {
        return "index";
    }

}
