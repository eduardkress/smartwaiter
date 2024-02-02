import { ReactNode } from 'react';
import { signal } from '@preact/signals';
import { useSignals } from "@preact/signals-react/runtime";
import { SiteType } from '@/types/SiteType';

export const siteTypeSignal = signal<SiteType | undefined>(undefined);

type Props = {
  readonly children: ReactNode;
  readonly siteType: SiteType;
};

export function SiteSlot({ children, siteType }: Props) {
  useSignals();
  return siteType === siteTypeSignal.value && children;
}
