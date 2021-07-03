import React from 'react';

const cloudfrontBaseUri = process.env.CLOUDFRONT_BASE_URI;

export const RemoteImage = () => {
  React.useEffect(() => {
    console.log({ cloudfrontBaseUri });
  }, []);

  return null;
};
