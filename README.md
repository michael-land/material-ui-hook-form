# Material UI Hook Form

A set of wrapper components to facilitate using Material-UI with React Hook Form

[Storebook](https://material-ui-hook-form-storybook.now.sh)

[Storebook src](https://github.com/xiaoyu-tamu/material-ui-hook-form/blob/master/stories/form.stories.tsx)

## Website (TODO)

## Documentation ( TODO )

### Field ( Text, Select, TextArea )

> This component can use inside `<Fields>`

You can pass any props from [`TextField`](https://material-ui.com/api/text-field) to `Field`.

Additional props from [`React Hook Form`](https://react-hook-form.com/api#register):

- `name: string` - name is required and unique. Input name also supports dot and bracket syntax, which allows you to easily create nested form fields. [`Read more`](https://react-hook-form.com/api#register)
- `control?: Control` - control object is from invoking useForm. it's optional if you are using FormContext.
- `required?: string | ValidationOptionObject<boolean>`
- `min?: ValidationOptionObject<number | string>`
- `max?: ValidationOptionObject<number | string>`
- `maxLength?: ValidationOptionObject<number | string>`
- `minLength?: ValidationOptionObject<number | string>`
- `pattern: ValidationOptionObject<RegExp>`
- `validate?: Validate | Record<string, Validate>`

Addtional props:

- `naked?: boolean` - Hide label and helperText when true

```tsx
// Text
<Field name="firstName" />
<Field name="firstName" required maxLength={5} minLength={3} />
<Field name="phone" pattern={/^\d+$/} />

// TextArea
<Field name="note" multiline rows={4} />
<Field
  name="note"
  multiline
  rows={4}
  validate={v =>
    v
      ? String(v)
          .toLowerCase()
          .includes('mui') || 'note must include word `mui`'
      : undefined
  }
/>;

const DEPARTMENT = ['HR', 'accounting', 'shipping'];

// Select
<Field name="department" options={DEPARTMENTS} />

// Select with render props
<Field name="department">
    {options.map(option=> {
        <MenuItem key={option} value={option}>{option}</MenuItem>
    })}
</Field>
```

### FieldNumber ( Currency, Number, FormatNumber, MaskInput, Phone Number, etc )

> This component can use inside `<Fields>`

You can pass any props from [`TextField`](https://material-ui.com/api/text-field) to `FieldNumber` except `select`, `SelectProps`.

You can pass any props from [`React Number Format`](https://github.com/s-yadav/react-number-format#props)

Additional props from [`React Hook Form`](https://react-hook-form.com/api#register):

- `name: string` - name is required and unique. Input name also supports dot and bracket syntax, which allows you to easily create nested form fields. [`Read more`](https://react-hook-form.com/api#register)
- `control?: Control` - control object is from invoking useForm. it's optional if you are using FormContext.
- `required?: string | ValidationOptionObject<boolean>`
- `min?: ValidationOptionObject<number | string>`
- `max?: ValidationOptionObject<number | string>`
- `validate?: Validate | Record<string, Validate>`

Addtional props:

- `naked?: boolean` - Hide label and helperText when true

```tsx
// Number
<FieldNumber name="age" />

// Currency,  $ 150,000
<FieldNumber name="salary" min={150000} thousandSeparator prefix="$ " md={4} />

```

### FieldAutocomplete ( Autocomplete )

> This component can use inside `<Fields>`

You can pass any props from [`Autocomplete`](https://material-ui.com/api/autocomplete) to `FieldAutocomplete`.

You can pass any props from [`TextField`](https://material-ui.com/api/autocomplete) to `FieldAutocomplete` except `onChange`, `select`, `SelectProps`.

FieldAutocomplete has a default renderInput implementation, which just a TextField with error message, All TextField props will forwarded to TextField. You can override renderInput if needed.

```tsx
(params: RenderInputParams) => (
  <TextField
    fullWidth
    required={!!required}
    label={!naked ? label ?? getInputLabelFromName(name) : undefined}
    helperText={!naked ? error?.message ?? helperText : undefined}
    error={!!error}
    variant={variant as any}
    {...params}
    {...other}
  />
);
```

Additional props from [`React Hook Form`](https://react-hook-form.com/api#register):

- `name: string` - name is required and unique. Input name also supports dot and bracket syntax, which allows you to easily create nested form fields. [`Read more`](https://react-hook-form.com/api#register)
- `control?: Control` - control object is from invoking useForm. it's optional if you are using FormContext.
- `required?: string | ValidationOptionObject<boolean>`
- `validate?: Validate | Record<string, Validate>`

Addtional props:

- `naked?: boolean` - Hide label and helperText when true

```tsx
// Autocomplete
<FieldAutocomplete name="gender" options={['male', 'female']} />
<FieldAutocomplete name="gender" options={['male', 'female']} required />
<FieldAutocomplete
    name="gender"
    options={['male', 'female', 'other']}
    validate={v=> v === 'other' || 'Only other is allowed'}
/>
```

### FieldRadioGroup ( RadioGroup )

You can pass any props from [`RadioGroup`](https://material-ui.com/api/radio-group) to `FieldRadioGroup`.

Additional props from [`React Hook Form`](https://react-hook-form.com/api#register):

- `name: string` - name is required and unique. Input name also supports dot and bracket syntax, which allows you to easily create nested form fields. [`Read more`](https://react-hook-form.com/api#register)
- `control?: Control` - control object is from invoking useForm. it's optional if you are using FormContext.
- `required?: string | ValidationOptionObject<boolean>`

Addtional props:

- `label?: string` - Form Label
- `naked?: boolean` - Hide label and helperText when true
- `options: (string | { value: string; label?: string })[]` - self described
- `helperText?: string` - @see TextField#helperText
- `disabled?: boolean` - @see TextField#disabled

```tsx
// TODO
```

### Form

You can pass any props from `<form />`.

Additional props:

- `form?: FormContextValues` - If you pass the form object got from invoking `useForm()`. It will wrap a FormContext for you
- `debug?: boolean` - TODO

#### Implementation

```tsx
interface Form extends React.FormHTMLAttributes<HTMLFormElement> {
  form?: FormContextValues;
  debug?: boolean;
}

function Form({ form, ...other }: Form) {
  const component = <form noValidate {...other} />;
  return form ? <FormContext {...form}>{component}</FormContext> : component;
}
```

### Fields

You can pass any props from [`Grid`](https://material-ui.com/api/grid) to `Fields` except `container` and `item`.

- All Grid item have `xs=12` default value.

```tsx
// All field now wrapped with <Grid item xs={12} md={6}/> You can override this by pass breakpoints to individual `Field`

<Fields spacing={2} md={6}>
  <Field name="department" md={12} />
  <Field name="firstName" />
  <Field name="lastName" />
  <FieldNumber name="age" md={4} />
  <FieldNumber name="salary" md={4} />
  <Field name="phone" md={4} />
  <Field name="note" />
</Fields>
```

### Submit

A button with loading indicator and disabled while submitting

You can pass any props from [`Button`](https://material-ui.com/api/button) to `Submit`

Additional props from [`React Hook Form`](https://react-hook-form.com/api#register):

- `control?: Control` - control object is from invoking useForm. it's optional if you are using FormContext.

Addtional props:

- `loading?: boolean` - Disable button and show loading indicator when true, it's optional if you are using FormContext

```tsx
const form = useForm();
<Form
  form={form}
  onSubmit={form.handleSubmit(async () => {
    // sleep
    await new Promise(resolve => setTimeout(resolve, 2000));
  })}
>
  <Submit />
</Form>;
```

## All thanks goes to:

- [Material-UI](https://material-ui.com/)
- [React Hook Form](https://react-hook-form.com/)
- [React Number Format](https://github.com/s-yadav/react-number-format)

## Other Solutions

- [Material UI x Formik](https://github.com/stackworx/formik-material-ui/tree/master/packages/formik-material-ui/src)
- [Material UI x Final Form](https://github.com/Deadly0/final-form-material-ui)
