import { PartialRenderPageProps, getDeployment } from '@goldstack/template-ssr';

import {
  renderPage as ssrRenderPage,
  hydrate as ssrHydrate,
  ReactPropertiesType,
} from '@goldstack/template-ssr';
import { APIGatewayProxyResultV2 } from 'aws-lambda';

import goldstackJson from './../goldstack.json';
import Wrapped from './_app';

import staticFileMapperStore from './state/staticFiles.json';

import renderDocument from './_document';

import buildConfig from './build';

export async function renderPage<P extends ReactPropertiesType>(
  props: PartialRenderPageProps<P>
): Promise<APIGatewayProxyResultV2> {
  const deployment = getDeployment(goldstackJson);
  return ssrRenderPage({
    staticFileMapperStore,
    renderDocument,
    deployment,
    buildConfig: () => {
      return buildConfig();
    },
    ...props,
    component: Wrapped({
      Component: props.component,
    }),
  });
}

export function hydrate(c: React.FunctionComponent<any>): void {
  ssrHydrate(Wrapped({ Component: c }));
}
