import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers/DatePicker";
import { UseDateFieldProps } from "@mui/x-date-pickers/DateField";
import {
  BaseSingleInputFieldProps,
  DateValidationError,
  FieldSection,
} from "@mui/x-date-pickers/models";
import { Moment } from "moment";
import { FC, useState } from "react";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import Button from "@mui/material/Button";

interface ButtonFieldProps
  extends UseDateFieldProps<Moment, false>,
    BaseSingleInputFieldProps<
      Moment | null,
      Moment,
      FieldSection,
      false,
      DateValidationError
    > {
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

function ButtonField(props: ButtonFieldProps) {
  const {
    setOpen,
    label,
    id,
    disabled,
    InputProps: { ref } = {},
    inputProps: { "aria-label": ariaLabel } = {},
  } = props;

  return (
    <Button
      variant="outlined"
      id={id}
      disabled={disabled}
      ref={ref}
      aria-label={ariaLabel}
      onClick={() => setOpen?.((prev) => !prev)}
    >
      {label ? `Current date: ${label}` : "Pick a date"}
    </Button>
  );
}

function ButtonDatePicker(
  props: Omit<DatePickerProps<Moment>, "open" | "onOpen" | "onClose">
) {
  const [open, setOpen] = useState(false);

  return (
    <DatePicker
      views={["month", "year"]}
      slots={{ ...props.slots, field: ButtonField }}
      slotProps={{ ...props.slotProps, field: { setOpen } as any }}
      {...props}
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    />
  );
}

export const DatePickerCustom: FC = () => {
  const [value, setValue] = useState<Moment | null>(null);

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <ButtonDatePicker
        label={value == null ? null : value.format("MM/DD/YYYY")}
        value={value}
        onChange={(newValue) => setValue(newValue)}
      />
    </LocalizationProvider>
  );
};
