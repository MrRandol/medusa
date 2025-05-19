package org.randol.medusa.exceptions;

import lombok.Getter;

@Getter
public class MedusaException extends RuntimeException {
    private final ErrorType scope;

    public enum ErrorType {
        VALIDATION,
        NOT_FOUND,
        FILESYSTEM,
        OTHER
    }

    public MedusaException(String message, ErrorType scope) {
        super(message);
        this.scope = scope;
    }

    public MedusaException(String message, ErrorType scope, Throwable cause) {
        super(message, cause);
        this.scope = scope;
    }
} 