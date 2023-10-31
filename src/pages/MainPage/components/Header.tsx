import { useState } from 'react';
import { ReactComponent as IconLogo } from '../../../features/Sidebar/symbol-skdf.svg';
import Button from '../../../components/Button';
import { Container, Navbar, Offcanvas } from 'react-bootstrap';
import FooterInfo from './FooterInfo';
import { observer } from 'mobx-react-lite';
import { MainStore } from '../store';
import Autocomplete from '../../../components/Autocomplete';
import { createSearchParams, useNavigate } from 'react-router-dom';
import SkdfIcon from '../../../components/SkdfIcon';
import { userStoreInstance } from '../../../features/Auth/store';

const Logo = (
  <div className="d-flex gap-3 align-items-center">
    <IconLogo />
    <h1 className="mb-0 fw-medium text-primary" style={{ fontSize: '2rem' }}>
      СКДФ
    </h1>
  </div>
);

function Header({ mainStore }: { mainStore: MainStore }) {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const navigate = useNavigate();

  return (
    <Navbar bg="white" expand="md" sticky="top" className="py-lg-4">
      <Container>
        <Navbar.Toggle className="me-3 text-primary" onClick={() => setShowOffcanvas(true)} />
        <Navbar.Brand href="/" className="p-0">
          {Logo}
        </Navbar.Brand>
        <Navbar.Offcanvas show={showOffcanvas} onHide={() => setShowOffcanvas(false)}>
          <Offcanvas.Header className="p-3">
            <Button variant="function" icon="cross" onClick={() => setShowOffcanvas(false)} className="me-3" />
            {Logo}
            {userStoreInstance.isSignedIn ? (
              <Button variant="ghost" icon="leave" onClick={() => userStoreInstance.logout()} />
            ) : (
              <Button variant="ghost" icon="login" onClick={() => userStoreInstance.login()} />
            )}
          </Offcanvas.Header>
          <Offcanvas.Body className="d-flex flex-column justify-content-between px-3 py-2 my-auto">
            <Autocomplete
              hasFooter
              options={mainStore.searchOptions}
              isLoading={mainStore.isSearchLoading}
              placeholder="Поиск автомобильных дорог"
              className="text-black text-start"
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
            <div className="d-md-none d-block mt-auto">
              <FooterInfo />
            </div>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
        {userStoreInstance.isSignedIn ? (
          <Button
            className="d-xl-none ms-auto"
            variant="ghost"
            icon="leave"
            onClick={() => userStoreInstance.logout()}
          />
        ) : (
          <Button
            className="d-xl-none ms-auto"
            variant="ghost"
            icon="login"
            onClick={() => userStoreInstance.login()}
          />
        )}
        <div className="d-none d-xl-block ms-auto">
          <Button
            className="me-2"
            variant="ghost"
            children="Вернуться к старой версии"
            href="https://xn--d1aluo.xn--p1ai/"
          />
          {userStoreInstance.isSignedIn ? (
            <Button variant="ghost" icon="leave" onClick={() => userStoreInstance.logout()} />
          ) : (
            <Button children="Вход / Регистрация" onClick={() => userStoreInstance.login()} />
          )}
        </div>
      </Container>
    </Navbar>
  );
}

export default observer(Header);
