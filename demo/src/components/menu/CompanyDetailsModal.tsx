import { CategoryItem } from '@/types/categoryItem';
import React, { Fragment } from 'react';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from '@nextui-org/react';
import Hero from '@/components/menu/Hero';
import MenuItemTitle from '@/components/menu/MenuItemTitle';

type Props = {
  isOpen: boolean;
  onOpenChange: () => void;
};

const CompanyDetailsModal = ({ isOpen, onOpenChange }: Props) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size={'lg'}
      scrollBehavior={'inside'}
      classNames={{
        body: 'px-0 py-0'
      }}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader>Über Losteria</ModalHeader>
            <ModalBody>
              <iframe
                src='https://maps.google.com/maps?q=Bertholdstraße+2,+33142+Büren&t=&z=15&ie=UTF8&iwloc=&output=embed'
                className='left-0 top-0 h-full w-full rounded-t-lg lg:rounded-bl-lg lg:rounded-tr-none'
                frameBorder='0'
                allowFullScreen
              ></iframe>

              <div className='container flex flex-col space-y-3 bg-white pt-4'>
                <h2 className='text-xl font-bold leading-6 text-gray-900'>
                  Adresse
                </h2>
                <div className='flex flex-col space-y-0 rounded-lg border border-gray-300 bg-[#f9fafb] p-3 shadow'>
                  <span>Losteria GmbH</span>
                  <span>Sesamstraße 123</span>
                  <span>12345 Mustercity</span>
                </div>
                <h2 className='pt-4 text-xl font-bold leading-6 text-gray-900'>
                  Öffnungszeiten
                </h2>
                <div className='grid grid-cols-3 rounded-lg border border-gray-300 bg-[#f9fafb] p-3 shadow'>
                  <div className=''>Montag</div>
                  <div className=' col-span-2'>-</div>
                  <div className=''>Dienstag</div>
                  <div className=' col-span-2'>16:00 - 18:00</div>
                  <div className=''>Mittwoch</div>
                  <div className=' col-span-2'>-</div>
                  <div className=''>Donnerstag</div>
                  <div className=' col-span-2'>16:00 - 18:00</div>
                  <div className=''>Freitag</div>
                  <div className=' col-span-2'>16:00 - 18:00</div>
                  <div className=''>Samstag</div>
                  <div className=' col-span-2'>16:00 - 18:00</div>
                  <div className=''>Sonntag</div>
                  <div className=' col-span-2'>16:00 - 18:00</div>
                </div>
                <h2 className='pt-4 text-xl font-bold leading-6 text-gray-900'>
                  Impressum
                </h2>
                <div className='flex flex-col space-y-0 rounded-lg border border-gray-300 bg-[#f9fafb] p-3 shadow'>
                  <span>Losteria GmbH</span>
                  <span>Sesamstraße 123</span>
                  <span>Vertretungsberechtigt: Max Mustermann</span>
                  <span>Fax: 012123123123</span>
                  <span className='mt-4'>
                    Registergericht: Amtsgericht Paderborn
                  </span>
                  <span>Registernummer: HRB 1233123</span>
                  <span className='mt-4'>MwSt-Nummer: DE311435310</span>
                  <span className='mt-4'>
                    Plattform der EU-Kommission zur Online-Streitbeilegung:
                    https://ec.europa.eu/consumers/odr
                  </span>
                </div>
              </div>
            </ModalBody>
            <ModalFooter />
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CompanyDetailsModal;
