import { ReactNode, useEffect, useState } from 'react';
import { signal } from '@preact/signals';
import { SiteType } from '@/types/SiteType';

export const siteTypeSignal = signal<SiteType | undefined>(undefined);

type Props = {
  readonly children: ReactNode;
  readonly siteType: string;
};

export function SiteSlot({ children, siteType }: Props) {
  const [siteTypeState, setTypeSiteState] = useState<SiteType | undefined>();
  useEffect(() => {
    const unsubscribe = siteTypeSignal.subscribe((value) => {
      console.log('Signal siteTypeSignal hat ein neuen Wert ', value);
      setTypeSiteState((prev) => value);
    });

    return () => {
      unsubscribe();
    };
  });

  return siteType === siteTypeState && children;
}
