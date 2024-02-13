import { ReactNode } from 'react';
import { signal } from '@preact/signals';
import { useSignals } from '@preact/signals-react/runtime';
import { SiteType, SiteTypeQueryParamName } from '@/types/SiteType';
import { useSearchParams } from 'next/navigation';

export const siteTypeSignal = signal<SiteType | undefined>(undefined);

type Props = {
  readonly children: ReactNode;
  readonly siteType: SiteType;
};

export function SiteSlot({ children, siteType }: Props) {
  useSignals();
  const searchParams = useSearchParams();

  if (siteTypeSignal.value === undefined) {
    siteTypeSignal.value = searchParams.get(SiteTypeQueryParamName) as SiteType;
  }

  return siteType === siteTypeSignal.value && children;
}
