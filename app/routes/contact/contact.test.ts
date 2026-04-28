import { describe, expect, it } from 'vitest';
import { ContactSchema } from './contact';

describe('ContactSchema', () => {
  it('should validate a valid contact form submission', () => {
    const validData = {
      name: 'John Doe',
      email: 'test@example.com',
      company: 'Acme Inc.',
      message: 'Hello, I am interested in your services.',
    };

    expect(ContactSchema.safeParse(validData).success).toBe(true);
  });

  it('should throw an error for an invalid email', () => {
    const invalidData = {
      name: 'John Doe',
      email: 'invalid-email',
      company: 'Acme Inc.',
      message: 'Hello, I am interested in your services.',
    };

    const result = ContactSchema.safeParse(invalidData);

    expect(result.success).toBe(false);
    expect(result.error?.issues[0].path).toContain('email');
  });

  it('should throw an error for missing required fields', () => {
    const invalidData = {
      email: '',
      company: 'Acme Inc.',
      message: 'Hello, I am interested in your services.',
    };

    const result = ContactSchema.safeParse(invalidData);

    expect(result.success).toBe(false);
    expect(result.error?.issues[0].path).toContain('name');
  });

  it('should throw an error for generic email domains', () => {
    const invalidData = {
      name: 'John Doe',
      email: 'john@gmail.com',
      company: 'Acme Inc.',
      message: 'Hello, I am interested in your services.',
    };

    const result = ContactSchema.safeParse(invalidData);

    expect(result.success).toBe(false);
    expect(result.error?.issues[0].path).toContain('email');
  });
});
