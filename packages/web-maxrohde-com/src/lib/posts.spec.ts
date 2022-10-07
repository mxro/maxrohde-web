import { normalisePath } from './posts';

it('Should normalise paths correctly', () => {
  expect(
    normalisePath('/2022/08/12/a-guide-to-css-modules-with-react/')
  ).toEqual('2022/08/12/a-guide-to-css-modules-with-react');
  expect(
    normalisePath('2022/08/12/a-guide-to-css-modules-with-react/')
  ).toEqual('2022/08/12/a-guide-to-css-modules-with-react');
  expect(normalisePath('2022/08/12/a-guide-to-css-modules-with-react')).toEqual(
    '2022/08/12/a-guide-to-css-modules-with-react'
  );
});
