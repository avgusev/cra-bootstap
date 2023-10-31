import { useNavigate, createSearchParams } from 'react-router-dom';
import SkdfIcon from '../../../components/SkdfIcon';
import Autocomplete from '../../../components/Autocomplete';

import classes from '../MainPage.module.scss';

import { MainStore } from '../store';
import { observer } from 'mobx-react-lite';

function SearchMap({ mainStore }: { mainStore: MainStore }) {
  const navigate = useNavigate();

  return (
    <div className={classes.searchMapBlock}>
      <div className={classes.searchMapGradient} />
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-lg-7 col-sm-12 px-3">
            <div className="position-relative d-grid text-center gap-3">
              <h1 className="mb-0">Система контроля дорожных фондов</h1>
              <span>
                Государственная информационная система для получения информации о дорожной деятельности в Российской
                Федерации и взаимодействия всех её участников
              </span>
            </div>
          </div>
        </div>
        <div className="row justify-content-md-center">
          <div className="col-lg-7 col-sm-12 px-3 position-relative" style={{ maxWidth: '41rem' }}>
            <Autocomplete
              hasFooter
              options={mainStore.searchOptions}
              isLoading={mainStore.isSearchLoading}
              placeholder="Поиск по названию, идентификатору или учётному номеру дороги"
              className="mt-4 text-black text-start"
              getOptionLabel={(option) => option.text}
              onInputChange={(textSearch) => mainStore.setTextSearch(textSearch)}
              onSelectValue={(selectOption) => navigate(`/roads/${selectOption.id}`)}
              onShowAll={(textSearch) =>
                navigate({
                  pathname: '/roads',
                  search: createSearchParams({ textSearch }).toString(),
                })
              }
              renderItem={(optionLabel) => (
                <div className="d-flex align-items-start pt-2 pb-2 ps-2.5">
                  <SkdfIcon name="road" height={22} width={22} className="pe-2.5 text-placeholder" />
                  {optionLabel}
                </div>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default observer(SearchMap);
