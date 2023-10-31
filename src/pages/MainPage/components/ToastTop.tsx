import { useState } from 'react';
import Button from '../../../components/Button';
import SkdfIcon from '../../../components/SkdfIcon';

function ToastTop() {
  const [show, setShow] = useState(true);
  if (!show) return null;

  return (
    <div className="py-3" style={{ backgroundColor: '#E05534' }}>
      <div className="container d-flex align-items-start text-white gap-2">
        <SkdfIcon name="info" />
        <span>Ведутся технические работы, некоторые функции и информация временно недоступны</span>
        <Button variant="function" className="text-white ms-auto" icon="cross" onClick={() => setShow(false)} />
      </div>
    </div>
  );
}

export default ToastTop;
