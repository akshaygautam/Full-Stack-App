package com.akshaygautam.fullstackapp.configs;

import com.azure.storage.blob.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.*;

@Configuration
public class AzureBlobConfig {

    @Value("${spring.cloud.azure.storage.blob.container-name}")
    private String containerName;

    @Value("${spring.cloud.azure.storage.blob.endpoint}")
    private String endPoint;

    @Bean
    public BlobServiceClient getBlobServiceClient() {
        BlobServiceClient blobAsyncClient = new BlobServiceClientBuilder()
                .endpoint(endPoint)
                .buildClient();
        return blobAsyncClient;
    }

    @Bean
    public BlobContainerClient getContainerClient() {
        BlobContainerClient containerAsyncClient = getBlobServiceClient().getBlobContainerClient(containerName);
        return containerAsyncClient;
    }
}
