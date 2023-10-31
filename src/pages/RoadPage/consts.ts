import { CardList, NavigationStruct } from '../../features/DetailedView/types';

export enum RoadBlockId {
  // Собственники, владельцы дороги и эксплуатирующие организации
  RoadOwner = 3,
  OperatingOrganization = 4,

  // Нормативно-правовые документы
  Regulation = 5,
  Excerpt = 100,
  Instruction = 6,

  // Дополнительная информация об участках
  BackboneNetwork = 110,
  StartExploitation = 7,
  PaidSectionOfTheRoad = 8,
  OverloadedRoad = 26,
  DangerousSection = 24,
  IncreasedMaintenanceComplexities = 20,

  // Местоположение
  CrossSubject = 44,
  Agglomerations = 45,
  ClimaticZone = 46,
  TerrainType = 47,

  // Общие технические данные
  MaxSpeed = 17,
  AxleLoad = 16,
  Throughput = 18,
  TrafficIntensity = 19,
  OversizedCargoLimitation = 21,

  // Проезжая часть и земляное полотно
  Category = 10,
  RoadClass = 15,
  NumberOfLanes = 13,
  RoadwayWidth = 11,
  EarthenCanvasWidth = 12,
  TypeOfCoating = 14,

  // Пересечения
  CommunicationIntersection = 48,
  RoadIntersection = 49,
  RailwaysIntersection = 50,
  RoadPart = 2,

  // Элементы обустройства
  TrafficLights = 31,
  Lighting = 30,
  Stops = 32,
  Sidewalks = 38,
  SoundProofingBuildings = 41,
  Barriers = 52,
  KilometerPillars = 43,
  WeightControlPoints = 91,
  TollPoints = 90,
  PhotoVideoViolationFixation = 92,

  // Объекты дорожного сервиса
  GasStations = 35,
  ServiceStations = 36,
  Platforms = 37,
  Stations = 34,
  VacationSpot = 39,
  MedicalInstitutions = 51,
  MultifunctionalZones = 40,

  // Нормативное / ненормативное состояние
  RegulatoryStatus = 25,

  // Оценка технического состояния (результаты)
  Diagnostic = 27,

  // Искусственные сооружения
  BridgeConstruction = 22,
  Pipe = 23,
  LocalTreatmentBuildings = 42,
  PedestrianCrossings = 33,

  // Работы
  RoadWork = 28,
  RoadWarrantyPart = 29,
}

export const navigation: NavigationStruct = {
  roadOwners: {
    id: 'roadOwners',
    name: 'Собственники, владельцы дороги и эксплуатирующие организации',
    blocks: [
      {
        id: RoadBlockId.RoadOwner,
        name: 'Собственник, владелец (балансодержатель)',
        endpoint: 'road-owners',
        saveEndpoint: 'roadOwners',
      }, // 3
      {
        id: RoadBlockId.OperatingOrganization,
        name: 'Эксплуатирующая организация',
        endpoint: 'operating-organizations',
        saveEndpoint: 'operatingOrganizations',
      }, // 4
    ],
  },
  regulatoryDocuments: {
    id: 'regulatoryDocuments',
    name: 'Нормативно-правовые документы',
    blocks: [
      {
        id: RoadBlockId.Regulation,
        name: 'Нормативно-правовые документы',
        endpoint: 'regulations',
      }, // 5
      { id: RoadBlockId.Excerpt, name: 'Выписки', endpoint: 'excerpts' }, // 100
      {
        id: RoadBlockId.Instruction,
        name: 'Поручения',
        endpoint: 'instructions',
      }, // 6
    ],
  },
  additionalInfo: {
    id: 'additionalInfo',
    name: 'Дополнительная информация об участках',
    blocks: [
      {
        id: RoadBlockId.BackboneNetwork,
        name: 'Участки, входящие в опорную сеть',
        endpoint: 'backbone-network', // +
        saveEndpoint: 'backboneNetwork',
      }, // 110
      {
        id: RoadBlockId.StartExploitation,
        name: 'Дата ввода в эксплуатацию',
        endpoint: 'start-exploitation', // +
        saveEndpoint: 'startExploitations',
      }, // 7
      {
        id: RoadBlockId.PaidSectionOfTheRoad,
        name: 'Участки, используемые на платной основе',
        endpoint: 'paid-section-of-the-road', // +
        saveEndpoint: 'paidSections',
      }, // 8
      {
        id: RoadBlockId.OverloadedRoad,
        name: 'Участки дороги, работающие в режиме перегрузки',
        endpoint: 'overloaded-roads', // +
        saveEndpoint: 'overloadedRoads',
      }, // 26
      {
        id: RoadBlockId.DangerousSection,
        name: 'Места концентрации дорожно-транспортных происшествий (аварийно-опасные участки)',
        endpoint: 'dangerous-sections',
        saveEndpoint: 'dangerousSections',
      }, // 24
      {
        id: RoadBlockId.IncreasedMaintenanceComplexities,
        name: 'Участки повышенной трудности содержания',
        endpoint: 'increased-maintenance-complexity',
        saveEndpoint: 'increasedMaintenanceComplexities',
      }, // 20
    ],
  },
  location: {
    id: 'location',
    name: 'Местоположение',
    blocks: [
      {
        id: RoadBlockId.CrossSubject,
        name: 'Прохождение дороги по территории субъектов Российской Федерации',
        endpoint: 'cross-subjects',
        saveEndpoint: 'crossSubjects',
      }, // 44
      {
        id: RoadBlockId.Agglomerations,
        name: 'Прохождение дороги по территории городских агломераций',
        endpoint: 'agglomerations',
        saveEndpoint: 'agglomerations',
      }, // 45
      {
        id: RoadBlockId.ClimaticZone,
        name: 'Дорожно-климатическая зона',
        endpoint: 'climatic-zones',
        saveEndpoint: 'climaticZones',
      }, // 46
      {
        id: RoadBlockId.TerrainType,
        name: 'Тип местности по условиям увлажнения',
        endpoint: 'terrain-types',
        saveEndpoint: 'terrainTypes',
      }, // 47
    ],
  },
  generalTechnicalData: {
    id: 'generalTechnicalData',
    name: 'Общие технические данные',
    blocks: [
      {
        id: RoadBlockId.MaxSpeed,
        name: 'Максимальная разрешенная скорость',
        endpoint: 'max-speeds',
        saveEndpoint: 'maximumSpeeds',
      }, // 17
      {
        id: RoadBlockId.AxleLoad,
        name: 'Нагрузка на ось',
        endpoint: 'axle-loads',
        saveEndpoint: 'axleLoads',
      }, // 16
      {
        id: RoadBlockId.Throughput,
        name: 'Пропускная способность',
        endpoint: 'throughputs',
        saveEndpoint: 'throughputs',
      }, // 18
      {
        id: RoadBlockId.TrafficIntensity,
        name: 'Среднесуточная интенсивность и состав движения',
        endpoint: 'traffic-intensities',
        saveEndpoint: 'trafficIntensities',
      }, // 19
      {
        id: RoadBlockId.OversizedCargoLimitation,
        name: 'Ограничения габаритных и весовых параметров транспортных средств',
        endpoint: 'oversized-cargo-limitations',
        saveEndpoint: 'oversizedCargoLimitations',
      }, // 21
    ],
  },
  roadwayAndSubgrade: {
    id: 'roadwayAndSubgrade',
    name: 'Проезжая часть и земляное полотно',
    blocks: [
      { id: RoadBlockId.Category, name: 'Категория', endpoint: 'categories', saveEndpoint: 'categories' }, // 10
      { id: RoadBlockId.RoadClass, name: 'Класс', endpoint: 'road-class', saveEndpoint: 'roadClasses' }, // 15
      {
        id: RoadBlockId.NumberOfLanes,
        name: 'Число полос движения',
        endpoint: 'number-of-lanes',
        saveEndpoint: 'numberOfLanes',
      }, // 13
      {
        id: RoadBlockId.RoadwayWidth,
        name: 'Ширина основной проезжей части дороги',
        endpoint: 'roadway-width',
        saveEndpoint: 'roadwayWidths',
      }, // 11
      {
        id: RoadBlockId.EarthenCanvasWidth,
        name: 'Земляное полотно',
        endpoint: 'earthen-canvas-width',
        saveEndpoint: 'earthenCanvasWidths',
      }, // 12
      {
        id: RoadBlockId.TypeOfCoating,
        name: 'Тип дорожной одежды и вид покрытия',
        endpoint: 'type-of-coatings',
        saveEndpoint: 'typeOfCoatings',
      }, // 14
    ],
  },
  intersections: {
    id: 'intersections',
    name: 'Пересечения и примыкания',
    blocks: [
      {
        id: RoadBlockId.CommunicationIntersection,
        name: 'Пересечения с коммуникациями',
        endpoint: 'communication-intersections',
        saveEndpoint: 'communicationIntersections',
      }, // 48
      {
        id: RoadBlockId.RoadIntersection,
        name: 'Пересечения и примыкания с автомобильными дорогами',
        endpoint: 'road-intersections',
        saveEndpoint: 'roadIntersections',
      }, // 49
      {
        id: RoadBlockId.RailwaysIntersection,
        name: 'Пересечения с железными дорогами',
        endpoint: 'railway-intersections',
        saveEndpoint: 'railwayIntersections',
      }, // 50
      {
        id: RoadBlockId.RoadPart,
        name: 'Участки дороги',
        endpoint: 'road-parts',
        saveEndpoint: 'roadParts',
      }, // 2
    ],
  },
  roadSafety: {
    id: 'roadSafety',
    name: 'Элементы обустройства',
    blocks: [
      {
        id: RoadBlockId.TrafficLights,
        name: 'Светофоры',
        endpoint: 'traffic-lights',
        saveEndpoint: 'trafficLights',
      }, // 31
      { id: RoadBlockId.Lighting, name: 'Освещение', endpoint: 'lightning', saveEndpoint: 'lightnings' }, // 30
      {
        id: RoadBlockId.Stops,
        name: 'Остановки общественного транспорта',
        endpoint: 'road-stops',
        saveEndpoint: 'roadStops',
      }, // 32
      {
        id: RoadBlockId.Sidewalks,
        name: 'Тротуары, пешеходные и велосипедные дорожки',
        endpoint: 'sidewalks',
        saveEndpoint: 'sidewalks',
      }, // 38
      {
        id: RoadBlockId.SoundProofingBuildings,
        name: 'Шумозащитные сооружения',
        endpoint: 'soundproofing-buildings',
        saveEndpoint: 'soundProofingBuildings',
      }, // 41
      {
        id: RoadBlockId.Barriers,
        name: 'Дорожные ограждения',
        endpoint: 'barriers',
        saveEndpoint: 'barriers',
      }, // 52
      {
        id: RoadBlockId.KilometerPillars,
        name: 'Километровые знаки',
        endpoint: 'kilometer-pillars',
        saveEndpoint: 'kilometerPillars',
      }, // 43
      {
        id: RoadBlockId.WeightControlPoints,
        name: 'Пункты весогабаритного контроля',
        endpoint: 'weight-control-points',
        saveEndpoint: 'weightControlPoints',
      }, // 91
      {
        id: RoadBlockId.PhotoVideoViolationFixation,
        name: 'Фотовидеофиксация нарушений',
        endpoint: 'photo-video-violation-fixation',
        saveEndpoint: 'photoVideoViolationFixations',
      }, // 92
      {
        id: RoadBlockId.TollPoints,
        name: 'Пункты оплаты проезда',
        endpoint: 'toll-points',
        saveEndpoint: 'tollPoints',
      }, // 90
    ],
  },
  serviceFacilities: {
    id: 'serviceFacilities',
    name: 'Объекты дорожного сервиса',
    blocks: [
      {
        id: RoadBlockId.GasStations,
        name: 'Автозаправочные станции',
        endpoint: 'gas-stations',
        saveEndpoint: 'gasStations',
      }, // 35
      {
        id: RoadBlockId.ServiceStations,
        name: 'Станции технического обслуживания',
        endpoint: 'service-stations',
        saveEndpoint: 'serviceStations',
      }, // 36
      {
        id: RoadBlockId.Platforms,
        name: 'Площадки отдыха, стоянки',
        endpoint: 'platforms',
        saveEndpoint: 'platforms',
      }, // 37
      {
        id: RoadBlockId.Stations,
        name: 'Станции, вокзалы',
        endpoint: 'stations',
        saveEndpoint: 'stations',
      }, // 34
      {
        id: RoadBlockId.VacationSpot,
        name: 'Гостиницы, мотели, кемпинги',
        endpoint: 'vacation-spots',
        saveEndpoint: 'vacationSpots',
      }, // 39
      {
        id: RoadBlockId.MedicalInstitutions,
        name: 'Пункты медицинской помощи',
        endpoint: 'medical-institutions',
        saveEndpoint: 'medicalInstitutions',
      }, // 51
      {
        id: RoadBlockId.MultifunctionalZones,
        name: 'Многофункциональные зоны',
        endpoint: 'multifunctional-zones',
        saveEndpoint: 'multifunctionalZones',
      }, // 40
    ],
  },
  regulatoryStatus: {
    id: 'regulatoryStatus',
    name: 'Нормативное / ненормативное состояние',
    blocks: [
      {
        id: RoadBlockId.RegulatoryStatus,
        name: 'Участки, соответствующие нормативным требованиям',
        endpoint: 'regulatory-statuses',
        saveEndpoint: 'regulatoryStatuses',
      }, // 25
    ],
  },
  technicalCondition: {
    id: 'technicalCondition',
    name: 'Оценка технического состояния (результаты)',
    blocks: [
      {
        id: RoadBlockId.Diagnostic,
        name: 'Диагностика',
        endpoint: 'diagnostics',
        saveEndpoint: 'diagnostics',
      }, // 27
    ],
  },
  artificialConstructionsBlocks: {
    id: 'artificialConstructionsBlocks',
    name: 'Искусственные сооружения',
    blocks: [
      {
        id: RoadBlockId.BridgeConstruction,
        name: 'Мостовые сооружения',
        endpoint: 'bridge-construction',
        saveEndpoint: 'bridgeConstructions',
      }, // 22
      { id: RoadBlockId.Pipe, name: 'Трубы дорожные водопропускные', endpoint: 'pipes', saveEndpoint: 'pipes' }, // 23
      {
        id: RoadBlockId.LocalTreatmentBuildings,
        name: 'Локальные очистные сооружения',
        endpoint: 'local-treatment-buildings',
        saveEndpoint: 'localTreatmentBuildings',
      }, // 42
      {
        id: RoadBlockId.PedestrianCrossings,
        name: 'Пешеходные переходы',
        endpoint: 'pedestrian-crossings',
        saveEndpoint: 'pedestrianCrossings',
      }, // 33
    ],
  },
  // trafficManagement: {
  //   id: 'artificialConstructionsBlocks',
  //   name: 'Организация дорожного движения',
  //   blocks: [],
  // },
  roadWorks: {
    id: 'roadWorks',
    name: 'Мероприятия',
    blocks: [
      {
        id: RoadBlockId.RoadWork,
        name: 'Участки проведения работ',
        endpoint: 'road-works',
        saveEndpoint: 'roadWorks',
      }, // 28
      {
        id: RoadBlockId.RoadWarrantyPart,
        name: 'Участки дороги на гарантии',
        endpoint: 'road-warranty-parts',
        saveEndpoint: 'roadWarrantyParts',
      }, // 29
    ],
  },
};

export const navKeys: (keyof NavigationStruct)[] = [
  'roadOwners',
  'regulatoryDocuments',
  'additionalInfo',
  'location',
  'generalTechnicalData',
  'roadwayAndSubgrade',
  'intersections',
  'roadSafety',
  'serviceFacilities',
  'regulatoryStatus',
  'technicalCondition',
  'artificialConstructionsBlocks',
  'trafficManagement',
  'roadWorks',
];

export const cardList: CardList = [
  [
    [
      { title: 'Идентификационный номер', code: 'IDENTIFICATION_NUMBER_SECTION', className: 'col-6' },
      { title: 'Учетный номер', code: 'UCHET_NUMBER', className: 'col-6' },
    ],
    [
      { title: 'Номер СКДФ', code: 'ID', className: 'col-6' },
      { title: 'Входит в опорную сеть', code: 'CORE_NETWORK', className: 'col-6' },
    ],
    [
      { title: 'Значение автомобильной дороги', code: 'VALUE_OF_THE_ROAD', className: 'col-6' },
      { title: 'Собственник, владелец дороги (балансодержатель)', code: 'ROAD_OWNER', className: 'col-6' },
    ],
    [
      { title: 'Балансовая стоимость, тыс. руб.', code: 'BALANCE_STOIM', className: 'col-6' },
      { title: 'Остаточная стоимость, тыс. руб.', code: 'OSTATOK', className: 'col-6' },
    ],
  ],
  [
    [
      { title: 'Протяженность, км', code: 'LENGTH_POPIKETNO', className: 'col-4' },
      { title: 'Площадь покрытия проезжей части, кв.м', code: 'SQUARE', className: 'col-4' },
      { title: 'Дата ввода в эксплуатацию', code: 'DATA_EXPL', className: 'col-4' },
    ],
    [
      { title: 'Адрес начала дороги, км+м', code: 'LOCATION_START', className: 'col-4' },
      { title: 'Адрес конца дороги, км+м', code: 'BLANK', className: 'col-4' },
      { title: 'Число полос движения, шт.', code: 'RANKS', className: 'col-4' },
    ],
    [
      { title: 'Техническая категория', code: 'ROAD_CATEGORY', className: 'col-4' },
      { title: 'Максимальная разрешенная скорость, км/ч', code: 'TOP_SPEED', className: 'col-4' },
      { title: 'Макс. пропускная способность, авт/сут', code: 'THROUGHPUT', className: 'col-4' },
    ],
    [
      { title: 'Класс', code: 'CLASS_OF_ROAD', className: 'col-4', type: 'list' },
      { title: 'Виды покрытия', code: 'COATING', className: 'col-4', type: 'list' },
      { title: 'Типы дорожной одежды', code: 'BLANK', className: 'col-4', type: 'list' },
    ],
    [
      { title: 'Среднесуточная интенсивность движения, авт/сут', code: 'TRAFFIC_INTENSITY', className: 'col-4' },
      { title: 'Категория согласно СП 42.13330', code: 'CATEGORY_SNIP', className: 'col-8', type: 'list' },
    ],
    [
      { title: 'Международный маршрут', code: 'INTERNATIONAL', className: 'col-4' },
      { title: 'Вид разрешенного использования ', code: 'BLANK', className: 'col-4' },
      { title: 'Дорожно-климатическая зона', code: 'CLIMATIC_ZONE', className: 'col-4' },
    ],
    [
      { title: 'Тип местности по условиям увлажнения', code: 'HUMIDIFICATION_COND', className: 'col-4' },
      { title: 'Номер ЕГРАД', code: 'BLANK', className: 'col-4' },
    ],
  ],
];
