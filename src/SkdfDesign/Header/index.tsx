import SkdfIcon from '../../components/SkdfIcon';
import RoadCardHeader from './RoadCardHeader';
import RoadCardHeaderEdit from './RoadCardHeaderEdit';
import RoadsHeader from './RoadsHeader';

export function GoBack({ href = '', text = '' }) {
  return (
    <nav>
      <ol className="breadcrumb mb-0 mt-1">
        <li className="breadcrumb-item">
          <a href={href}>
            <SkdfIcon name="arrow-left" width={16} height={16} />
            {text}
          </a>
        </li>
      </ol>
    </nav>
  );
}

function Header() {
  return (
    <>
      <RoadsHeader />
      <hr className="m-0" />
      <RoadCardHeader />
      <hr className="m-0" />
      <RoadCardHeaderEdit />
      <hr className="m-0" />
    </>
  );
}

export default Header;
