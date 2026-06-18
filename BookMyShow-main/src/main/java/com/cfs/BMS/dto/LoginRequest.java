package com.cfs.BMS.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginRequest {
    @NotBlank
    private String email;

    @NotBlank
    private String password;

    // Getters and Setters (Lombok @Data handles this)
}