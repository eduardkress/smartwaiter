import AddressBook from '@/components/icons/AddressBook';
import { Fragment } from 'react';
import { Divider } from '@nextui-org/react';
import { Hero, Information } from '@/types/restaurant2';

interface Props {
  companyInformation: Information;
}

function Footer({ companyInformation }: Props) {
  return (
    <div className='flex flex-col space-y-8 py-8 shadow-inner'>
      <div className='flex flex-col justify-center space-x-0 space-y-2 text-center text-medium font-bold text-gray-600 sm:flex-row sm:space-x-10 sm:space-y-0'>
        <div>AGB</div>
        <div>Datenschutzerklärung</div>
        <div>Impressum</div>
      </div>
      <div className='flex justify-center'>
        <Divider className='max-w-xs sm:max-w-xl md:max-w-3xl' />
      </div>
      <div className='flex flex-col justify-center space-x-0 space-y-2 text-center text-sm text-gray-400 sm:flex-row sm:space-x-10 sm:space-y-0'>
        <div>&copy; 2024 {companyInformation.colophon.companyName}</div>
        <div>Powered by Smartwaiter</div>
      </div>
    </div>
  );
}

export default Footer;
