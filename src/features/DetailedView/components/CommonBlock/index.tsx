import { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import { observer } from 'mobx-react-lite';

import { CardList, DetailedViewStore, FieldStore, ValueElement } from '../../types';
import { organizationStoreInstance, regionStoreInstance } from '../../store';
import { Image } from '../../../DetailedView';
import { fetchBlobImage } from '../../../../filesApi';

import EditableField from './EditableField';
import { trainingStore } from '../../../Training/store';
import { nanoid } from 'nanoid';
import { MapPassport } from 'skdf-gis-component';

type CommonBlockProps = {
  objectId: string;
  fields: Record<string, FieldStore>;
  template: CardList;
  isMap?: boolean;
  images: Image[] | undefined;
  store: DetailedViewStore;
};

function RenderImage({ value }: { value: ValueElement }) {
  const [imageUrl, setImageUrl] = useState<string>();

  const { storageFileId, name } = value;

  useEffect(() => {
    storageFileId && fetchBlobImage(storageFileId).then((blob) => setImageUrl(window.URL.createObjectURL(blob)));
  }, [storageFileId]);

  return imageUrl ? (
    <img src={imageUrl} alt={name} className="w-100 h-100 rounded-1" style={{ objectFit: 'cover' }} />
  ) : null;
}

function CommonBlock({ objectId, fields, template, isMap = true, images, store }: CommonBlockProps) {
  const showOrganizationMiniPassport = useCallback((id: number) => {
    organizationStoreInstance.getOrganizationMiniPassport(id);
  }, []);

  const showRegionMiniPassport = useCallback((id: number) => {
    regionStoreInstance.getRegionMiniPassport(id);
  }, []);

  const getCallbackByType = (head: string) => {
    switch (head) {
      case 'OWNER':
      case 'ROAD_OWNER':
      case 'ORGANIZATION':
        return showOrganizationMiniPassport;
      case 'REGION':
        return showRegionMiniPassport;
      default:
        return undefined;
    }
  };

  const imageBlock = 'PHOTO' in fields;

  return (
    <>
      {images && (
        <div className="row">
          <div className="col-12 mb-4">
            <h3>Фотографии</h3>
            {JSON.stringify(images)}
          </div>
        </div>
      )}
      <div className="row">
        {isMap && (
          <div className="col-4 mb-4">
            {imageBlock ? (
              <>
                {fields['PHOTO'].value?.value && Array.isArray(fields['PHOTO'].value?.value) && (
                  <RenderImage value={fields['PHOTO'].value?.value[0]} />
                )}
              </>
            ) : (
              <div
                className="h-100 w-100 d-flex justify-content-center align-items-end rounded-1 bg-light"
                style={
                  trainingStore.isOpenTrening
                    ? {
                        position: 'relative',
                        zIndex: '-1',
                      }
                    : {}
                }
              >
                {/* <Button
          variant="ghost"
          icon="map"
          className="bg-white mb-3 skdf-shadow-down-16dp"
          onClick={() => navigate(`/map/${roadId}`)}
        >
          Показать на карте
        </Button> */}
                {/* <Link
                  to={`/map/${objectId}`}
                  className="mb-3 btn btn-skdf-ghost btn-icon bg-white skdf-shadow-down-16dp"
                >
                  <SkdfIcon name="map" />
                  {getMapButtonTitle()}
                </Link> */}
                <MapPassport roadId={objectId} isEditGeom={store.editMode} />
              </div>
            )}
          </div>
        )}
        <div className={isMap || imageBlock ? 'col-8 mb-4' : 'col-12 mb-4'}>
          {template[0].map((cardRow, index) => (
            <div key={index} className="row">
              {cardRow.map((cardItem) => {
                const head = typeof cardItem.code === 'string' ? cardItem.code : cardItem.code[0];
                const _f =
                  typeof cardItem.code === 'string' ? fields[cardItem.code] : cardItem.code.map((c) => fields[c]);

                return head === 'ID' ? (
                  <div key={objectId} title={'Номер СКДФ'} className={classNames('mb-4', cardItem.className)}>
                    <div className="form-label">Номер СКДФ</div>
                    {objectId}
                  </div>
                ) : (
                  <EditableField
                    store={store}
                    label={cardItem.title}
                    key={fields[head]?.code || nanoid()}
                    field={_f}
                    className={cardItem.className}
                    onClick={getCallbackByType(head)}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
      {template[1] &&
        template[1].map((cardRow, index) => (
          <div key={index} className="row">
            {cardRow.map((cardItem) => {
              const head = typeof cardItem.code === 'string' ? cardItem.code : cardItem.code[0];
              const _f =
                typeof cardItem.code === 'string' ? fields[cardItem.code] : cardItem.code.map((c) => fields[c]);

              return (
                <EditableField
                  store={store}
                  label={cardItem.title}
                  key={fields[head]?.code || nanoid()}
                  field={_f}
                  className={cardItem.className}
                  onClick={getCallbackByType(head)}
                />
              );
            })}
          </div>
        ))}
    </>
  );
}

export default observer(CommonBlock);
