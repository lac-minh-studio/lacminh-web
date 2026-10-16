
import { useCallback } from 'react';

type SanitizeOptions = {
    normalizeUnicode?: boolean;
    trim?: boolean;
    collapseWhitespace?: boolean;
};

const DEFAULT_OPTIONS: Required<SanitizeOptions> = {
    normalizeUnicode: true,
    trim: true,
    collapseWhitespace: false,
};

export function sanitizeText(
    value: string | null | undefined,
    options: SanitizeOptions = {},
): string {
    if (value == null) {
        return '';
    }

    const config = {
        ...DEFAULT_OPTIONS,
        ...options,
    };

    let result = value;

    if (config.normalizeUnicode) {
        result = result.normalize('NFC');
    }

    if (config.collapseWhitespace) {
        result = result.replace(/\s+/g, ' ');
    }

    if (config.trim) {
        result = result.trim();
    }

    return result;
}

export function useSanitize() {
    const sanitize = useCallback(
        (
            value: string | null | undefined,
            options?: SanitizeOptions,
        ) => sanitizeText(value, options),
        [],
    );

    return { sanitize };
}
