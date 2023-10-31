import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import { FormControl, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Button from '../../../components/Button';
import Modal from '../../../components/Modal';
import { PresetStore } from '../store/presetStore';

function PresetModal({ presetStore }: { presetStore: PresetStore }) {
  return (
    <Modal
      show={presetStore.showSaveFilterModal}
      onHide={() => presetStore.setShowSaveFilterModal(false)}
      header={<h3 className="mb-0">Новая фильтрация</h3>}
      body={
        <div className="py-3">
          <OverlayTrigger
            show={Boolean(presetStore.presetError)}
            placement="right-start"
            popperConfig={{ modifiers: [{ name: 'offset', options: { offset: [-14, 4] } }] }}
            overlay={<Tooltip>{presetStore.presetError}</Tooltip>}
          >
            <FormControl
              size="sm"
              placeholder="Название фильтрации"
              autoFocus
              className={classNames({ 'is-invalid': Boolean(presetStore.presetError) })}
              onChange={(e) => presetStore.setPresetInputValue(e.target.value)}
            />
          </OverlayTrigger>
        </div>
      }
      footer={
        <>
          <Button variant="stroke" onClick={() => presetStore.setShowSaveFilterModal(false)} children="Отменить" />
          <Button
            disabled={presetStore.presetInputValue.length < 1}
            variant="primary"
            onClick={() => presetStore.addPreset()}
            children="Сохранить"
          />
        </>
      }
    />
  );
}

export default observer(PresetModal);
