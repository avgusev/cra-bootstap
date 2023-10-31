import { CardList, NavigationStruct } from '../../features/DetailedView/types';

export enum RoadOnBalanceBlockId {
  //Общая информация

  OperatingOrganization = 4,
  Instruction = 6,
  StartExploitation = 7,
  PaidSectionOfTheRoad = 8,
  CitizenMessage = 9,

  //Технические характеристики

  Category = 10,
  RoadwayWidth = 11,
  EarthenCanvasWidth = 12,
  NumberOfLanes = 13,
  TypeOfCoating = 14,
  RoadClass = 15,
  AxleLoad = 16,
  MaxSpeed = 17,
  Throughput = 18,
  TrafficIntensity = 19,
  IncreasedMaintenanceComplexities = 20,
  OversizedCargoLimitation = 21,

  // Искусственные сооружения
  BridgeConstruction = 22,
  Pipe = 23,

  //Безопасность
  DangerousSection = 24,

  //Состояние
  RegulatoryStatus = 25,
  OverloadedRoad = 26,
  Diagnostic = 27,

  //Работы
  RoadWork = 28,
  RoadWarrantyPart = 29,

  //Обустройство
  Lightning = 30,
  TrafficLights = 31,
  Stops = 32,
  PedestrianCrossings = 33,
  Stations = 34,
  GasStations = 35,
  ServiceStations = 36,
  Platforms = 37,
  Sidewalks = 38,
  VacationSpot = 39,
  MultifunctionalZones = 40,
  SoundProofingBuildings = 41,
  LocalTreatmentBuildings = 42,
  KilometerPillars = 43,

  //Местонахождение
  CrossSubject = 44,
  Agglomerations = 45,
  ClimaticZone = 46,
  TerrainType = 47,

  //Пересечения
  CommunicationIntersection = 48,
  RoadIntersection = 49,
  RailwaysIntersection = 50,

  TollPoint = 51,
  MedicalInstitutions = 52,
  PhotoVideoViolationFixation = 60,
  WeightControlPoint = 61,
}

export const navigation: NavigationStruct = {
  common: {
    id: 'common',
    name: 'Общая информация',
    blocks: [
      {
        id: RoadOnBalanceBlockId.OperatingOrganization,
        name: 'Эксплуатирующая организация',
        endpoint: 'operating-organizations',
      }, // 4
      {
        id: RoadOnBalanceBlockId.Instruction,
        name: 'Поручения',
        endpoint: 'instructions',
      }, // 6
      {
        id: RoadOnBalanceBlockId.StartExploitation,
        name: 'Дата ввода в эксплуатацию',
        endpoint: 'start-exploitation',
      }, // 7
      {
        id: RoadOnBalanceBlockId.PaidSectionOfTheRoad,
        name: 'Платность',
        endpoint: 'paid-section-of-the-road',
      }, // 8
      {
        id: RoadOnBalanceBlockId.CitizenMessage,
        name: 'Перечень сообщений граждан',
        endpoint: 'citizen-messages',
      }, // 9
    ],
  },
  technicalCharacteristics: {
    id: 'technicalCharacteristics',
    name: 'Технические характеристики',
    blocks: [
      { id: RoadOnBalanceBlockId.Category, name: 'Категория', endpoint: 'categories' }, // 10
      {
        id: RoadOnBalanceBlockId.RoadwayWidth,
        name: 'Ширина проезжей части',
        endpoint: 'roadway-width',
      }, // 11
      {
        id: RoadOnBalanceBlockId.EarthenCanvasWidth,
        name: 'Ширина земляного полотна',
        endpoint: 'earthen-canvas-width',
      }, // 12
      {
        id: RoadOnBalanceBlockId.NumberOfLanes,
        name: 'Число полос движения',
        endpoint: 'number-of-lanes',
      }, // 13
      {
        id: RoadOnBalanceBlockId.TypeOfCoating,
        name: 'Вид покрытия',
        endpoint: 'type-of-coatings',
      }, // 14
      { id: RoadOnBalanceBlockId.RoadClass, name: 'Класс', endpoint: 'road-class' }, // 15
      {
        id: RoadOnBalanceBlockId.AxleLoad,
        name: 'Нагрузка на ось',
        endpoint: 'axle-loads',
      }, // 16
      {
        id: RoadOnBalanceBlockId.MaxSpeed,
        name: 'Максимальная скорость',
        endpoint: 'max-speeds',
      }, // 17
      {
        id: RoadOnBalanceBlockId.Throughput,
        name: 'Пропускная способность',
        endpoint: 'throughputs',
      }, // 18
      {
        id: RoadOnBalanceBlockId.TrafficIntensity,
        name: 'Интенсивность движения',
        endpoint: 'traffic-intensities',
      }, // 19
      {
        id: RoadOnBalanceBlockId.IncreasedMaintenanceComplexities,
        name: 'Повышенная трудность содержания',
        endpoint: 'increased-maintenance-complexity',
      }, // 20
      {
        id: RoadOnBalanceBlockId.OversizedCargoLimitation,
        name: 'Ограничения габаритных и весовых параметров транспортных средств',
        endpoint: 'oversized-cargo-limitations',
      }, // 21
    ],
  },
  artificialConstructionsBlocks: {
    id: 'artificialConstructionsBlocks',
    name: 'Искусственные сооружения',
    blocks: [
      {
        id: RoadOnBalanceBlockId.BridgeConstruction,
        name: 'Мостовые сооружения',
        endpoint: 'bridge-construction',
      }, // 22
      { id: RoadOnBalanceBlockId.Pipe, name: 'Трубы', endpoint: 'pipes' }, // 23
    ],
  },
  state: {
    id: 'state',
    name: 'Состояние',
    blocks: [
      {
        id: RoadOnBalanceBlockId.RegulatoryStatus,
        name: 'Нормативное состояние',
        endpoint: 'regulatory-statuses',
      }, // 25
      {
        id: RoadOnBalanceBlockId.OverloadedRoad,
        name: 'Участки дороги, работающие в режиме перегрузки',
        endpoint: 'overloaded-roads',
      }, // 26
      {
        id: RoadOnBalanceBlockId.Diagnostic,
        name: 'Проведение диагностики',
        endpoint: 'diagnostics',
      }, // 27
    ],
  },
  roadWorks: {
    id: 'roadWorks',
    name: 'Работы',
    blocks: [
      {
        id: RoadOnBalanceBlockId.RoadWork,
        name: 'Участки проведения работ',
        endpoint: 'road-works',
      }, // 28
      {
        id: RoadOnBalanceBlockId.RoadWarrantyPart,
        name: 'Участки дороги на гарантии',
        endpoint: 'road-warranty-parts',
      }, // 29
    ],
  },
  security: {
    id: 'security',
    name: 'Безопасность',
    blocks: [
      {
        id: RoadOnBalanceBlockId.DangerousSection,
        name: 'Аварийно-опасные участки',
        endpoint: 'dangerous-sections',
      }, // 24
    ],
  },
  violationFixation: {
    id: 'violationFixation',
    name: 'Фиксация нарушений',
    blocks: [
      {
        id: RoadOnBalanceBlockId.PhotoVideoViolationFixation,
        name: 'Фотовидеофиксация нарушений',
        endpoint: 'photo-video-violation-fixation',
      }, // 92
    ],
  },
  arrangements: {
    id: 'arrangements',
    name: 'Обустройство',
    blocks: [
      {
        id: RoadOnBalanceBlockId.TrafficLights,
        name: 'Светофоры',
        endpoint: 'traffic-lights',
      }, // 31
      { id: RoadOnBalanceBlockId.Stops, name: 'Остановки', endpoint: 'road-stops' }, // 32
      {
        id: RoadOnBalanceBlockId.PedestrianCrossings,
        name: 'Пешеходные переходы',
        endpoint: 'pedestrian-crossings',
      }, // 33
      {
        id: RoadOnBalanceBlockId.Stations,
        name: 'Станции, вокзалы',
        endpoint: 'stations',
      }, // 34
      {
        id: RoadOnBalanceBlockId.GasStations,
        name: 'Автозаправочные станции',
        endpoint: 'gas-stations',
      }, // 35
      {
        id: RoadOnBalanceBlockId.ServiceStations,
        name: 'Станции технического обслуживания',
        endpoint: 'service-stations',
      }, // 36
      {
        id: RoadOnBalanceBlockId.Platforms,
        name: 'Площадки отдыха, стоянки',
        endpoint: 'platforms',
      }, // 37
      {
        id: RoadOnBalanceBlockId.Sidewalks,
        name: 'Тротуары, пешеходные и велосипедные дорожки',
        endpoint: 'sidewalks',
      }, // 38
      {
        id: RoadOnBalanceBlockId.MedicalInstitutions,
        name: 'Медицинские учреждения',
        endpoint: 'medical-institutions',
      }, // 51
      {
        id: RoadOnBalanceBlockId.VacationSpot,
        name: 'Места отдыха (гостиницы, кемпинги, мотели)',
        endpoint: 'vacation-spots',
      }, // 39
      {
        id: RoadOnBalanceBlockId.MultifunctionalZones,
        name: 'Многофункциональные зоны',
        endpoint: 'multifunctional-zones',
      }, // 40
      {
        id: RoadOnBalanceBlockId.SoundProofingBuildings,
        name: 'Шумозащитные сооружения',
        endpoint: 'soundproofing-buildings',
      }, // 41
      {
        id: RoadOnBalanceBlockId.LocalTreatmentBuildings,
        name: 'Локальные очистные сооружения',
        endpoint: 'local-treatment-buildings',
      }, // 42
      {
        id: RoadOnBalanceBlockId.KilometerPillars,
        name: 'Километровые столбы',
        endpoint: 'kilometer-pillars',
      }, // 43
    ],
  },
  location: {
    id: 'location',
    name: 'Местоположение',
    blocks: [
      {
        id: RoadOnBalanceBlockId.CrossSubject,
        name: 'Прохождение по территории субъектов',
        endpoint: 'cross-subjects',
      }, // 44
      {
        id: RoadOnBalanceBlockId.Agglomerations,
        name: 'Прохождение по территории агломераций',
        endpoint: 'agglomerations',
      }, // 45
      {
        id: RoadOnBalanceBlockId.ClimaticZone,
        name: 'Дорожно-климатическая зона',
        endpoint: 'climatic-zones',
      }, // 46
      {
        id: RoadOnBalanceBlockId.TerrainType,
        name: 'Тип местности по условиям увлажнения',
        endpoint: 'terrain-types',
      }, // 47
    ],
  },
  intersections: {
    id: 'intersections',
    name: 'Пересечения',
    blocks: [
      {
        id: RoadOnBalanceBlockId.CommunicationIntersection,
        name: 'Пересечения с коммуникациями',
        endpoint: 'communication-intersections',
      }, // 48
      {
        id: RoadOnBalanceBlockId.RoadIntersection,
        name: 'Пересечения и примыкания с автомобильными дорогами',
        endpoint: 'road-intersections',
      }, // 49
      {
        id: RoadOnBalanceBlockId.RailwaysIntersection,
        name: 'Пересечения с железными дорогами',
        endpoint: 'railway-intersections',
      }, // 50
    ],
  },
};

export const navKeys: (keyof NavigationStruct)[] = [
  'technicalCharacteristics',
  'artificialConstructionsBlocks',
  'state',
  'roadWorks',
  'security',
  'violationFixation',
  'arrangements',
  'location',
  'intersections',
];

export const cardList: CardList = [
  [
    [
      { title: 'Идентификационный номер', code: 'IDENTIFICATION_NUMBER_SECTION', className: 'col-6' },
      { title: 'Учетный номер', code: 'UCHET_NUMBER', className: 'col-6' },
    ],
    [
      { title: 'Начало участка', code: 'START', className: 'col-6' },
      { title: 'Конец конец', code: 'FINISH', className: 'col-6' },
    ],
    [{ title: 'Владелец', code: 'ROAD_OWNER', className: 'col' }],
    [
      { title: 'Регион', code: 'REGION', className: 'col-4' },
      { title: 'Категория', code: 'ROAD_CATEGORY', className: 'col-4' },
      { title: 'Виды покрытия', code: 'COATING', className: 'col-4' },
    ],
  ],
  [
    [
      { title: 'Число полос движения, шт.', code: 'RANKS', className: 'col-4' },
      { title: 'Протяженность, км', code: 'LENGTH', className: 'col-4' },
      { title: 'Площадь, кв.м', code: 'SQUARE', className: 'col-4' },
    ],
    [
      { title: 'Балансовая стоимость, тыс. руб.', code: 'BALANCE_STOIM', className: 'col-6' },
      { title: 'Остаточная стоимость, тыс. руб.', code: 'OSTATOK', className: 'col-6' },
    ],
    [
      { title: 'Значение автомобильной дороги', code: 'VALUE_OF_THE_ROAD', className: 'col-6' },
      { title: 'Класс', code: 'CLASS_OF_ROAD', className: 'col-6' },
    ],
  ],
];
