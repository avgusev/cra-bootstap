import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';

import SideMenuLayout from '../../components/SideMenuLayout';
import CommonBlock from './components/CommonBlock';
import CollapseLoading from '../../components/CollapseLoading';

import { CardList, DetailedViewStore, NavigationKeys } from './types';
import Block from './components/Block';
import TemplatedModal from '../TemplatedModal';
import SideMenu from '../SideMenu';
import Spinner from '../../components/Spinner';
import Training from '../Training';
import EditPanel from './components/EditMode/EditPanel';
import ConfirmModal from './components/EditMode/ConfirmModal';
import EditModal from './components/EditModal';

export type Image = {
  id: string;
  contentType: string;
  isTemp: boolean;
  length: number;
  name: string;
};

type DetailedViewProps = {
  id: string | undefined;
  cardList: CardList;
  navKeys: NavigationKeys;
  header: JSX.Element;
  storeInstance: DetailedViewStore;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customTemplates?: Record<string, (props: any) => JSX.Element>;
  isMap?: boolean;
  images?: Image[];
};

function DetailedView({
  id,
  storeInstance,
  cardList,
  navKeys,
  header,
  customTemplates,
  isMap,
  images,
}: DetailedViewProps) {
  const { fetchState, fields, sections, commonSection, updateBlock, editMode, editFieldModalStore } = storeInstance;

  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if (id) {
      storeInstance.fetchEntity(id);
    }
  }, [storeInstance, id]);

  return fetchState === 'done' ? (
    <SideMenuLayout
      menuHeader={
        <div className="pt-4 pb-2 px-4">
          <Training id="passport" step={0}>
            <input
              type="search"
              className="form-control"
              placeholder="Поиск"
              spellCheck={false}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Training>
        </div>
      }
      menu={
        <SideMenu
          navKeys={navKeys}
          searchText={searchText}
          commonSection={commonSection}
          additionalSection={sections}
          updateBlock={updateBlock}
        />
      }
    >
      <div id="block-common">{header}</div>
      <div className="container-fluid ps-4 pt-3">
        {id && Object.keys(fields).length > 0 && (
          <CommonBlock
            fields={fields}
            objectId={id}
            template={cardList}
            isMap={isMap}
            images={images}
            store={storeInstance}
          />
        )}
        {commonSection?.blocks.map((block, index) => (
          <div key={block.id} id={`block-common-${block.id}`} className="row">
            <div className="col">
              <CollapseLoading
                in={block.isOpen}
                isLoading={block.isLoading}
                header={block.name}
                onClick={(isOpen) => {
                  updateBlock('common', index, isOpen, block);
                }}
              >
                <>
                  {block.data && (
                    <Block
                      editMode={editMode}
                      block={block}
                      name={block.name}
                      customTemplate={customTemplates && customTemplates[block.name]}
                      editFieldModalStore={editFieldModalStore}
                    />
                  )}
                </>
              </CollapseLoading>
            </div>
          </div>
        ))}
        {sections &&
          navKeys.map(
            (key) =>
              sections[key] && (
                <div key={key}>
                  <h2 className="mb-4">{sections[key].name}</h2>
                  {sections[key].blocks.map((block, index) => (
                    <div key={block.id} id={`block-${key}-${block.id}`} className="row">
                      <div className="col">
                        <CollapseLoading
                          in={block.isOpen}
                          isLoading={block.isLoading}
                          header={block.name}
                          onClick={(isOpen) => {
                            updateBlock(key, index, isOpen, block);
                          }}
                        >
                          <>
                            {block.data && (
                              <Block
                                editMode={editMode}
                                block={block}
                                name={block.name}
                                customTemplate={customTemplates && customTemplates[block.name]}
                                editFieldModalStore={editFieldModalStore}
                              />
                            )}
                          </>
                        </CollapseLoading>
                      </div>
                    </div>
                  ))}
                </div>
              )
          )}
      </div>
      {storeInstance.editMode ? <EditPanel storeInstance={storeInstance} /> : null}
      <TemplatedModal />
      <ConfirmModal />
      <EditModal editFieldModalStore={editFieldModalStore} />
    </SideMenuLayout>
  ) : (
    <div className="position-absolute top-50 start-50 translate-middle">
      <Spinner size={48} className="text-primary" />
    </div>
  );
}

export default observer(DetailedView);
export { CommonBlock };
