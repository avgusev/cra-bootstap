import { useState } from 'react';
import Autocomplete from '../components/Autocomplete';
import SkdfIcon from '../components/SkdfIcon';
import { optionsMock } from './mock/autocompleteMock';

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

function AutocompletePage() {
  const [options, setOptions] = useState<typeof optionsMock>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadOptions = (textSearch: string) => {
    setIsLoading(true);
    console.log('запрос к api - ', textSearch);

    sleep(1e3).then(() => {
      setIsLoading(false);
      console.log('ответ от api');

      const newOptions = optionsMock.filter((option) =>
        option.text.toLocaleLowerCase().includes(textSearch.toLocaleLowerCase())
      );

      setOptions(newOptions);
    });
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <h2>Autocomplete</h2>
          <Autocomplete
            options={options}
            isLoading={isLoading}
            placeholder="Поиск дороги по названию, идентификационному номеру"
            getOptionLabel={(option) => option.text}
            onInputChange={(textSearch) => loadOptions(textSearch)}
            onSelectValue={(selectOption) => console.log('selectOption ', selectOption)}
            onShowAll={(textSearch) => console.log('onShowAll ', textSearch)}
            renderItem={(optionLabel) => (
              <div className="d-flex align-items-start pt-2 pb-2 ps-2.5">
                <SkdfIcon name="road" style={{ color: '#999ea5' }} height={22} width={22} className="pe-2.5" />
                {optionLabel}
              </div>
            )}
            hasFooter
          />
        </div>
      </div>
    </>
  );
}

export default AutocompletePage;
