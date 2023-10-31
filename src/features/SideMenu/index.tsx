import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Nav } from 'react-bootstrap';
import CollapseLoading from '../../components/CollapseLoading';
import { Block, NavigationKeys, Section } from '../DetailedView/types';

import { sideMenuStoreInstance } from './store';

type SideMenuProps = {
  searchText: string;
  commonSection: Section;
  additionalSection: Record<string, Section>;
  navKeys: NavigationKeys;
  updateBlock: (key: string, index: number, isOpen: boolean | undefined, block: Block) => void;
};

function SideMenu({ searchText, commonSection, additionalSection, navKeys, updateBlock }: SideMenuProps) {
  const { init, clear, switches, toggleSwitch, setSearchText, filteredCommonBlocks, filteredAdditionalBlocks } =
    sideMenuStoreInstance;

  useEffect(() => {
    init(commonSection, additionalSection, navKeys);

    return () => clear();
  }, [additionalSection, navKeys, commonSection, init, clear]);

  useEffect(() => {
    setSearchText(searchText);
  }, [searchText, setSearchText]);

  const markText = (text: string) => {
    if (!searchText) return text;

    const highlightedLabel = text.replace(
      new RegExp(searchText, 'gi'),
      (highlighted: string) => `<mark>${highlighted}</mark>`
    );

    return <span dangerouslySetInnerHTML={{ __html: highlightedLabel }} />;
  };

  return (
    <div className="pt-2 pe-4 pb-0 ps-2.5">
      <Nav variant="pills" className="skdf flex-column">
        <a className="nav-link" href={'#block-common'}>
          Основные сведения
        </a>
      </Nav>
      <Nav variant="pills" className="skdf flex-column">
        {filteredCommonBlocks?.map((block: Block, index: number) => (
          <a
            className="nav-link"
            key={block.id}
            href={`#block-common-${block.id}`}
            onClick={() => updateBlock('common', index, false, block)}
          >
            {markText(block.name)}
            <span className="text-caption ms-2">{block.itemCount}</span>
          </a>
        ))}
      </Nav>

      {filteredAdditionalBlocks &&
        switches &&
        navKeys?.map(
          (key, index) =>
            filteredAdditionalBlocks[key] && (
              <div className="mt-4" key={index}>
                <CollapseLoading
                  in={switches[key]}
                  onClick={() => toggleSwitch(key)}
                  header={
                    <span className="h4 mb-0" style={{ marginLeft: '0.75rem' }}>
                      {filteredAdditionalBlocks[key].name}
                    </span>
                  }
                >
                  <>
                    {filteredAdditionalBlocks[key].blocks?.map((block: Block, index: number) => (
                      <Nav variant="pills" className="skdf flex-column" key={index}>
                        <a
                          className="nav-link"
                          key={block.id}
                          href={`#block-${key}-${block.id}`}
                          onClick={() => updateBlock(key, index, false, block)}
                        >
                          {markText(block.name)}
                          <span className="text-caption ms-2">{block.itemCount}</span>
                        </a>
                      </Nav>
                    ))}
                  </>
                </CollapseLoading>
              </div>
            )
        )}
    </div>
  );
}

export default observer(SideMenu);
