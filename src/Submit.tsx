import Button, { ButtonProps } from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import makeStyles from '@material-ui/core/styles/makeStyles';
import clsx from 'clsx';
import React from 'react';
import { Control, useFormContext } from 'react-hook-form';

const useStyles = makeStyles({
  root: { position: 'relative' },
  progress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
});

interface Submit extends ButtonProps {
  control?: Control;
  disabled?: boolean;
  submitting?: boolean;
  submittingText?: string;
}

function Submit({
  control: controlProp,
  disabled,
  className,
  submitting: submittingProp,
  children = 'Submit',
  ...other
}: Submit) {
  const classes = useStyles();
  const methods = useFormContext();
  const control = controlProp || methods.control;
  const submitting =
    submittingProp || methods?.formState?.isSubmitting || control?.formState?.isSubmitting;

  return (
    <Button
      color="primary"
      variant="contained"
      type="submit"
      disabled={disabled || submitting}
      className={clsx(classes.root, className)}
      {...other}
    >
      {submitting && <CircularProgress size={24} className={classes.progress} />}
      {children}
    </Button>
  );
}

export default Submit;
