import * as React from 'react';
import { Button, useDisclosure } from '@nextui-org/react';
import Info from '@/components/icons/Info';
import CompanyDetailsModal from '@/components/menu/CompanyDetailsModal';
import { Hero, Information } from '@/types/restaurant2';
import { SiteSlot } from '@/components/slotting/SiteSlot';
import { SiteType } from '@/types/SiteType';

interface Props {
  companyHero: Hero;
  companyInformation: Information;
}

function CompanyDetails({ companyHero, companyInformation }: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className='w-full bg-white'>
      {/*Company details*/}
      <div className='container mx-auto flex max-w-5xl flex-col items-center justify-between space-y-5 bg-transparent pb-10 pt-5 sm:flex-row sm:items-stretch sm:space-y-0'>
        <div className='flex flex-col items-center sm:items-stretch'>
          <h1 className='text-3xl font-bold'>{companyHero.name}</h1>
          <span className='mt-2 text-sm text-gray-700'>{companyHero.name}</span>
        </div>

        <SiteSlot siteType={SiteType.Landing}>
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
          {/*TODO: Make this modal only for Landing*/}
          <CompanyDetailsModal isOpen={isOpen} onOpenChange={onOpenChange} companyInformation={companyInformation} />
        </SiteSlot>
        <SiteSlot siteType={SiteType.Waiter}>
          {/*TODO: Add button to call waiter*/}
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
          {/*TODO: Make this modal only for Waiter*/}
          <CompanyDetailsModal isOpen={isOpen} onOpenChange={onOpenChange} companyInformation={companyInformation} />
        </SiteSlot>
      </div>
    </div>
  );
}

export default CompanyDetails;
