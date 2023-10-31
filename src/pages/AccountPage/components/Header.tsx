// import Button from '../../../components/Button';

function Header() {
  return (
    <header className="p-4">
      <div className="d-flex justify-content-between align-items-start gap-2">
        <h1>Личный кабинет</h1>
        {/* <Button variant="stroke" icon="question" className="flex-shrink-0" children="Помощь" /> */}
      </div>

      <div className="d-sm-flex flex-wrap align-items-center gap-2 mt-4">
        <div className="d-sm-flex me-auto">
          {/* <Button variant="function" icon="edit" className="me-4" children="Редактировать" /> */}
        </div>
      </div>
    </header>
  );
}

export default Header;
