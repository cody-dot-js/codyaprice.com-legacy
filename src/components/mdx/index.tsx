import React from 'react';

import { Img, ImgProps } from './Img';

export const shortcodes = {
  wrapper: ({ children }: { children: React.ReactNode }) => children,
  img: (props: ImgProps) => <Img {...props} />,
  Img,
};
