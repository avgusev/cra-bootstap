import { useState } from 'react';
import { Accordion } from 'react-bootstrap';
import CheckSelectTree from '../components/CheckSelectTree';
import SkdfIcon from '../components/SkdfIcon';
import { optionsTree } from './mock/checkboxTree';

function CheckSelectsTree() {
  const [valuesTree, setValuesTree] = useState<string[]>(['16032473']);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-9">
          <Accordion defaultActiveKey="0" alwaysOpen={false} flush>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <h4 className="mb-0">
                  Регион Tree
                  {valuesTree.length > 0 && (
                    <SkdfIcon
                      name="dot"
                      className="text-danger"
                      onClick={(e) => {
                        e.stopPropagation();
                        setValuesTree([]);
                      }}
                    />
                  )}
                </h4>
              </Accordion.Header>
              <Accordion.Body>
                <CheckSelectTree
                  options={optionsTree}
                  value={valuesTree}
                  search
                  maxHeight="30rem"
                  placeholder="Поиск"
                  disabled={false}
                  getOptionValue={(option) => String(option.id)}
                  getOptionLabel={(option) => option.text}
                  getOptionChildren={(option) => option.children}
                  onChange={setValuesTree}
                />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
        <div className="col-3">{JSON.stringify(valuesTree, null, 2)}</div>
      </div>
    </div>
  );
}

export default CheckSelectsTree;
