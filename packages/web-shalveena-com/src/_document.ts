/* esbuild-ignore ui */

import type {
  ReactPropertiesType,
  RenderDocumentProps,
} from '@goldstack/template-ssr';

const renderDocument = async (
  props: RenderDocumentProps<ReactPropertiesType>
): Promise<string> => {
  const tailwindPath = await props.staticFileMapper.resolve({
    name: 'tailwind.css',
  });

  const template = `
<!DOCTYPE html>
<html>
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
    ${
      process.env.GOLDSTACK_DEPLOYMENT === 'prod'
        ? `

<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-3FQ4C12DPE"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-3FQ4C12DPE');
</script>


    `
        : ''
    }
    ${props.injectIntoHead}
    ${
      process.env.GOLDSTACK_DEPLOYMENT === 'local'
        ? '<script src="https://cdn.tailwindcss.com?plugins=typography"></script>'
        : ''
    }
    ${`<link rel="stylesheet" type="text/css" href="${tailwindPath}"  />`}
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="manifest" href="/site.webmanifest">
  </head>
  <body>
    ${props.injectIntoBody}
  </body>
</html>
  `;
  return template;
};

export default renderDocument;
