import { observer } from 'mobx-react-lite';
import Button from '../../../components/Button';
import { notificationStore } from '../store';
import SettingsModal from './SettingsModal';

function Header() {
  return (
    <header className="p-4">
      <div className="d-flex justify-content-between align-items-start gap-2">
        <h1>Уведомления</h1>
        {/* <Button disabled variant="stroke" icon="question" className="flex-shrink-0" children="Помощь" /> */}
      </div>

      <div className="d-sm-flex flex-wrap align-items-center gap-2 mt-3">
        <div className="d-sm-flex me-auto">
          <Button
            variant="function"
            icon="double_check"
            className="me-4"
            children="Прочитать все"
            onClick={() => notificationStore.readAll()}
          />
        </div>
        <div className="d-sm-flex">
          <SettingsModal />
        </div>
      </div>
    </header>
  );
}

export default observer(Header);
