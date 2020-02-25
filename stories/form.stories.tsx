import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardHeader,
  Container,
  createMuiTheme,
  Divider,
  IconButton,
  TextFieldProps,
  ThemeProvider,
  Toolbar,
  Typography,
} from '@material-ui/core';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import React from 'react';
import countries from './data/countries';
import {
  Field,
  FieldAutocomplete,
  FieldBoolean,
  FieldNumber,
  Fields,
  Form,
  Submit,
  useForm,
} from '../src';

const defaultValues = {
  firstName: 'Michael',
  lastName: 'Li',
  age: 100,
  salary: 99999,
  note: `Hello`,
  phone: 'fake-phone-number',
  developer: true,
};

const DEPARTMENTS = ['shipping', 'accounting', 'customer service'];

export const Basic = () => {
  const form = useForm({ defaultValues });
  React.useEffect(() => {
    form.handleSubmit(() => {})();
  }, []);

  const validateNote = React.useCallback(
    value =>
      value
        ? String(value)
            .toLowerCase()
            .includes('hi') || 'Note must include word `Hi`'
        : undefined,
    []
  );

  return (
    <Frame>
      <Form form={form} onSubmit={form.handleSubmit(console.log)}>
        <Fields>
          <Field name="department" required options={DEPARTMENTS} />
          <Field name="firstName" maxLength={5} md={6} />
          <Field name="lastName" minLength={3} md={6} />
          <FieldNumber name="age" decimalScale={0} max={18} md={4} />
          <FieldNumber name="salary" min={150000} thousandSeparator prefix="$ " md={4} />
          <Field name="phone" pattern={/^\d+$/} md={4} />
          <FieldAutocomplete
            name="country"
            getOptionLabel={(o: any) => o.label}
            required
            options={countries}
          />
          <FieldAutocomplete
            name="tags"
            freeSolo
            validate={(v: any[]) => v.length > 1 || 'You must select at least two tags'}
            multiple
            disableCloseOnSelect
            autoHighlight
            options={['Good', 'Bad', 'Average']}
            ChipProps={{ size: 'small', variant: 'outlined' }}
          />
          <Field name="note" validate={validateNote} rows={4} rowsMax={8} multiline />
        </Fields>
        <Toolbar disableGutters>
          <Submit />
        </Toolbar>
        <Divider />

        <Box p={4}>
          <Typography gutterBottom variant="h5">
            Code
          </Typography>
          <img src="./code.png" style={{ maxWidth: '100%' }} />
        </Box>
        <Divider />

        <Box p={4}>
          <Typography gutterBottom variant="h5">
            Form Values
          </Typography>
          <pre style={{ whiteSpace: 'pre-wrap', overflow: 'auto' }}>
            {JSON.stringify(form.watch(), null, 2)}
          </pre>
        </Box>
        <Divider />

        <Box p={4}>
          <Typography gutterBottom variant="h5">
            Form Errors
          </Typography>
          <pre style={{ whiteSpace: 'pre-wrap', overflow: 'auto' }}>
            {JSON.stringify(form.errors, null, 2)}
          </pre>
        </Box>
      </Form>
    </Frame>
  );
};

function Complex() {
  const form = useForm({ defaultValues });

  return (
    <Frame>
      <Form
        form={form}
        noValidate
        onSubmit={form.handleSubmit(async () => {
          await new Promise(resolve => setTimeout(resolve, 2000));
        })}
      >
        <FieldBoolean name="developer" />
        <Fields md={6}>
          <Field name="lastName" minLength={3} size="small" />
          <Field name="lastName1" minLength={3} />
          <Field name="lastName2" minLength={3} />
          <Field name="lastName3" minLength={3} />
          <Field name="lastName" minLength={3} />
          <Field name="lastName1" minLength={3} />
          <Field name="lastName2" minLength={3} />
          <FieldNumber name="age" max={18} />

          <Field name="lastName3" minLength={3} />
        </Fields>
        <Toolbar disableGutters>
          <Submit />
        </Toolbar>
      </Form>
    </Frame>
  );
}

const Frame = React.memo(({ children }) => {
  const [dark, setDark] = React.useState<boolean>(false);
  const [variant, setVariant] = React.useState<TextFieldProps['variant']>('filled');
  const [margin, setMargin] = React.useState<TextFieldProps['margin']>('none');
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: dark ? 'dark' : 'light',
        },
        props: {
          MuiFilledInput: {
            disableUnderline: true,
          },

          MuiTextField: {
            size: 'small',
            margin,
            variant,
          },
          MuiFormHelperText: {
            variant,
          },
          MuiInputLabel: {
            shrink: true,
            variant,
          },
          MuiFormControl: {
            margin,
            variant,
          },
        },
        overrides: {
          MuiInputBase: {
            input: {
              '&$disabled': {
                cursor: 'not-allowed',
              },
            },
          },

          MuiFilledInput: {
            root: {
              borderRadius: 4,
            },
          },
        },
      }),
    [variant, margin, dark]
  );

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <Card>
          <CardContent>
            <Toolbar disableGutters variant="dense">
              <ButtonGroup color="inherit" size="small">
                <Button onClick={() => setVariant('standard')}>Standard</Button>
                <Button onClick={() => setVariant('outlined')}>Outlined</Button>
                <Button onClick={() => setVariant('filled')}>Filled</Button>
              </ButtonGroup>
              <Divider orientation="vertical" flexItem variant="middle" />
              <ButtonGroup color="inherit" size="small">
                <Button onClick={() => setMargin('dense')}>dense</Button>
                <Button onClick={() => setMargin('none')}>none</Button>
                <Button onClick={() => setMargin('normal')}>normal</Button>
              </ButtonGroup>
              <IconButton onClick={() => setDark(v => !v)} style={{ marginLeft: 'auto' }}>
                {dark ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Toolbar>
          </CardContent>
          <Divider />
          <CardHeader title="Form Validation" subheader="Try to edit the form" />
          <CardContent>{children}</CardContent>
          <Divider />
        </Card>
      </Container>
    </ThemeProvider>
  );
});

export default { title: 'Form' };
