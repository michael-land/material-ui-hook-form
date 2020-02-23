import { GridProps } from '@material-ui/core/Grid';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import TextField, { TextFieldProps } from '@material-ui/core/TextField/TextField';
import Autocomplete, { AutocompleteProps, RenderInputParams } from '@material-ui/lab/Autocomplete';
import { UseAutocompleteProps } from '@material-ui/lab/useAutocomplete';
import React from 'react';
import { Control, Controller, ValidationOptions } from 'react-hook-form';
import { SetOptional } from 'type-fest';
import useField from './useField';
import { get } from './utils/get';
import { getInputLabelFromName } from './utils/getInputLabelFromName';

type FieldAutocomplete<T> = Pick<ValidationOptions, 'required' | 'validate'> &
  SetOptional<AutocompleteProps<T>, 'renderInput'> &
  UseAutocompleteProps<T> &
  Pick<GridProps, Breakpoint> &
  Omit<TextFieldProps, 'required' | 'onChange'> & {
    name: string;
    control?: Control;
    naked?: boolean;
  };

function FieldAutocomplete<T>({
  control: controlProp,
  name,
  required,
  validate,
  helperText,
  label,
  variant,
  naked,

  // Autocomplete Props
  autoComplete,
  autoHighlight,
  autoSelect,
  blurOnSelect,
  ChipProps,
  classes,
  clearOnEscape,
  clearText,
  closeIcon,
  closeText,
  debug,
  defaultValue,
  disableClearable,
  disableCloseOnSelect,
  disabled,
  disableListWrap,
  disableOpenOnFocus,
  disablePortal,
  filterOptions,
  options,
  filterSelectedOptions,
  forcePopupIcon,
  freeSolo,
  getOptionDisabled,
  getOptionLabel,
  getOptionSelected,
  groupBy,
  id,
  includeInputInList,
  inputValue,
  ListboxComponent,
  ListboxProps,
  loading,
  loadingText,
  multiple,
  noOptionsText,
  onChange,
  onClose,
  onInputChange,
  onOpen,
  open,
  openText,
  PaperComponent,
  PopperComponent,
  popupIcon,
  renderGroup,
  renderInput,
  renderOption,
  renderTags,
  selectOnFocus,
  size,
  ...other
}: FieldAutocomplete<T>) {
  const { control, error, rules } = useField({
    name,
    control: controlProp,
    disabled,
    required,
  });

  const handleChange = React.useCallback<any>(
    ([event, value]: [React.ChangeEvent<{}>, any]) => {
      return onChange ? onChange(event, value) : value;
    },
    [onChange]
  );

  return (
    <Controller
      name={name}
      as={Autocomplete}
      defaultValue={get(control.defaultValuesRef.current, name, null)}
      onChange={handleChange}
      control={control}
      disabled={disabled}
      rules={rules}
      autoComplete={autoComplete}
      autoHighlight={autoHighlight}
      autoSelect={autoSelect}
      blurOnSelect={blurOnSelect}
      ChipProps={ChipProps}
      classes={classes}
      clearOnEscape={clearOnEscape}
      clearText={clearText}
      closeIcon={closeIcon}
      closeText={closeText}
      debug={debug}
      disableClearable={disableClearable}
      disableCloseOnSelect={disableCloseOnSelect}
      disableListWrap={disableListWrap}
      disableOpenOnFocus={disableOpenOnFocus}
      disablePortal={disablePortal}
      filterOptions={filterOptions}
      options={options}
      filterSelectedOptions={filterSelectedOptions}
      forcePopupIcon={forcePopupIcon}
      freeSolo={freeSolo}
      getOptionDisabled={getOptionDisabled}
      getOptionLabel={getOptionLabel}
      getOptionSelected={getOptionSelected}
      groupBy={groupBy}
      id={id}
      includeInputInList={includeInputInList}
      inputValue={inputValue}
      ListboxComponent={ListboxComponent}
      ListboxProps={ListboxProps}
      loading={loading}
      loadingText={loadingText}
      multiple={multiple}
      noOptionsText={noOptionsText}
      onClose={onClose}
      onInputChange={onInputChange}
      onOpen={onOpen}
      open={open}
      openText={openText}
      PaperComponent={PaperComponent}
      PopperComponent={PopperComponent}
      popupIcon={popupIcon}
      renderGroup={renderGroup}
      renderOption={renderOption}
      renderTags={renderTags}
      selectOnFocus={selectOnFocus}
      size={size}
      renderInput={
        renderInput ||
        ((params: RenderInputParams) => (
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
        ))
      }
    />
  );
}

export default FieldAutocomplete;
