import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers/DatePicker";
import { UseDateFieldProps } from "@mui/x-date-pickers/DateField";
import { BaseSingleInputFieldProps, DateValidationError, FieldSection } from "@mui/x-date-pickers/models";
import moment, { Moment } from "moment";
import { FC, useEffect, useState } from "react";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import Button from "@mui/material/Button";
import { getMonthString } from "../../utils/getMonthString";

interface ButtonFieldProps extends UseDateFieldProps<Moment, false>,
  BaseSingleInputFieldProps<
    Moment | null,
    Moment,
    FieldSection,
    false,
    DateValidationError
  > {
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const ButtonField = (props: ButtonFieldProps) => {
  const { setOpen, InputProps: { ref } = {}, value } = props;

  return (
    <Button
      variant="text"
      ref={ref}
      onClick={() => setOpen?.((prev) => !prev)}
      style={{ 
        color: '#014B7A', 
        fontSize: '1.3em', 
        fontWeight: '800', 
        fontFamily: "Figtree, sans-serif" 
      }}
    >
      {(value?.toDate() && getMonthString(value.toDate())) + ' ' + value?.toDate().getFullYear()}
    </Button>
  );
}

const ButtonDatePicker = (props: Omit<DatePickerProps<Moment>, "open" | "onOpen" | "onClose">) => {
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

export const DatePickerCustom: FC<{ date: string, onchange: Function }> = ({ date, onchange }) => {
  const [value, setValue] = useState<Moment | null>(moment);

  useEffect(() => setValue(moment(date)), [date]);

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <ButtonDatePicker
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          onchange(newValue?.toDate());
        }}
      />
    </LocalizationProvider>
  );
};
