import { observer } from 'mobx-react-lite';
import Button from '../../../../components/Button';
import { BlockResponse, BlockStore } from '../../types';
import ErrorBoundary from '../ErrorBoundary';
import PlainTable from './PlainTable';
import type { EditFieldModalStore } from '../../store';

type BlockProps = {
  block: BlockStore;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customTemplate?: (props: any) => JSX.Element;
  editMode: boolean;
  editFieldModalStore: EditFieldModalStore;
};

function Block({ block, name, customTemplate, editMode, editFieldModalStore }: BlockProps) {
  const { data, metadata } = block.data as BlockResponse;
  const dataIsArray = Array.isArray(data);

  const { openModal } = editFieldModalStore;

  return (
    <ErrorBoundary>
      {dataIsArray ? (
        <>
          <div className="table-responsive" style={{ maxHeight: '30rem' }}>
            <PlainTable
              metadata={metadata}
              data={data}
              editMode={editMode}
              block={block}
              editFieldModalStore={editFieldModalStore}
            />
          </div>
          {editMode ? (
            <Button variant="function" icon="plus" onClick={() => openModal(name, true, block, undefined)}>
              Добавить
            </Button>
          ) : null}
        </>
      ) : customTemplate ? (
        customTemplate({ ...block.data, name })
      ) : (
        <>Что-то пошло не так</>
      )}
    </ErrorBoundary>
  );
}

export default observer(Block);
