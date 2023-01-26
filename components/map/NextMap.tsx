import dynamic from 'next/dynamic';

export const NextMap = dynamic(() => import('./Map'), {
  ssr: false,
});
