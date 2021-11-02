package com.nextsaa.gstspiraea.controller;

import com.nextsaa.gstspiraea.service.FileStorageService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RestController
@RequestMapping("/api/document")
@Slf4j
public class DocumentController {
    @Autowired
    private FileStorageService fileStorageService;

    @RequestMapping(path = "/{uploadFile}", method = RequestMethod.POST,
            consumes = {"multipart/form-data"})
    public String uploadFile(@RequestParam("file") MultipartFile file) throws Exception {
        String fileName = fileStorageService.storeFile(file);
        return fileName;
    }

    @GetMapping("/downloadFile/{fileName:.+}")
    public @ResponseBody
    byte[] downloadFile(@PathVariable String fileName, HttpServletRequest request, HttpServletResponse response) throws IOException {
        // Load file as Resource
        Resource resource = fileStorageService.loadFileAsResource(fileName);
        response.addHeader(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"");
        return IOUtils.toByteArray(resource.getURI());
    }
}
