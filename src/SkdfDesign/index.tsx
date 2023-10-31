import { NavLink, useRoutes } from 'react-router-dom';
import Typography from './Typography';
import TypographyShort from './TypographyShort';
import Content from './Content';
import BSButtons from './_bs/Buttons';
import BSAccordions from './_bs/Accordions';
import Buttons from './Buttons';
import BSDropdowns from './_bs/Dropdowns';
import Dropdowns from './Dropdowns';
import BSBreadcrumbs from './_bs/Breadcrumbs';
import Breadcrumbs from './Breadcrumbs';
import BSPagination from './_bs/Pagination';
import BSBadges from './_bs/Badges';
import Badges from './Badges';
import BSModals from './_bs/Modals';
import BSTables from './_bs/Tables';
import Tables from './Tables';
import IconsShowcase from './IconsShowcase';
import BSForms from './_bs/Forms';
import Shadows from './Shadows';
import AvatarShowcase from './AvatarShowcase';
import Forms from './Forms';
import Pagination from './Pagination';
import Modals from './Modals';
import Accordions from './Accordions';
import Selects from './Selects';
import CarouselPage from './Carousel';
import SkdfButtonShowcase from './SkdfButtonShowcase';
import BSTooltips from './_bs/Tooltips';
import Tooltips from './Tooltips';
import BSNavsAndTabs from './_bs/NavsAndTabs';
import NavPills from './NavPills';
import Header from './Header';
import ScrollspyExample from './ScrollspyExample';
import CheckSelects from './CheckSelects';
import Range from './Range';
import Toasts from './Toasts';
import AutocompletePage from './AutocompletePage';
import Skeletons from './Skeletons';
import DatePickers from './DatePickers';
import CheckSelectsTree from './CheckSelectsTree';
import CheckSelectAsyncPage from './CheckSelectAsyncPage';
import Training from './Training';
import BSCarousel from './_bs/Carousel';

const page = {
  path: '/',
  element: (
    <nav className="d-grid gap-2">
      <NavLink to="/roads">Дороги</NavLink>
      <NavLink to="/roads/89388">SideMenu (Дорога)</NavLink>
    </nav>
  ),
};

const pages1 = [
  {
    path: 'Typography',
    element: <Typography />,
  },
  {
    path: 'Typography_Short',
    element: <TypographyShort />,
  },
  {
    path: 'Content',
    element: <Content />,
  },
];

const pages2 = [
  {
    path: 'BSButtons',
    element: <BSButtons />,
  },
  {
    path: 'BSDropdowns',
    element: <BSDropdowns />,
  },
  {
    path: 'BSBreadcrumbs',
    element: <BSBreadcrumbs />,
  },
  {
    path: 'BSPagination',
    element: <BSPagination />,
  },
  {
    path: 'BSBadge',
    element: <BSBadges />,
  },
  {
    path: 'BSModals',
    element: <BSModals />,
  },
  {
    path: 'BSTables',
    element: <BSTables />,
  },
  {
    path: 'BSForms',
    element: <BSForms />,
  },
  {
    path: 'BSAccordions',
    element: <BSAccordions />,
  },
  {
    path: 'BSTooltips',
    element: <BSTooltips />,
  },
  {
    path: 'BSNavsAndTabs',
    element: <BSNavsAndTabs />,
  },
  {
    path: 'BSCarousel',
    element: <BSCarousel />,
  },
];

const pages3 = [
  {
    path: 'Buttons',
    element: <Buttons />,
  },
  {
    path: 'SkdfButtonShowcase',
    element: <SkdfButtonShowcase />,
  },
  {
    path: 'Dropdowns',
    element: <Dropdowns />,
  },
  {
    path: 'Breadcrumbs',
    element: <Breadcrumbs />,
  },
  {
    path: 'Tables',
    element: <Tables />,
  },
  {
    path: 'IconsShowcase',
    element: <IconsShowcase />,
  },
  {
    path: 'Shadows',
    element: <Shadows />,
  },
  {
    path: 'AvatarShowcase',
    element: <AvatarShowcase />,
  },
  {
    path: 'Forms',
    element: <Forms />,
  },
  {
    path: 'Pagination',
    element: <Pagination />,
  },
  {
    path: 'Modals',
    element: <Modals />,
  },
  {
    path: 'Accordions',
    element: <Accordions />,
  },
  {
    path: 'Selects',
    element: <Selects />,
  },
  {
    path: 'Badges',
    element: <Badges />,
  },
  {
    path: 'Carousel',
    element: <CarouselPage />,
  },
  {
    path: 'Tooltips',
    element: <Tooltips />,
  },
  {
    path: 'NavPills',
    element: <NavPills />,
  },
  {
    path: 'Header',
    element: <Header />,
  },
  {
    path: 'ScrollspyExample',
    element: <ScrollspyExample />,
  },
  {
    path: 'CheckSelects',
    element: <CheckSelects />,
  },
  {
    path: 'CheckSelectsTree',
    element: <CheckSelectsTree />,
  },
  {
    path: 'CheckSelectAsync',
    element: <CheckSelectAsyncPage />,
  },
  {
    path: 'Range',
    element: <Range />,
  },
  {
    path: 'Toasts',
    element: <Toasts />,
  },
  {
    path: 'Autocomplete',
    element: <AutocompletePage />,
  },
  {
    path: 'Skeletons',
    element: <Skeletons />,
  },
  {
    path: 'DatePickers',
    element: <DatePickers />,
  },
  {
    path: 'Training',
    element: <Training />,
  },
];

function SkdfDesignRoutes() {
  return useRoutes([page, ...pages1, ...pages2, ...pages3]);
}

function SkdfDesign() {
  const page = (page: { path: string; element: JSX.Element }) => (
    <NavLink key={page.path} to={page.path} className="nav-link">
      {page.path.replace('_', ' ')}
    </NavLink>
  );

  return (
    <div className="ms-3">
      <nav className="nav nav-pills">{pages1.map(page)}</nav>
      <nav className="nav nav-pills">{pages2.map(page)}</nav>
      <nav className="nav nav-pills">{pages3.map(page)}</nav>
      <hr />
      <SkdfDesignRoutes />
    </div>
  );
}

export default SkdfDesign;
