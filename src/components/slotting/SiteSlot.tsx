"use client";
import { ReactNode, Suspense } from 'react';
import { signal } from "@preact/signals";
import { useSignals } from "@preact/signals-react/runtime";
import { SiteType, SiteTypeQueryParamName } from "@/types/siteType";
import { useSearchParams } from "next/navigation";

export const siteTypeSignal = signal<SiteType | undefined>(undefined);

type Props = {
  readonly children: ReactNode;
  readonly siteType: SiteType;
};

function SiteSlotInternal({ children, siteType }: Props) {
  useSignals();
  const searchParams = useSearchParams();

  if (siteTypeSignal.value === undefined) {
    siteTypeSignal.value = searchParams.get(SiteTypeQueryParamName) as SiteType|null ?? SiteType.Landing;
  }

  return siteType === siteTypeSignal.value && children;
}

export function SiteSlot({ children, siteType }: Props) {
  return (
    <Suspense>
      <SiteSlotInternal children={children} siteType={siteType}/>
    </Suspense>
  )
}
