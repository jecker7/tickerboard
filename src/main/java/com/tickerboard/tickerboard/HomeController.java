package com.tickerboard.tickerboard;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

// @Controller annotation marks class as Spring MVC controller
@Controller
public class HomeController {

    // @RequestMapping flags the index() method to support '/' route
    @RequestMapping(value = "/")
    public String index() {

        // we return "index" as name of template, which is mapped to
        // "src/main/resources/templates/index.html" by Spring Boot
        return "index";
    }

}
