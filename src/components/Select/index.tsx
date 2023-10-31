import { FormCheck } from 'react-bootstrap';
import {
  default as ReactSelect,
  Props,
  GroupBase,
  DropdownIndicatorProps,
  ClearIndicatorProps,
  OptionProps,
  components as ReactSelectComponents,
  MultiValueProps,
} from 'react-select';
import classNames from 'classnames';
import SkdfIcon from '../SkdfIcon';

const plug = () => null;

// const NoOptionsMessage = <
//   Option = unknown,
//   IsMulti extends boolean = boolean,
//   Group extends GroupBase<Option> = GroupBase<Option>
// >(
//   props: NoticeProps<Option, IsMulti, Group>
// ) => <components.NoOptionsMessage {...props} children="Не найдено" />;

const DropdownIndicator = <
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: DropdownIndicatorProps<Option, IsMulti, Group>
) => (
  <div className={props.cx({ indicator: true, 'dropdown-indicator': true })}>
    <SkdfIcon name="arrow_down" />
  </div>
);

const ClearIndicator = <
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: ClearIndicatorProps<Option, IsMulti, Group>
) => (
  <ReactSelectComponents.ClearIndicator {...props}>
    <SkdfIcon name="cross" width={22} height={22} />
  </ReactSelectComponents.ClearIndicator>
);

const Option = <
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: OptionProps<Option, IsMulti, Group>
) => (
  <ReactSelectComponents.Option {...props}>
    {props.isMulti && <FormCheck inline readOnly checked={props.isSelected} className="me-2" />}
    {props.children}
  </ReactSelectComponents.Option>
);

const MultiValue = <
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: MultiValueProps<Option, IsMulti, Group>
) => {
  if (props.index !== 0) return null;
  const values = props.getValue();
  if (values.length < 1) return null;
  if (values.length === 1) return <span>{props.children}</span>;

  return <span>{`Выбрано ${values.length}`}</span>;
};

function Select<
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>({ className, components, ...props }: Props<Option, IsMulti, Group>) {
  if (props.closeMenuOnSelect === undefined && props.isMulti) props.closeMenuOnSelect = false;
  if (props.hideSelectedOptions === undefined) props.hideSelectedOptions = false;

  return (
    <ReactSelect
      classNamePrefix="skdf-select"
      theme={(theme) => ({
        ...theme,
        borderRadius: 8,
        spacing: { ...theme.spacing, controlHeight: 40, menuGutter: 0 },
      })}
      {...props}
      className={classNames('skdf-select-container', className)}
      noOptionsMessage={() => 'Не найдено'}
      components={{
        IndicatorSeparator: plug,
        // NoOptionsMessage,
        DropdownIndicator,
        ClearIndicator,
        Option,
        MultiValue,
        ...components,
      }}
    />
  );
}

export default Select;
