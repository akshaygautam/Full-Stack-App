package com.akshaygautam.azureapps.azureapps.controller;

import com.azure.storage.blob.*;
import com.azure.storage.blob.models.BlobItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import reactor.core.publisher.Mono;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/blob")
public class BlobController {
    @Autowired
    private BlobContainerClient containerClient;
    @Autowired
    private BlobServiceClient serviceClient;

    @GetMapping("/list-files")
    public ResponseEntity listFiles() {
        List<BlobItem> list =  containerClient.listBlobs().stream().toList();
        List<String> fileNames = new ArrayList<>();
        for (BlobItem blob : list) {
             fileNames.add(blob.getName());
        }
        return new ResponseEntity(fileNames, HttpStatus.OK);
    }

    @PostMapping("/upload")
    @ResponseStatus(HttpStatus.OK)
    public String uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            if (file.isEmpty()) {
                return "File is empty";
            }

            // Get the blob name from the original filename
            String blobName = file.getOriginalFilename();

            // Create or get the BlobAsyncClient for the specified blob
            BlobClient blobAsyncClient = containerClient.getBlobClient(blobName);

            // Upload the file to Azure Blob Storage
            blobAsyncClient.upload(file.getInputStream(), file.getSize(), true);

            return "File uploaded successfully: " + blobName;
        } catch (IOException e) {
            return "Failed to upload the file: " + e.getMessage();
        }
    }

    @GetMapping("/download/{fileName}")
    public ResponseEntity download(@PathVariable String fileName) {
        BlobClient blobClient = containerClient.getBlobClient(fileName);
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        try {
            if (blobClient.exists()) {
                InputStream stream = blobClient.openInputStream();

                byte[] buffer = new byte[1024];
                int bytesRead;
                while ((bytesRead = stream.read(buffer)) != -1) {
                    outputStream.write(buffer, 0, bytesRead);
                }

                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
                headers.setContentDispositionFormData("attachment", fileName);

                return new ResponseEntity<>(outputStream.toByteArray(), headers, HttpStatus.OK);

            }
        } catch (IOException e) {
            // Handle exception appropriately (e.g., log it, return an error response)
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

}