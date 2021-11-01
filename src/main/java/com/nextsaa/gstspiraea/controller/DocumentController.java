package com.nextsaa.gstspiraea.controller;

import com.nextsaa.gstspiraea.entity.CompanyDetails;
import com.nextsaa.gstspiraea.entity.LLP;
import com.nextsaa.gstspiraea.entity.Partnership;
import com.nextsaa.gstspiraea.entity.Proprietorship;
import com.nextsaa.gstspiraea.service.FileStorageService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.file.FileSystemException;
import java.util.Optional;

@RestController
@RequestMapping("/api/document")
@Slf4j
public class DocumentController {
    @Autowired
    private FileStorageService fileStorageService;

    @RequestMapping(path = "/{uploadFile}", method = RequestMethod.POST,
            consumes = {"multipart/form-data"})
    public String uploadFile(@RequestParam("file") MultipartFile file) throws Exception {
        if (file.getSize() > 100000) {
            throw new Exception("File Larger than 100Kb, Please upload a smaller file");
        }
        String fileName = fileStorageService.storeFile(file);
        return fileName;
    }

    @GetMapping("/downloadFile/{fileName:.+}")
    public @ResponseBody
    byte[] downloadFile(@PathVariable String fileName, HttpServletRequest request, HttpServletResponse response) throws IOException {
        // Load file as Resource
        Resource resource = fileStorageService.loadFileAsResource(fileName);

        // Try to determine file's content type
        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException ex) {
            log.info("Could not determine file type.");
        }
        response.addHeader(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"");

        return IOUtils.toByteArray(resource.getURI());
    }
}
