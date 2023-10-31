import { formatNumber, pluralize, formatKilometers } from '../../../utils';

function RoadsCountAndLength({ count, length }: { count: number; length: number }) {
  return (
    <span className="me-3">
      <span className="text-nowrap">{formatNumber(count)}</span>
      {` ${pluralize({ count: count, one: 'дорога', few: 'дороги', many: 'дорог' })} общей протяжённостью `}
      <span className="text-nowrap">{formatKilometers(length)}</span>
    </span>
  );
}
export default RoadsCountAndLength;
