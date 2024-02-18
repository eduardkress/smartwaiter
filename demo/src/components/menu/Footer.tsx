import { Divider, useDisclosure } from '@nextui-org/react';
import { Information } from '@/types/restaurant2';
import ColophonModal from '@/components/menu/ColophonModal';

interface Props {
  companyInformation: Information;
}

function Footer({ companyInformation }: Props) {
  const { isOpen: isOpenColophon, onOpen: onOpenColophon, onOpenChange: onOpenChangeColophon } = useDisclosure();
  const { isOpen: isOpenTos, onOpen: onOpenTos, onOpenChange: onOpenChangeTos } = useDisclosure();
  const { isOpen: isOpenDataProt, onOpen: onOpenDataProt, onOpenChange: onOpenChangeDataProt } = useDisclosure();

  return (
    <div className='flex flex-col space-y-8 py-8 shadow-inner'>
      <div className='flex flex-col justify-center space-x-0 space-y-2 text-center text-medium font-bold text-gray-600 sm:flex-row sm:space-x-10 sm:space-y-0'>
        <div>AGB</div>
        <div>Datenschutzerklärung</div>
        <div className='cursor-pointer' onClick={onOpenColophon}>
          Impressum
        </div>
      </div>
      <div className='flex justify-center'>
        <Divider className='max-w-xs sm:max-w-xl md:max-w-3xl' />
      </div>
      <div className='flex flex-col justify-center space-x-0 space-y-2 text-center text-sm text-gray-400 sm:flex-row sm:space-x-10 sm:space-y-0'>
        <div>&copy; 2024 {companyInformation.colophon.companyName}</div>
        <div>Powered by Smartwaiter</div>
      </div>
      <ColophonModal
        isOpen={isOpenColophon}
        onOpenChange={onOpenChangeColophon}
        companyInformation={companyInformation}
      />
    </div>
  );
}

export default Footer;
