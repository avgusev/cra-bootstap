/* eslint-disable @typescript-eslint/no-explicit-any */
import { Accordion } from 'react-bootstrap';

import PlainTable from '../../../features/DetailedView/components/Block/PlainTable';
import { FieldValue } from '../../../features/DetailedView/components/CommonBlock/FieldValue';
import { vehicleTableMeta, participantsTableMeta } from '../consts';

const ParticipantsTemplate = (props: any) => {
  const fields = props.commonInfo?.fields.reduce((accumulator: any, field: any) => {
    accumulator = { ...accumulator, [field.code]: field };
    return accumulator;
  }, {});

  const { withVehicles, withoutVehicles } = props;
  const hasParticipantsWithVehicles = withVehicles && withVehicles.length > 0;
  const hasParticipantsWithoutVehicles = withoutVehicles && withoutVehicles.length > 0;

  return (
    <>
      <div className="row">
        <div className="mb-4 col-3">
          <div className="form-label">{fields.TS_AMOUNT.title}</div>
          <FieldValue field={fields.TS_AMOUNT} />
        </div>
        <div className="mb-4 col-3">
          <div className="form-label">{fields.PEOPLE_AMOUNT.title}</div>
          <FieldValue field={fields.PEOPLE_AMOUNT} />
        </div>
        <div className="mb-4 col-3">
          <div className="form-label">{fields.DEAD.title}</div>
          <FieldValue field={fields.DEAD} />
        </div>
        <div className="mb-4 col-3">
          <div className="form-label">{fields.WOUNDED.title}</div>
          <FieldValue field={fields.WOUNDED} />
        </div>
      </div>
      {hasParticipantsWithVehicles && (
        <div className="row">
          <div className="h4">Участники, связанные с ТС</div>
          <Accordion flush alwaysOpen>
            {withVehicles.map((item: any) => {
              const { vehicle, participants } = item;
              return (
                <Accordion.Item eventKey={`#block-${vehicle.hash}`} key={vehicle.hash}>
                  <Accordion.Header className="mt-4">
                    <span className="h4 mb-0" style={{ marginLeft: '0.75rem' }}>
                      ТС №{vehicle.number.value}
                    </span>
                  </Accordion.Header>
                  <Accordion.Body>
                    <div className="row">
                      <div className="h5">Транспортное средство</div>
                      <div className="overflow-auto">
                        <PlainTable data={[vehicle]} metadata={vehicleTableMeta} editMode={false} />
                      </div>
                    </div>
                    <div className="row">
                      <div className="h5">Участники</div>
                      <div className="overflow-auto">
                        <PlainTable data={participants} metadata={participantsTableMeta} editMode={false} />
                      </div>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              );
            })}
          </Accordion>
        </div>
      )}
      {hasParticipantsWithoutVehicles && (
        <div className="row">
          <div className="h4">Участники, не связанные с ТС</div>
          <Accordion flush alwaysOpen>
            {withoutVehicles.map((participant: any) => {
              return (
                <Accordion.Item eventKey={`#block-${participant.hash}`} key={participant.hash}>
                  <Accordion.Header className="mt-4">
                    <span className="h4 mb-0" style={{ marginLeft: '0.75rem' }}>
                      Участник №{participant.number.value}
                    </span>
                  </Accordion.Header>
                  <Accordion.Body>
                    <div className="row">
                      <div className="overflow-auto">
                        <PlainTable data={[participant]} metadata={participantsTableMeta} editMode={false} />
                      </div>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              );
            })}
          </Accordion>
        </div>
      )}
    </>
  );
};

export default ParticipantsTemplate;
