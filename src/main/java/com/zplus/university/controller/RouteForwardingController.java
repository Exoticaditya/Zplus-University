package com.zplus.university.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class RouteForwardingController {

    // Forward all non-API paths to index.html so React Router can handle them
    // Exclude /api, /static, /manifest.json, etc if needed, but simple regex works
    // for MVP
    @RequestMapping(value = "/{path:[^\\.]*}")
    public String redirect() {
        return "forward:/index.html";
    }
}
