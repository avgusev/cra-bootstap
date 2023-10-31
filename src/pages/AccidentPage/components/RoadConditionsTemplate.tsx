/* eslint-disable @typescript-eslint/no-explicit-any */

import { FieldValue } from '../../../features/DetailedView/components/CommonBlock/FieldValue';

const RoadConditionsTemplate = (props: any) => {
  const fields = props.fields.reduce((accumulator: any, field: any) => {
    accumulator = { ...accumulator, [field.code]: field };
    return accumulator;
  }, {});

  return (
    <>
      <div className="row">
        <div className="mb-4 col-4">
          <div className="form-label" title="Объекты улично-дорожной сети на месте ДТП">
            {fields.ON_DTP_OBJECTS.title}
          </div>
          <FieldValue field={fields.ON_DTP_OBJECTS} />
        </div>
        <div className="mb-4 col-8">
          <div className="form-label" title="Объекты улично-дорожной сети вблизи места ДТП">
            {fields.NEAR_DTP_OBJECTS.title}
          </div>
          <FieldValue field={fields.NEAR_DTP_OBJECTS} />
        </div>
        <div className="mb-4 col-4">
          <div className="form-label" title="Недостатки транспортно-эксплуатационного состояния улично-дорожной сети">
            {fields.TRANS_EXPLOAT_PROBLEM.title}
          </div>
          <FieldValue field={fields.TRANS_EXPLOAT_PROBLEM} />
        </div>
        <div className="mb-4 col-8">
          <div className="form-label">{fields.MOVE_FACTORS.title}</div>
          <FieldValue field={fields.MOVE_FACTORS} />
        </div>
        <div className="mb-4 col-4">
          <div className="form-label">{fields.WEATHER_COND.title}</div>
          <FieldValue field={fields.WEATHER_COND} />
        </div>
        <div className="mb-4 col-4">
          <div className="form-label">{fields.ROAD_COND.title}</div>
          <FieldValue field={fields.ROAD_COND} />
        </div>
        <div className="mb-4 col-4">
          <div className="form-label">{fields.LIGHTING.title}</div>
          <FieldValue field={fields.LIGHTING} />
        </div>
        <div className="mb-4 col-4">
          <div className="form-label">{fields.MOVE_CHANGES.title}</div>
          <FieldValue field={fields.MOVE_CHANGES} />
        </div>
      </div>
    </>
  );
};

export default RoadConditionsTemplate;
