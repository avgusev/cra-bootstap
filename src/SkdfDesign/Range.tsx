import { useState } from 'react';
import InputRange, { Pair } from '../components/InputRange';

function Range() {
  const [valueRange, setValueRange] = useState<Pair>([undefined, undefined]);

  return (
    <div className="mx-auto w-75">
      <h2>Range</h2>

      <div className="row">
        <div className="col-lg-3">
          <InputRange
            id="example"
            label="InputRange Required"
            min={0}
            max={100}
            step={0.5}
            minRequired
            maxRequired
            value={valueRange}
            onChange={(value) => setValueRange(value)}
          />
        </div>
        <div className="col-lg-3">
          <InputRange
            id="example"
            label="InputRange NoRequired"
            min={0}
            max={100}
            step={0.5}
            value={valueRange}
            onChange={(value) => setValueRange(value)}
          />
        </div>
      </div>

      <div className="col-9">{JSON.stringify(valueRange, null, 2)}</div>

      <div className="row">
        <form className="col-lg-3">
          <InputRange id="default" label="Label" min={0} max={100} />
        </form>
        <form className="col-lg-3">
          <InputRange id="defaultValue" label="Label" min={0} max={100} value={[10, 100]} />
        </form>
        <form className="col-lg-3">
          <InputRange id="disabled" label="Label" disabled min={0} max={100} />
        </form>
        <form className="col-lg-3">
          <InputRange id="invalid" label="Label" min={0} max={100} className="is-invalid bg-gradient pe-3" />
        </form>
      </div>
    </div>
  );
}

export default Range;
