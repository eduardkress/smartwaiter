import Link from 'next/link';
import { HiClock, HiMapPin, HiPhone } from 'react-icons/hi2';
import StarFull from '@/components/icons/StarFull';
import {Button, useDisclosure} from "@nextui-org/react";
import {InfoIcon} from "@nextui-org/shared-icons";
import Info from "@/components/icons/Info";
import * as React from "react";
import CompanyDetailsModal from "@/components/menu/CompanyDetailsModal";

interface Props {
  companyName: string;
  companySlogan: string;
}

function CompanyDetails({ companyName, companySlogan }: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className='w-full bg-white'>
      {/*Company details*/}
      <div className='container mx-auto flex max-w-5xl flex-col items-center justify-between space-y-5 bg-transparent pb-10 pt-5 sm:flex-row sm:items-stretch sm:space-y-0'>
        <div className='flex flex-col items-center sm:items-stretch'>
          <h1 className='text-3xl font-bold'>{companyName}</h1>
          <div className='mt-2 text-sm text-gray-600'>
            <div className='flex flex-row flex-nowrap gap-x-2'>
              <div className='flex flex-row flex-nowrap fill-yellow-600'>
                <StarFull />
                <StarFull />
                <StarFull />
                <StarFull />
                <StarFull />
              </div>
              <Link href='/' className='text-sm font-light underline'>
                80 Bewertungen
              </Link>
            </div>
          </div>
          <span className='mt-2 text-sm text-gray-700'>{companySlogan}</span>
        </div>
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
      </div>
      <CompanyDetailsModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  );
}

export default CompanyDetails;
