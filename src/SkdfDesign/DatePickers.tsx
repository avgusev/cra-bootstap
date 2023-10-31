import { useState } from 'react';
import DatePicker from 'react-datepicker';
import locale from 'date-fns/locale/ru';
import SkdfDatePicker from '../components/DatePicker';
import Button from '../components/Button';

function DatePickers() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [dateStart, dateEnd] = dateRange;

  return (
    <div className="container-fluid">
      <h2>Date Picker Default</h2>
      <div className="row">
        <div className="col-3">
          <DatePicker
            id="ReactDatePicker"
            locale={locale}
            selected={startDate}
            onChange={(date: Date) => setStartDate(date)}
          />
        </div>
        <div className="col-3">
          <label htmlFor="ReactDatePickerDef" className="form-label">
            ReactDatePickerDef
          </label>
          <div className="skdf-calendar-container">
            <DatePicker
              id="ReactDatePickerDef"
              locale={locale}
              renderCustomHeader={({
                monthDate,
                decreaseMonth,
                increaseMonth,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled,
              }) => (
                <div className="d-flex justify-content-between text-md-start">
                  <Button
                    disabled={prevMonthButtonDisabled}
                    variant="function"
                    icon="arrow_left"
                    onClick={decreaseMonth}
                  />
                  <h5 className="text-capitalize mb-0">
                    {monthDate
                      .toLocaleString('ru-RU', {
                        month: 'long',
                        year: 'numeric',
                      })
                      .replace(/\s*г\./, '')}
                  </h5>
                  <Button
                    disabled={nextMonthButtonDisabled}
                    variant="function"
                    icon="arrow_right"
                    onClick={increaseMonth}
                  />
                </div>
              )}
              className="form-control form-control-sm"
              calendarClassName="skdf-shadow-down-8dp position-absolute p-3 border border-primary rounded"
              dateFormat="dd.MM.yyyy"
              placeholderText="__.__.____"
              autoComplete="off"
              selected={startDate}
              onChange={(date: Date) => setStartDate(date)}
            />
          </div>
        </div>
      </div>

      <hr className="my-5" />
      <h2>Date Picker</h2>
      <div className="row">
        <div className="col-3">
          <SkdfDatePicker
            id="ReactDatePicker0"
            label="React Date Picker"
            minDate={new Date(1950, 0, 1)}
            maxDate={new Date(2050, 0, 1)}
            selected={startDate}
            onChange={(date: Date) => setStartDate(date)}
          />
        </div>
        <div className="col-3">
          <SkdfDatePicker
            id="ReactDatePicker1"
            label="React Date Picker Selected"
            selected={startDate || new Date()}
            onChange={(date: Date) => setStartDate(date)}
          />
        </div>
        <div className="col-3">
          <SkdfDatePicker
            id="ReactDatePicker2"
            label="React Date Picker Disabled"
            disabled
            onChange={(date: Date) => setStartDate(date)}
          />
        </div>
        <div className="col-3">
          <SkdfDatePicker
            id="ReactDatePicker3"
            label="React Date Picker Invalid"
            className="form-control form-control-sm is-invalid"
            selected={startDate || new Date()}
            onChange={(date: Date) => setStartDate(date)}
          />
        </div>
      </div>
      <hr className="my-5" />
      <h2>Range</h2>
      <div className="row">
        <div className="col-3">
          <SkdfDatePicker
            id="ReactDatePickerDay"
            label="React Date Range Day"
            selectRangeMode="day"
            selected={dateStart}
            startDate={dateStart}
            endDate={dateEnd}
            onChange={(date: Date | null | [Date | null, Date | null]) =>
              setDateRange(date as [Date | null, Date | null])
            }
          />
        </div>

        <div className="col-3">
          <SkdfDatePicker
            id="ReactDatePickerMonth"
            label="React Date Range Month"
            selectRangeMode="month"
            selected={dateStart}
            startDate={dateStart}
            endDate={dateEnd}
            onChange={(date: Date | null | [Date | null, Date | null]) =>
              setDateRange(date as [Date | null, Date | null])
            }
          />
        </div>
        {/* <div className="col-3">
          <SkdfDatePicker
            id="ReactDatePickerYear"
            label="React Date Range"
            selectsRangeDate="year"
            selected={dateStart}
            startDate={dateStart}
            endDate={dateEnd}
            onChange={(date: Date | null | [Date | null, Date | null]) =>
              setDateRange(date as [Date | null, Date | null])
            }
          />
        </div> */}
      </div>
    </div>
  );
}

export default DatePickers;
