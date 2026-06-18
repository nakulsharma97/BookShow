package com.cfs.BMS.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MessageResponse {
    private String message;

    // Getters and Setters (Lombok @Data handles this)
}