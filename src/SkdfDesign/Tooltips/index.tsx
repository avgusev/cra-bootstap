import { useState } from 'react';
import PopoverExample from './Popover';
import TooltipExample from './Tooltip';

export const placements = [
  'auto-start',
  'auto',
  'auto-end',
  'top-start',
  'top',
  'top-end',
  'right-start',
  'right',
  'right-end',
  'bottom-start',
  'bottom',
  'bottom-end',
  'left-start',
  'left',
  'left-end',
];

type SelectFormProps = { options: string[]; defaultValue?: string; onChange: (value: string) => void };

export function Select({ options, defaultValue, onChange }: SelectFormProps) {
  const [value, setValue] = useState(defaultValue);
  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    setValue(e.currentTarget.value);
    onChange(e.currentTarget.value);
  };

  return (
    <select className="form-select form-select-sm" onChange={handleChange} value={value}>
      {options.map((option) => (
        <option key={option} value={option} children={option} />
      ))}
    </select>
  );
}

function Tooltips() {
  return (
    <div className="container">
      <h2>SKDF Tooltip</h2>
      <TooltipExample />
      <hr className="my-5" />
      <h2>SKDF Popover</h2>
      <PopoverExample />
    </div>
  );
}

export default Tooltips;
