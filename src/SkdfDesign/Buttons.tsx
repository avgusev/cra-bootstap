import { Button } from 'react-bootstrap';
import SkdfIcon from '../components/SkdfIcon';
import Spinner from '../components/Spinner';

function Buttons() {
  const iconName = 'plug';

  const btnVariants = (variant?: string, size?: 'sm' | 'lg') => (
    <>
      <p>
        <Button variant={variant} size={size}>
          Button
        </Button>{' '}
        <Button variant={variant} size={size} className="is-loading spinner">
          Button
        </Button>{' '}
        <Button variant={variant} size={size} className="is-loading spinner" disabled>
          Button
        </Button>{' '}
        <Button variant={variant} size={size} active>
          Active
        </Button>{' '}
        <Button variant={variant} size={size} disabled>
          Button
        </Button>{' '}
        <Button variant={variant} size={size} disabled>
          Disabled
        </Button>{' '}
        <Button variant={variant} size={size} className="btn-icon">
          <SkdfIcon name={iconName} />
          Button
        </Button>{' '}
        <Button variant={variant} size={size} className="btn-icon is-loading">
          <Spinner />
          Button
        </Button>{' '}
        <Button variant={variant} size={size} className="btn-icon is-loading" disabled>
          <Spinner />
          Disabled
        </Button>{' '}
        <Button variant={variant} size={size} className="btn-icon" active>
          <SkdfIcon name={iconName} />
          Active
        </Button>{' '}
        <Button variant={variant} size={size} className="btn-icon" disabled>
          <SkdfIcon name={iconName} />
          Button
        </Button>{' '}
      </p>
      <p>
        <Button variant={variant} size={size} className="btn-icon">
          <SkdfIcon name={iconName} />
        </Button>{' '}
        <Button variant={variant} size={size} className="btn-icon is-loading">
          <Spinner />
        </Button>{' '}
        <Button variant={variant} size={size} className="btn-icon is-loading" disabled>
          <Spinner />
        </Button>{' '}
        <Button variant={variant} size={size} className="btn-icon" active>
          <SkdfIcon name={iconName} />
        </Button>{' '}
        <Button variant={variant} size={size} className="btn-icon" disabled>
          <SkdfIcon name={iconName} />
        </Button>{' '}
        <Button variant={variant} size={size}>
          1
        </Button>{' '}
        <Button variant={variant} size={size} className="is-loading spinner">
          1
        </Button>{' '}
        <Button variant={variant} size={size} className="is-loading spinner" disabled>
          1
        </Button>{' '}
        <Button variant={variant} size={size} active>
          1
        </Button>{' '}
        <Button variant={variant} size={size} disabled>
          1
        </Button>{' '}
        <Button variant={variant} size={size}>
          99
        </Button>{' '}
        <Button variant={variant} size={size} active>
          99
        </Button>{' '}
        <Button variant={variant} size={size} disabled>
          99
        </Button>{' '}
      </p>
    </>
  );
  return (
    <>
      <section>
        <h2>SKDF Buttons</h2>
        <h3>skdf-primary</h3>
        {btnVariants('skdf-primary')}
        <h3>skdf-primary sm</h3>
        {btnVariants('skdf-primary', 'sm')}
        <h3>skdf-secondary</h3>
        {btnVariants('skdf-secondary')}
        <h3>skdf-secondary sm</h3>
        {btnVariants('skdf-secondary', 'sm')}
        <h3>skdf-stroke</h3>
        {btnVariants('skdf-stroke')}
        <h3>skdf-stroke sm</h3>
        {btnVariants('skdf-stroke', 'sm')}
        <h3>skdf-ghost</h3>
        {btnVariants('skdf-ghost')}
        <h3>skdf-function</h3>
        {btnVariants('skdf-function')}
        <h3>btn-tag sm</h3>
        {btnVariants('tag', 'sm')}
      </section>
      <hr />
      <div>
        <Button variant="skdf-primary">Link</Button>&nbsp;
        <Button variant="link">Link</Button>&nbsp;
        <a href="#/buttons" className="btn btn-skdf-secondary">
          Link
        </a>
      </div>
      <hr />
      <div>
        <Button variant="link" className="d-inline-flex gap-2">
          <SkdfIcon name={iconName} /> Button btn btn-link flex
        </Button>{' '}
        <Button href="#/buttons" variant="link" className="d-inline-flex gap-2">
          <SkdfIcon name={iconName} /> a btn btn-link flex
        </Button>{' '}
        <Button variant="link" className="d-inline-flex gap-2" size="sm">
          <SkdfIcon name={iconName} /> Button btn btn-link flex sm
        </Button>{' '}
        <Button href="#/buttons" variant="link" className="d-inline-flex gap-2" size="sm">
          <SkdfIcon name={iconName} /> a btn btn-link flex sm
        </Button>{' '}
      </div>
      <hr />
      <div>
        <Button variant="link" className="p-0 d-inline-flex gap-2">
          <SkdfIcon name={iconName} /> Button btn btn-link p-0 flex
        </Button>{' '}
        <Button href="#/buttons" variant="link" className="p-0 d-inline-flex gap-2">
          <SkdfIcon name={iconName} /> a btn btn-link p-0 flex
        </Button>{' '}
        <a href="#/buttons" className="d-inline-flex gap-2">
          <SkdfIcon name={iconName} /> Link d-inline-flex gap-2
        </a>
      </div>
      <hr />
      <div>
        <Button variant="link" className="p-0">
          <SkdfIcon name={iconName} /> Button btn btn-link p-0
        </Button>{' '}
        <Button href="#/buttons" variant="link" className="p-0">
          <SkdfIcon name={iconName} /> a btn btn-link p-0
        </Button>{' '}
        <a href="#/buttons">
          <SkdfIcon name={iconName} /> Link
        </a>
      </div>
      <hr />
      <h3>btn-tag</h3>
      <p>
        <Button variant="tag" size="sm">
          Текст
          <span className="tag-counter">11</span>
        </Button>{' '}
        <Button variant="tag" className="active" size="sm">
          Текст
          <span className="tag-counter">11</span>
        </Button>{' '}
        <Button variant="tag" size="sm" disabled>
          Текст
          <span className="tag-counter">11</span>
        </Button>{' '}
        <Button variant="tag" className="active" size="sm" disabled>
          Текст
          <span className="tag-counter">11</span>
        </Button>
      </p>
      <hr className="my-5" />
      <div className="mb-3 position-relative">
        <input type="checkbox" className="btn-check" id="btn-skdf-secondary" />
        <label className="btn btn-skdf-secondary" htmlFor="btn-skdf-secondary">
          Single toggle
        </label>
      </div>
      <div className="mb-3 position-relative">
        <input type="checkbox" className="btn-check" id="btn-skdf-stroke" />
        <label className="btn btn-skdf-stroke" htmlFor="btn-skdf-stroke">
          Single toggle
        </label>
      </div>
      <div className="mb-3 position-relative">
        <input type="checkbox" className="btn-check" id="btn-tag" />
        <label className="btn btn-tag" htmlFor="btn-tag">
          Single toggle
        </label>
      </div>
      <hr className="my-5" />
    </>
  );
}

export default Buttons;
