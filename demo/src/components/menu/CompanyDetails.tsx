import * as React from 'react';
import { Button, useDisclosure } from '@nextui-org/react';
import Info from '@/components/icons/Info';
import CompanyDetailsModal from '@/components/menu/CompanyDetailsModal';
import { Hero, Information } from '@/types/restaurant2';
import { SiteSlot } from '@/components/slotting/SiteSlot';
import { SiteType } from '@/types/SiteType';
import CallWaiterModal from '@/components/menu/CallWaiterModal';

interface Props {
  companyHero: Hero;
  companyInformation: Information;
}

function CompanyDetails({ companyHero, companyInformation }: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { isOpen: isOpenWaiter, onOpen: onOpenWaiter, onOpenChange: onOpenChangeWaiter } = useDisclosure();

  return (
    <div className='w-full bg-white'>
      {/*Company details*/}
      <div className='container mx-auto flex max-w-5xl flex-col items-center justify-between space-y-5 bg-transparent pb-10 pt-5 sm:flex-row sm:items-stretch sm:space-y-0'>
        <div className='flex flex-col items-center sm:items-stretch'>
          <h1 className='text-3xl font-bold'>{companyHero.name}</h1>
          <span className='mt-2 text-sm text-gray-700'>{companyHero.name}</span>
        </div>
        <div className='flex flex-col items-center space-x-0 space-y-5 sm:flex-row sm:space-x-5 sm:space-y-0'>
          <SiteSlot siteType={SiteType.Waiter}>
            <Button
              variant='shadow'
              size='lg'
              radius='full'
              className='border-transparent bg-[#f5f3f1] hover:bg-[#ebe9e8]'
              onClick={onOpenWaiter}
            >
              Kellner rufen
            </Button>
            <CallWaiterModal isOpen={isOpenWaiter} onOpenChange={onOpenChangeWaiter} />
          </SiteSlot>
          <Button
            isIconOnly
            variant='shadow'
            size='lg'
            radius='full'
            className='border-transparent bg-[#f5f3f1] hover:bg-[#ebe9e8]'
            onClick={onOpen}
          >
            <Info />
          </Button>
          <CompanyDetailsModal isOpen={isOpen} onOpenChange={onOpenChange} companyInformation={companyInformation} />
        </div>
      </div>
    </div>
  );
}

export default CompanyDetails;
