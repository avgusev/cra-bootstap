export const pluralize = ({ count, one, few, many }: { count: number; one: string; few: string; many: string }) => {
  // дорога дороги дорог
  // дорогу дороги дорог
  const n = Math.abs(count) % 100;

  if (n % 100 >= 11 && n % 100 <= 14) return many;

  switch (n % 10) {
    case 1:
      return one;
    case 2:
    case 3:
    case 4:
      return few;
    default:
      return many;
  }
};

export const formatNumber = (n: number) => new Intl.NumberFormat('ru-RU').format(n);
export const formatKilometers = (n: number) =>
  new Intl.NumberFormat('ru-RU', { style: 'unit', unit: 'kilometer', minimumFractionDigits: 2 }).format(n);

export const roadValue2Icon = {
  1: 'federal',
  2: 'regional',
  3: 'local',
};

export const downloadBlobFile = (blob: Blob, fileName: string) => {
  const a = document.createElement('a');
  document.body.appendChild(a);
  a.setAttribute('display', 'none');
  const url = window.URL.createObjectURL(blob);
  a.href = url;
  if (fileName) a.download = fileName;
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};
