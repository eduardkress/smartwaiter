'use client';

import { SiteSlot, siteTypeSignal } from '@/components/slotting/SiteSlot';
import { SiteType } from '@/types/SiteType';
import { useEffect } from 'react';

export default function Page() {
  useEffect(() => {
    const unsubscribe = siteTypeSignal.subscribe((value) => {
      console.log('Signal siteTypeSignal hat ein neuen Wert ', value);
    });

    return () => {
      unsubscribe();
    };
  });

  return (
    <div>
      <button
        onClick={() => {
          siteTypeSignal.value = SiteType.Landing;
        }}
      >
        Change to Landing
      </button>
      <SiteSlot siteType={SiteType.Landing}>
        das ist ein test und sollte angezeigt werden
        <div>mit mehreren divs</div>
        <div>
          mit mehreren divs2
          <div>mit mehreren divs3</div>
          <button
            onClick={(evt) => {
              evt.preventDefault();
              siteTypeSignal.value = SiteType.Waiter;
            }}
          >
            Change to Waiter
          </button>
        </div>
      </SiteSlot>
      <SiteSlot siteType={SiteType.Waiter}>
        Das sollte nicht angezeigt werden
      </SiteSlot>
    </div>
  );
}
