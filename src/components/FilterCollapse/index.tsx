import SkdfIcon from '../SkdfIcon';
import CollapseLoading from '../CollapseLoading';

export function FilterCollapseDisabled({ label }: { label: string }) {
  return (
    <div className="mb-4 text-muted d-flex justify-content-between">
      <span className="h4 mb-0">{label}</span>
      <SkdfIcon name="arrow_down" />
    </div>
  );
}

export type FilterCollapseProps = {
  label: string;
  hasValue?: boolean;
  isLoading?: boolean;
  children: React.ReactElement;
  onClear?: () => void;
};

function FilterCollapse({ label, hasValue: isSelect, isLoading, children, onClear }: FilterCollapseProps) {
  return (
    <CollapseLoading
      header={
        <span className="h4 mb-0">
          {label}
          {isSelect && (
            <SkdfIcon
              name="dot"
              className="text-danger"
              onClick={(e) => {
                e.stopPropagation();
                onClear && onClear();
              }}
            />
          )}
        </span>
      }
      isLoading={isLoading}
      iconRight
    >
      {children}
    </CollapseLoading>
  );
}

export default Object.assign(FilterCollapse, { Disabled: FilterCollapseDisabled });
