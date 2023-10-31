import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import { ReactNode } from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import Button from '../../components/Button';
import CloseButton from '../../components/CloseButton';
import { trainingStore } from './store';

const popperConfig = {
  modifiers: [
    { name: 'offset', options: { offset: [-10, 20] } },
    {
      name: 'arrow',
      options: {
        padding: 10,
      },
    },
  ],
};

type TrainingProps = React.HTMLAttributes<HTMLElement> & {
  id: string;
  step: number;
  children: ReactNode;
  isNoShadow?: boolean;
  className?: string;
};

function Training({ id, step, children, isNoShadow = false, className, ...props }: TrainingProps) {
  const { trainingStep, trainings, isOpenTrening, hideTrening, updateStep } = trainingStore;
  const show = isOpenTrening.length > 0 && trainingStep === step && id === isOpenTrening;

  const renderPopover =
    show && trainings && trainings.steps ? (
      <Popover className="skdf-popover-lg w-100">
        <div className="d-flex justify-content-between pt-4 px-4">
          {show && trainings && trainings.steps && (
            <div>
              <h3 className="m-0">{trainings?.steps[step].title || ''}</h3>
              {trainings.steps.length > 1 && (
                <span className="small text-muted">
                  Шаг {step + 1} из {trainings.steps.length}
                </span>
              )}
            </div>
          )}

          <CloseButton onClick={() => hideTrening()} />
        </div>

        <Popover.Body>
          <div>{(trainings && trainings.steps[step].text) || ''}</div>
          <div className="d-flex justify-content-between pt-3 pb-2">
            {trainings.steps.length > 1 ? (
              <>
                <Button variant="function" className="p-0" onClick={() => hideTrening()}>
                  Завершить обучение
                </Button>

                <div className="d-flex gap-2">
                  <Button
                    disabled={step === 0}
                    variant="stroke"
                    onClick={() => {
                      step === 0 ? hideTrening() : updateStep(step - 1);
                    }}
                  >
                    Назад
                  </Button>
                  <Button
                    onClick={() => {
                      trainings && step === trainings.steps.length - 1 ? hideTrening() : updateStep(step + 1);
                    }}
                  >
                    {step === trainings.steps.length - 1 ? 'Закрыть' : 'Далее'}
                  </Button>
                </div>
              </>
            ) : (
              <Button className="ms-auto" onClick={() => hideTrening()}>
                Закрыть
              </Button>
            )}
          </div>
        </Popover.Body>
      </Popover>
    ) : (
      <Popover></Popover>
    );

  return (
    <>
      <OverlayTrigger
        popperConfig={popperConfig}
        trigger="click"
        placement="auto-start"
        show={show}
        overlay={renderPopover}
      >
        <div
          className={classNames(className, {
            'zindex-tooltip bg-white position-relative': show,
            'training-shadow': show && !isNoShadow,
          })}
          style={{ ...props.style }}
        >
          {children}
        </div>
      </OverlayTrigger>
      <div className={show ? 'modal-backdrop show' : 'd-none'} onClick={() => hideTrening()} />
    </>
  );
}

export default observer(Training);
