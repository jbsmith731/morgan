import { formOptions, mergeForm, useForm } from '@tanstack/react-form';
import {
  createServerValidate,
  ServerValidateError,
  useTransform,
} from '@tanstack/react-form-remix';
import { data, Form, useActionData } from 'react-router';
import { Resend } from 'resend';
import { twMerge } from 'tailwind-merge';
import z from 'zod';
import { FieldInfo, FieldLabel, FieldRoot } from '~/components/ds/Field';
import { getInputProps, Input } from '~/components/ds/Input';
import { Textarea } from '~/components/ds/Textarea';
import { box } from '~/components/styles/box';
import { button } from '~/components/styles/button';
import { copy, heading } from '~/components/styles/text';
import { createMetaTitle } from '~/helpers/seo.helpers';
import type { Route } from './+types/contact';

export async function action({ request, context }: Route.ActionArgs) {
  const formData = await request.formData();
  const { RESEND_API_KEY, RESEND_TO, RESEND_FROM, RESEND_DISABLED } =
    context.cloudflare.env;

  try {
    const validated = await serverValidate(formData);
    // Remove this line to enable email sending

    if (RESEND_DISABLED !== 'true') {
      const resend = new Resend(RESEND_API_KEY);
      const { error } = await resend.emails.send({
        from: `Send <${RESEND_FROM}>`,
        to: RESEND_TO,
        subject: 'New Contact Form Submission',
        html: createEmailBody(validated),
        replyTo: `${validated.name} <${validated.email}>`,
      });
    } else {
      console.log('Resend is disabled. Form submission data:', validated);
    }

    return data({ status: 'SUCCESS', data: validated });
  } catch (error) {
    if (error instanceof ServerValidateError) {
      return data(
        {
          status: 'VALIDATION_ERROR',
          type: 'VALIDATION',
          error: error.formState,
          data: error.formState.values,
        },
        { status: 400 },
      );
    }

    return data(
      {
        status: 'ERROR',
        type: 'UNKNOWN',
        error: 'Form submission failed',
        data: null,
      },
      { status: 500 },
    );
  }
}

export default function ContactPage({ actionData }: Route.ComponentProps) {
  if (actionData?.status === 'SUCCESS') {
    return (
      <main className="constrain py-20 place-self-center">
        <ContactSuccess />
      </main>
    );
  }

  return (
    <main className="constrain py-10 sm:py-20">
      <title>{createMetaTitle('Contact')}</title>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="grid gap-2 self-start">
          <h1 className={heading({ level: '1' })}>Contact</h1>
          <p className={copy({ className: 'max-w-[40ch]' })}>
            If you have any questions or would like to get in touch, please fill
            out blah blah blah. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit.
          </p>
        </div>

        <ContactForm />
      </div>
    </main>
  );
}

function ContactSuccess() {
  return (
    <div
      className={twMerge(
        'grid gap-1 place-content-center place-items-center',
        'p-6 min-h-70 max-w-[60ch] mx-auto text-center rounded-2xl',
        'border border-ds-accent bg-ds-accent-muted/25',
      )}
    >
      <title>{createMetaTitle('Contact')}</title>
      <h1 className={heading({ level: '2' })}>Thank you for reaching out!</h1>
      <p className={copy({ className: 'max-w-[40ch] place-self-center' })}>
        I appreciate you taking the time to contact me. I will get back to you
        as soon as possible.
      </p>
    </div>
  );
}

function ContactForm() {
  const actionData = useActionData<typeof action>();
  const form = useForm({
    ...contactOptions,
    validators: {
      onSubmit: ContactSchema,
    },
    transform: useTransform(
      (baseForm) => mergeForm(baseForm, actionData?.data ?? {}),
      [actionData],
    ),
  });

  return (
    <Form
      className="grid gap-4 w-full"
      method="POST"
      onSubmit={() => form.handleSubmit()}
    >
      <form.Field name="name">
        {(field) => {
          return (
            <FieldRoot>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input {...getInputProps(field)} placeholder="Jane Doe" />
              <FieldInfo field={field} />
            </FieldRoot>
          );
        }}
      </form.Field>

      <form.Field name="email">
        {(field) => {
          return (
            <FieldRoot>
              <FieldLabel htmlFor="email">Business email</FieldLabel>
              <Input
                {...getInputProps(field)}
                type="email"
                placeholder="jane.doe@acme.com"
              />
              <FieldInfo field={field} />
            </FieldRoot>
          );
        }}
      </form.Field>

      <form.Field name="company">
        {(field) => {
          return (
            <FieldRoot>
              <FieldLabel htmlFor="company">Company</FieldLabel>
              <Input {...getInputProps(field)} placeholder="Acme Inc." />
              <FieldInfo field={field} />
            </FieldRoot>
          );
        }}
      </form.Field>

      <form.Field name="message">
        {(field) => {
          return (
            <FieldRoot>
              <FieldLabel htmlFor="message">Message</FieldLabel>
              <Textarea
                id="message"
                name="message"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                aria-invalid={!field.state.meta.isValid}
                rows={4}
                placeholder="Write your message here..."
              />
              <FieldInfo field={field} />
            </FieldRoot>
          );
        }}
      </form.Field>

      {actionData?.status === 'ERROR' && (
        <p className={box({ variant: 'error' })}>
          There was a problem submitting your message. Please try again or
          contact me at{' '}
          <a
            href="mailto:connect@morgansmith.marketing"
            className="underline hover:text-red-900 transition-colors"
          >
            connect@morgansmith.marketing
          </a>
        </p>
      )}

      <button
        type="submit"
        className={button({ className: 'place-self-start' })}
      >
        Submit
      </button>
    </Form>
  );
}

const contactOptions = formOptions({
  defaultValues: {
    name: '',
    email: '',
    company: '',
    message: '',
  },
});

const serverValidate = createServerValidate({
  ...contactOptions,
  onServerValidate: ({ value }) => {
    try {
      ContactSchema.parse(value);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return error;
      }
    }
  },
});

const BLOCKED_DOMAINS = [
  'gmail.com',
  'googlemail.com',
  'yahoo.com',
  'yahoo.co.uk',
  'hotmail.com',
  'hotmail.co.uk',
  'outlook.com',
  'live.com',
  'msn.com',
  'icloud.com',
  'me.com',
  'mac.com',
  'aol.com',
  'protonmail.com',
  'proton.me',
];

const ContactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z
    .email('Invalid email address')
    .refine(
      (email) => !BLOCKED_DOMAINS.includes(email.split('@')[1]?.toLowerCase()),
      'Please use a business email address',
    ),
  company: z.string().transform((val) => (val === '' ? undefined : val)),
  message: z.string().transform((val) => (val === '' ? undefined : val)),
});

function createEmailBody(values: Awaited<ReturnType<typeof serverValidate>>) {
  return `<strong>Name:</strong> ${values.name}<br />
<strong>Email:</strong> ${values.email}<br />
<strong>Company:</strong> ${values.company || 'N/A'}<br />
<strong>Message:</strong> ${values.message || 'N/A'}<br />

<p style="font-size: 12px;">${new Date().toLocaleString()}</p>`;
}
