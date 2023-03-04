import { fixContentLinks } from './images';

test('Content links should be replaced correctly', async () => {
  const content = `
<table><tbody><tr><td>1 - 2020</td><td>Rat</td></tr><tr><td>2 - 2021</td><td>Ox</td></tr><tr><td>3 - 2022</td><td>Tiger</td></tr><tr><td>4 - 2023</td><td>Rabbit</td></tr><tr><td>5 - 2024</td><td>Dragon</td></tr><tr><td>6 - 2025</td><td>Snake</td></tr><tr><td>7 - 2026</td><td>Horse</td></tr><tr><td>8 - 2027</td><td>Goat</td></tr><tr><td>9 - 2029</td><td>Monkey</td></tr><tr><td>10 - 2030</td><td>Rooster</td></tr><tr><td>11 - 2031</td><td>Dog</td></tr><tr><td>12 - 2032</td><td>Pig</td></tr></tbody></table>

Chinese Zodica Signs

![Coin with Chinese Zodiac Signs](https://spearoflight.files.wordpress.com/2021/11/currency-5029101_1920.jpg?w=1024)

Coin with Chinese Zodiac Signs ([YAGO\_MEDIA](https://pixabay.com/photos/currency-china-medall-on-zodiac-5029101/))

## Months - Western Astrological Signs

The signs of the western astrological calendar align roughly to the 12 months of the year. See the following table for an approximate mapping:

<table><tbody><tr><td>Janurary</td><td>♑︎ Goat, Capricorn</td></tr><tr><td>February</td><td>♒︎ Water Bearer, Aquarious,</td></tr><tr><td>March</td><td>♓︎ Fish, Pisces</td></tr><tr><td>April</td><td>♈︎ Ram, Aries</td></tr><tr><td>May</td><td>♉︎ Bullm Taurus</td></tr><tr><td>June</td><td>♊︎ Twins, Gemini</td></tr><tr><td>July</td><td>♋︎ Crab, Cancer</td></tr><tr><td>August</td><td>♌︎ Lion, Leo</td></tr><tr><td>September</td><td>♍︎ Maiden, Virgo</td></tr><tr><td>October</td><td>♎︎ Scales, Libra</td></tr><tr><td>November</td><td>♏︎ Scorpion, Scorpio</td></tr><tr><td>December</td><td>♐︎ Archer / Centaur, Sagittarius</td></tr></tbody></table>

Western Astrological Signs

![](https://spearoflight.files.wordpress.com/2021/11/astronomical-clock-408306_1920.jpg?w=1024)

Astronomical Clock ([Hermann](https://pixabay.com/photos/astronomical-clock-clock-time-date-408306/))

## Numbers - Shapes
`;

  const result = fixContentLinks(content);

  expect(result).toContain(
    'https://legacy-cdn.pureleap.com/static/spearoflight-media/2021/11/astronomical-clock-408306_1920.jpg?w=1024'
  );
  expect(result).toContain(
    'https://legacy-cdn.pureleap.com/static/spearoflight-media/2021/11/currency-5029101_1920.jpg?w=1024'
  );
});
