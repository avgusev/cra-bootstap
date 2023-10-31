import { toast } from 'react-toastify';
import Button from '../components/Button';

function Toasts() {
  return (
    <>
      <Button
        variant="secondary"
        children="Info"
        onClick={() => {
          toast.info(
            'Для отображения геометрии автомобильных дорог регионального, межмуниципального и местного значения необходимо увеличить масштаб карты до 20 и 5 км соответственно'
          );
        }}
      />{' '}
      <Button
        variant="stroke"
        children="Error"
        onClick={() => {
          toast.error('Произошла ошибка при загрузке данных', { autoClose: false });
        }}
      />{' '}
      <Button
        variant="stroke"
        children="Error short"
        onClick={() => {
          toast.error('Произошла ошибка', { autoClose: false });
        }}
      />
    </>
  );
}

export default Toasts;
