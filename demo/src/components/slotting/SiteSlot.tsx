import { ReactNode } from 'react';
import { signal } from '@preact/signals';
import { SiteType } from '@/types/SiteType';

const siteTypeSignal = signal<SiteType | undefined>(undefined);

export function setSiteType(siteType: SiteType) {
  siteTypeSignal.value = siteType;
}

type Props = {
  readonly children: ReactNode;
  readonly siteType: string;
};

export function SiteSlot({ children, siteType }: Props) {
  return siteType === siteTypeSignal.value && children;
}
