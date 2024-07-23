import dayjs from 'dayjs';
import { useMemo } from 'react';
import utc from 'dayjs/plugin/utc';
import { SiteTemplate } from './common/components/SiteTemplate';

export const App = () => {
   useMemo(() => {
      dayjs.extend(utc);
   }, [])

   return <>
      <SiteTemplate/>
   </>
}