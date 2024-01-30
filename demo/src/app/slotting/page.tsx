'use client';

import { setSiteType, SiteSlot } from '@/components/slotting/SiteSlot';
import { SiteType } from '@/types/SiteType';

export default function Page() {
  setSiteType(SiteType.Landing);

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
              setSiteType(SiteType.Waiter);
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
