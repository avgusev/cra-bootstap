import { useRef } from 'react';
import Button, { ButtonVariant } from '../components/Button';
import SkdfIcon from '../components/SkdfIcon';

function SkdfButtonShowcase() {
  const iconName = 'plug';
  const buttonRef = useRef<HTMLButtonElement>(null);

  function handleClick() {
    if (buttonRef.current) {
      buttonRef.current.disabled = !buttonRef.current.disabled;
    }
  }

  const btnVariants = (variant: ButtonVariant, size?: 'sm' | 'lg') => (
    <>
      <p>
        <Button variant={variant} size={size}>
          Button
        </Button>{' '}
        <Button variant={variant} size={size} isLoading>
          Button
        </Button>{' '}
        <Button variant={variant} size={size} isLoading disabled>
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
        <Button variant={variant} size={size} icon={iconName}>
          Button
        </Button>{' '}
        <Button variant={variant} size={size} icon={iconName} isLoading>
          Button
        </Button>{' '}
        <Button variant={variant} size={size} icon={<SkdfIcon name={iconName} />} isLoading disabled>
          Disabled
        </Button>{' '}
        <Button variant={variant} size={size} icon={<SkdfIcon name={iconName} />} active>
          Active
        </Button>{' '}
        <Button variant={variant} size={size} icon={<SkdfIcon name={iconName} />} disabled>
          Button
        </Button>{' '}
      </p>
      <p>
        <Button variant={variant} size={size} icon={iconName} />{' '}
        <Button variant={variant} size={size} icon={iconName} isLoading />{' '}
        <Button variant={variant} size={size} icon={iconName} isLoading disabled />{' '}
        <Button variant={variant} size={size} icon={iconName} active />{' '}
        <Button variant={variant} size={size} icon={iconName} disabled />{' '}
        <Button variant={variant} size={size}>
          1
        </Button>{' '}
        <Button variant={variant} size={size} isLoading>
          1
        </Button>{' '}
        <Button variant={variant} size={size} isLoading disabled>
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
      <h2>SkdfButtonShowcase</h2>
      <section>
        <h3>skdf-primary</h3>
        {btnVariants('primary')}
        <h3>skdf-primary sm</h3>
        {btnVariants('primary', 'sm')}
        <h3>skdf-secondary</h3>
        {btnVariants('secondary')}
        <h3>skdf-secondary sm</h3>
        {btnVariants('secondary', 'sm')}
        <h3>skdf-stroke</h3>
        {btnVariants('stroke')}
        <h3>skdf-stroke sm</h3>
        {btnVariants('stroke', 'sm')}
        <h3>skdf-ghost</h3>
        {btnVariants('ghost')}
        <h3>skdf-function</h3>
        {btnVariants('function')}
      </section>
      <div>
        <h3>skdf-button refs</h3>
        <p>
          <Button variant="primary" onClick={handleClick}>
            Disable Ref
          </Button>{' '}
          <Button ref={buttonRef} variant="primary">
            Referred Button
          </Button>
        </p>
      </div>
    </>
  );
}

export default SkdfButtonShowcase;
