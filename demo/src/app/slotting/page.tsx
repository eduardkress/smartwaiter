'use client';

import { SiteSlot, siteTypeSignal } from '@/components/slotting/SiteSlot';
import { SiteType } from '@/types/SiteType';
import { useSignals } from "@preact/signals-react/runtime";

export default function Page() {
  useSignals();
  return (
    <div>
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
        <button
          onClick={() => {
            siteTypeSignal.value = SiteType.Landing;
          }}
        >
          Change to Landing
        </button>
      </SiteSlot>
    </div>
  );
}
