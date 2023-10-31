import { useState } from 'react';
import { Accordion, Collapse } from 'react-bootstrap';
import SkdfIcon from '../components/SkdfIcon';
import CollapseLoading from '../components/CollapseLoading';
import classNames from 'classnames';

function ItemCheckbox() {
  const idRandom = (Math.random() + 1).toString(36).substring(7);
  return (
    <div className="form-check d-flex gap-2 p-0 m-0">
      <input id={idRandom} className="form-check-input" type="checkbox" style={{ margin: '.1875rem' }} />
      <label htmlFor={idRandom} className="form-check-label flex-grow-1">
        Label
      </label>
    </div>
  );
}

function Accordions() {
  const checkboxList = (
    <div className="d-grid overflow-auto gap-3 pb-3" style={{ maxHeight: '150px' }}>
      <ItemCheckbox />
      <ItemCheckbox />
      <ItemCheckbox />
      <ItemCheckbox />
      <ItemCheckbox />
      <ItemCheckbox />
    </div>
  );

  const accordionList = (
    <>
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          <h4 className="mb-0">
            Регион
            <SkdfIcon name="dot" className="text-danger" />
          </h4>
        </Accordion.Header>
        <Accordion.Body className="border-bottom">{checkboxList}</Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header className="p-0">
          <h4 className="mb-0">Агломерация</h4>
        </Accordion.Header>
        <Accordion.Body className="border-bottom">{checkboxList}</Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>
          <h4 className="mb-0">Район</h4>
        </Accordion.Header>
        <Accordion.Body className="border-bottom">{checkboxList}</Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3">
        <Accordion.Header>
          <h4 className="mb-0">Город</h4>
        </Accordion.Header>
        <Accordion.Body className="border-bottom">{checkboxList}</Accordion.Body>
      </Accordion.Item>
    </>
  );

  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handle = () => {
    if (isOpen) {
      setIsOpen(!isOpen);
    } else {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setIsOpen(!isOpen);
      }, 1000);
    }
  };

  return (
    <>
      <div className="container-fluid">
        <h1>
          <a href="https://react-bootstrap.github.io/components/accordion/" target="_blank" rel="noreferrer">
            Accordion
          </a>
        </h1>
        <div className="row">
          <div className="col-3">
            <Accordion defaultActiveKey="0" alwaysOpen={false} flush>
              {accordionList}
            </Accordion>
          </div>

          <div className="col-4">
            <div className="accordion accordion-flush">
              <div className="accordion-item">
                <h2 className={classNames('accordion-header accordion-icon-left', { 'is-loading': isLoading })}>
                  <button className={classNames('accordion-button', { collapsed: !isOpen })} onClick={handle}>
                    <span className="h4 mb-0">Collapse with Loading</span>
                  </button>
                </h2>
                <Collapse in={isOpen}>
                  <div className="accordion-collapse">
                    <div className="accordion-body">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto eum nisi non qui veniam
                      veritatis! Eaque officia qui sequi sint vitae? Aperiam, at culpa doloremque excepturi inventore
                      iusto quae voluptate!
                    </div>
                  </div>
                </Collapse>
              </div>
            </div>
          </div>

          <div className="col-4">
            <CollapseLoading
              header="Collapse with Loading iconRight"
              isLoading={isLoading}
              in={isOpen}
              iconRight
              onClick={!isLoading ? handle : () => null}
            >
              <>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto eum nisi non qui veniam veritatis!
                Eaque officia qui sequi sint vitae? Aperiam, at culpa doloremque excepturi inventore iusto quae
                voluptate!
              </>
            </CollapseLoading>
          </div>
        </div>
      </div>

      <hr className="my-5" />
    </>
  );
}

export default Accordions;
