import Badge from '../components/Badge';
import Button from '../components/Button';
import SkdfIcon from '../components/SkdfIcon';

function Badges() {
  const counters = ['', '2', '7', '9', '99', '99+', '999', 'A', 'text'];
  const countersButton = ['', '9', '99'];

  return (
    <>
      <h2>SKDF Badges</h2>

      <h3>Badge</h3>
      <p className="bg-primary p-2">
        {counters.map((counter) => (
          <Badge>{counter}</Badge>
        ))}
      </p>

      <h3>Round</h3>
      <p className="bg-primary p-2">
        {counters.map((counter) => (
          <Badge round>{counter}</Badge>
        ))}
      </p>

      <h3>btn</h3>
      <div className="d-flex gap-2">
        {countersButton.map((counter) => (
          <Button className="btn-icon">
            Button
            <Badge round>{counter}</Badge>
          </Button>
        ))}
      </div>

      <h3>btn-sm</h3>
      <div className="d-flex gap-2">
        {countersButton.map((counter) => (
          <Button size="sm" className="btn-icon">
            Button
            <Badge round>{counter}</Badge>
          </Button>
        ))}
      </div>

      <h3>btn-icon</h3>
      <div className="d-flex gap-2">
        {countersButton.map((counter) => (
          <Button icon="plug">
            Button
            <Badge round>{counter}</Badge>
          </Button>
        ))}
      </div>

      <h3>btn-icon-sm</h3>
      <div className="d-flex gap-2">
        {countersButton.map((counter) => (
          <Button size="sm" icon="plug">
            Button
            <Badge round>{counter}</Badge>
          </Button>
        ))}
      </div>

      <h3>icon</h3>
      <p>
        {counters.map((counter) => (
          <span className="d-inline-block position-relative me-4">
            <SkdfIcon name="plug" />
            <Badge counter>{counter}</Badge>
          </span>
        ))}
      </p>

      <p>
        <span className="d-inline-block position-relative me-4">
          <SkdfIcon name="bell" className="text-caption" />
          <Badge counter>7</Badge>
        </span>
        <span className="d-inline-block position-relative me-4">
          <SkdfIcon name="bell" className="text-caption" />
          <Badge counter>77</Badge>
        </span>
        <span className="d-inline-block position-relative me-4">
          <SkdfIcon name="bell" className="text-caption" />
          <Badge counter>777</Badge>
        </span>
      </p>

      <div className="d-inline-block p-2" style={{ backgroundColor: '#e2eaf6' }}>
        <span className="d-inline-block position-relative m-2">
          <SkdfIcon name="projects" className="text-primary" />
          <Badge counter>2</Badge>
        </span>
      </div>
      <div className="d-inline-block p-2" style={{ backgroundColor: '#F2F3F3' }}>
        <span className="d-inline-block position-relative m-2">
          <SkdfIcon name="projects" className="text-caption" />
          <Badge counter>2</Badge>
        </span>
      </div>

      <hr className="p-5" />
    </>
  );
}

export default Badges;
