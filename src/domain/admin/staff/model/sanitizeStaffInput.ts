
import type { IStaffFormInput } from './Staff';
import { sanitizeText } from '../../hooks/useSanitize';

export function sanitizeStaffInput(
    input: Partial<IStaffFormInput>,
): Partial<IStaffFormInput> {
    const sanitized: Partial<IStaffFormInput> = {
        ...input,
    };

    if (typeof input.fullName === 'string') {
        sanitized.fullName = sanitizeText(input.fullName, {
            collapseWhitespace: true,
        });
    }

    if (typeof input.email === 'string') {
        sanitized.email = sanitizeText(input.email);
    }

    if (typeof input.phone === 'string') {
        sanitized.phone = sanitizeText(input.phone);
    }

    return sanitized;
}
