declare module '*.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.svg?' {
  const publicPath: string;
  export default publicPath;
}

// with { exportType: "default" }
declare module '*.svg' {
  import { ReactElement, SVGProps } from 'react';
  const content: (props: SVGProps<SVGElement>) => ReactElement;
  export default content;
}

declare module '*.png' {
  const content: any;
  export default content;
}

declare module '*.jpg' {
  const content: any;
  export default content;
}

declare module '*.jpeg' {
  const content: any;
  export default content;
}

declare module '*.gif' {
  const content: any;
  export default content;
}
