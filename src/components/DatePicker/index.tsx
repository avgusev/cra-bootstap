import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import locale from 'date-fns/locale/ru';
import { SingleValue } from 'react-select';
import Select from '../../components/Select';
import Button from '../Button';

// import 'react-datepicker/dist/react-datepicker.css';

export type DatePickerProps = ReactDatePickerProps & {
  label?: string;
  selectRangeMode?: 'day' | 'month' | 'year';
};

type ISelectOption = {
  value: string;
  label: string;
  isDisabled?: boolean;
};

const optionsMonth: ISelectOption[] = [
  { value: '0', label: 'Январь' },
  { value: '1', label: 'Февраль' },
  { value: '2', label: 'Март' },
  { value: '3', label: 'Апрель' },
  { value: '4', label: 'Май' },
  { value: '5', label: 'Июнь' },
  { value: '6', label: 'Июль' },
  { value: '7', label: 'Август' },
  { value: '8', label: 'Сентябрь' },
  { value: '9', label: 'Октябрь' },
  { value: '10', label: 'Ноябрь' },
  { value: '11', label: 'Декабрь' },
];

// const optionsYearRange: ISelectOption[] = [
//   { value: '1945', label: '1945-1956' },
//   { value: '1957', label: '1957-1968' },
//   { value: '1969', label: '1969-1980' },
//   { value: '1981', label: '1981-1992' },
//   { value: '1993', label: '1993-2004' },
//   { value: '2005', label: '2005-2016' },
//   { value: '2017', label: '2017-2028' },
//   { value: '2029', label: '2029-2040' },
//   { value: '2041', label: '2041-2052' },
//   { value: '2053', label: '2053-2064' },
// ];

const range = (start = 1950, end = 2050) => {
  return new Array(end - start)
    .fill('')
    .map((_, i) => ({ value: (i + start).toString(), label: (i + start).toString() }));
};

export const optionsYear = range(1990, 2035);

const placeholderRange = {
  day: '__.__.____-__.__.____',
  month: '__.____-__.____',
  year: '____-____',
};

// TODO: add style for RangeYear
// function handleCalendarOpen(startDate: Date | null, endDate: Date | null) {
//   const year = document.getElementsByClassName('react-datepicker__year-text');
//   for (let i = 0; i < year.length; i++) {
//     if (Number(year[i].innerHTML) === Number(startDate?.getFullYear())) {
//       year[i].classList.add('react-datepicker__year--range-start');
//     }
//     if (
//       Number(year[i].innerHTML) > Number(startDate?.getFullYear()) &&
//       Number(year[i].innerHTML) < Number(endDate?.getFullYear())
//     ) {
//       year[i].classList.add('react-datepicker__year--in-range');
//     } else {
//       year[i].classList.remove('react-datepicker__year--in-range');
//     }
//     if (Number(year[i].innerHTML) === Number(endDate?.getFullYear())) {
//       year[i].classList.add('react-datepicker__year--range-end');
//     } else {
//       year[i].classList.remove('react-datepicker__year--range-end');
//     }
//   }
//   return;
// }

function SkdfDatePicker({
  id = 'ReactDatePicker',
  label,
  className = 'form-control form-control-sm',
  placeholderText,
  selectRangeMode: selectsRangeDate,
  // onChange,
  ...props
}: DatePickerProps) {
  const options = range(
    props.minDate ? props.minDate.getFullYear() : new Date().getFullYear() - 50,
    props.maxDate ? props.maxDate.getFullYear() + 1 : new Date().getFullYear() + 51
  );
  return (
    <>
      {label !== undefined && (
        <label htmlFor={id} className="form-label">
          {label} {props.required ? <sup className="text-danger">*</sup> : null}
        </label>
      )}
      <div className="skdf-calendar-container">
        <DatePicker
          id={id}
          renderCustomHeader={({
            date,
            changeYear,
            changeMonth,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (
            <div className="d-flex justify-content-between text-md-start">
              <Button disabled={prevMonthButtonDisabled} variant="function" icon="arrow_left" onClick={decreaseMonth} />

              {selectsRangeDate !== 'month' && selectsRangeDate !== 'year' && (
                <Select
                  options={optionsMonth}
                  value={optionsMonth.find((item) => item.value === date.getMonth().toString())}
                  onChange={(select: SingleValue<ISelectOption>) => {
                    changeMonth(Number(select?.value));
                  }}
                />
              )}

              {selectsRangeDate !== 'year' && (
                // <Select
                //   options={optionsYearRange}
                //   value={
                //     optionsYearRange.filter((item) => item.value <= date.getFullYear().toString())[
                //       optionsYearRange.filter((item) => item.value <= date.getFullYear().toString()).length - 1
                //     ]
                //   }
                //   onChange={(select: SingleValue<ISelectOption>) => {
                //     changeYear(Number(select?.value));
                //   }}
                // />
                <Select
                  options={options}
                  value={{
                    value: date.getFullYear().toString(),
                    label: date.getFullYear().toString(),
                  }}
                  onChange={(select: SingleValue<ISelectOption>) => {
                    changeYear(Number(select?.value));
                  }}
                />
              )}
              <Button
                disabled={nextMonthButtonDisabled}
                variant="function"
                icon="arrow_right"
                onClick={increaseMonth}
              />
            </div>
          )}
          locale={locale}
          className={className}
          calendarClassName="skdf-shadow-down-8dp position-absolute p-3 border border-primary rounded weeks-none"
          selectsRange={!!selectsRangeDate}
          showMonthYearPicker={selectsRangeDate === 'month'}
          showYearPicker={selectsRangeDate === 'year'}
          dateFormat={selectsRangeDate === 'year' ? 'yyyy' : selectsRangeDate === 'month' ? 'MM.yyyy' : 'dd.MM.yyyy'}
          placeholderText={
            placeholderText ? placeholderText : selectsRangeDate ? placeholderRange[selectsRangeDate] : '__.__.____'
          }
          yearItemNumber={12}
          autoComplete="off"
          // onCalendarOpen={() => props.startDate && props.endDate && handleCalendarOpen(props.startDate, props.endDate)}
          {...props}
        />
      </div>
    </>
  );
}
export default SkdfDatePicker;
