const pageArray1 = ({ page = 1, count = 1, margin = 2 }): (string | number)[] => {
  const pageList = Array.from({ length: count - margin * 2 }, (_, i) => i + 1 + margin);

  const arrayPage = [];

  arrayPage.push(1);
  if (count > 1 && margin > 1) arrayPage.push(2);
  if (count > 2 && margin > 2) arrayPage.push(3);

  if (page >= 2 + margin * 2 && count >= 2 + margin * 2) {
    arrayPage.push('...');
  }

  pageList.map((item) => item >= page - margin && item <= page + margin && arrayPage.push(item));

  if (page + margin * 2 < count && count > 1 + margin * 2) {
    arrayPage.push('...');
  }
  if (count >= 4 && margin > 2) arrayPage.push(count - 2);
  if (count >= 4 && margin > 1) arrayPage.push(count - 1);
  if (count > 2) arrayPage.push(count);
  return arrayPage;
};

const range = (start: number, end: number) => Array.from({ length: end - start + 1 }, (_, i) => i + start);

const pageArray2 = ({ count = 1, page = 1, margin = 2, edge = 1 }) => {
  const start = Math.max(1, page - margin);
  const end = Math.min(count, page + margin);

  const array = [];

  const prefixLen = start - 1;
  if (prefixLen > 0) {
    array.push(...range(1, Math.min(start - 1, edge)));
    if (prefixLen - edge === 1) array.push(start - 1);
    if (prefixLen - edge > 1) array.push('...');
  }

  array.push(...range(start, end));

  // 3 - [] 0
  // 4 - [4] 1
  // 5 - [4, 5] 2
  // 6 - [4, 5, 6] 3
  // 7 - ['...', 6, 7] 4
  const suffixLen = count - end;

  if (suffixLen > 0) {
    if (suffixLen - edge === 1) array.push(end + 1);
    if (suffixLen - edge > 1) array.push('...');
    array.push(...range(Math.max(end + 1, count - edge + 1), count));
  }

  return array;
};

const pageArray = ({ count = 1, page = 1, margin = 1, edge = 1 }) => {
  const array: (number | [string, 'left' | 'right', number, number])[] = [];
  const len = margin * 2 + edge * 2 + 3; // 1 2 ... 5 6 7 _8_ 9 10 11 ... 14 15
  if (count <= len) return range(1, count);

  // let [s1, e1, s2, e2, s3, e3] = [1, edge, page - margin, page + margin, count - edge + 1, count];
  // console.log([s1, e1, s2, e2, s3, e3]);
  // console.log(`${s1} - ${e1}, ${s2} - ${e2}, ${s3} - ${e3}`);
  const s1 = 1;
  const e1 = edge;
  let s2 = page - margin;
  let e2 = page + margin;
  const s3 = count - edge + 1;
  const e3 = count;

  if (s2 <= e1 + 1) {
    const l = e2 - s2;
    s2 = e1 + 1;
    e2 = s2 + l + 1;
  }
  if (s3 <= e2 + 1) {
    const l = e2 - s2;
    e2 = s3 - 1;
    s2 = e2 - l - 1;
  }

  array.push(...range(s1, e1));
  if (s2 - e1 > 2) array.push([`${e1 + 1}-${s2 - 1}`, 'left', e1 + 1, s2 - 1]); // ...
  if (s2 - e1 === 2) array.push(e1 + 1);
  array.push(...range(s2, e2));
  if (s3 - e2 > 2) array.push([`${e2 + 1}-${s3 - 1}`, 'right', e2 + 1, s3 - 1]); // ...
  if (s3 - e2 === 2) array.push(e2 + 1);
  array.push(...range(s3, e3));

  return array;
};

export { pageArray1, pageArray2, pageArray };
export default pageArray;
