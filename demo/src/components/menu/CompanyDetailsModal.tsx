import React, { Fragment } from 'react';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import { Information } from '@/types/restaurant2';
import ColophonCorporation from '@/components/menu/ColophonCorporation';
import { SiteSlot } from '@/components/slotting/SiteSlot';
import { SiteType } from '@/types/SiteType';
import { EURO } from '@/utils/currencies';

type Props = {
  isOpen: boolean;
  onOpenChange: () => void;
  companyInformation: Information;
};

function timeSlot(dayName: string, dayTimes: string[] | undefined) {
  return (
    dayName !== 'Feiertage' && (
      <Fragment>
        <div className=''>{dayName}</div>
        <div className='col-span-2 justify-self-end'>
          {dayTimes && dayTimes.length > 0
            ? dayTimes.map((timeslot, index) => (
                <Fragment key={index}>
                  {timeslot}
                  {index !== dayTimes.length - 1 && <br />}
                </Fragment>
              ))
            : '-'}
        </div>
      </Fragment>
    )
  );
}

function deliverySlot(information: string, informationValue: string | number) {
  return (
    <Fragment>
      <div className=''>{information}</div>
      <div className='col-span-2 justify-self-end'>
        {(() => {
          switch (typeof informationValue) {
            case 'number':
              return EURO.formatCents(informationValue);
            case 'string':
              return informationValue;
          }
        })()}
      </div>
    </Fragment>
  );
}

const CompanyDetailsModal = ({ isOpen, onOpenChange, companyInformation }: Props) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size={'lg'}
      scrollBehavior={'inside'}
      classNames={{
        body: 'px-0 py-0',
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
                <h2 className='text-xl font-bold leading-6 text-gray-900'>Adresse</h2>
                <div className='flex flex-col space-y-0 rounded-lg border border-gray-300 bg-[#f9fafb] p-3 shadow'>
                  <span>Losteria GmbH</span>
                  <span>Sesamstraße 123</span>
                  <span>12345 Mustercity</span>
                </div>
                <h2 className='pt-4 text-xl font-bold leading-6 text-gray-900'>Öffnungszeiten</h2>
                <div className='grid grid-cols-3 gap-y-1.5 rounded-lg border border-gray-300 bg-[#f9fafb] p-3 shadow'>
                  {timeSlot('Montag', companyInformation.openingHours.Monday)}
                  {timeSlot('Dienstag', companyInformation.openingHours.Tuesday)}
                  {timeSlot('Mittwoch', companyInformation.openingHours.Wednesday)}
                  {timeSlot('Donnerstag', companyInformation.openingHours.Thursday)}
                  {timeSlot('Freitag', companyInformation.openingHours.Friday)}
                  {timeSlot('Samstag', companyInformation.openingHours.Saturday)}
                  {timeSlot('Sonntag', companyInformation.openingHours.Sunday)}
                  {timeSlot('Feiertage', companyInformation.openingHours.Holidays)}
                </div>
                <SiteSlot siteType={SiteType.Landing}>
                  <h2 className='pt-4 text-xl font-bold leading-6 text-gray-900'>Kontakt</h2>
                  <div className='grid grid-cols-3 gap-y-1.5 rounded-lg border border-gray-300 bg-[#f9fafb] p-3 shadow'>
                    {deliverySlot('Telefon', companyInformation.contact.telephone)}
                    {companyInformation.contact.whatsapp &&
                      deliverySlot('WhatsApp', companyInformation.contact.whatsapp)}
                    {companyInformation.contact.mail && deliverySlot('Mail', companyInformation.contact.mail)}
                  </div>
                  {companyInformation.delivery && (
                    <Fragment>
                      <h2 className='pt-4 text-xl font-bold leading-6 text-gray-900'>Lieferung</h2>
                      <div className='flex flex-col space-y-1.5 rounded-lg border border-gray-300 bg-[#f9fafb] p-3 shadow'>
                        {companyInformation.delivery.map((value, index) => (
                          <div className='grid grid-cols-3' key={index}>
                            {value.deliveryZone && <span className='col-span-3 font-bold'>{value.deliveryZone}</span>}
                            {deliverySlot('Mindestbestellwert', value.minimumOrderValue)}
                            {deliverySlot('Lieferkosten', value.deliveryCost)}
                          </div>
                        ))}
                      </div>
                    </Fragment>
                  )}
                </SiteSlot>
                <h2 className='pt-4 text-xl font-bold leading-6 text-gray-900'>Impressum</h2>
                <div className='flex flex-col space-y-0 rounded-lg border border-gray-300 bg-[#f9fafb] p-3 shadow'>
                  {/*TODO: Create a colophon component for each different type*/}
                  {(() => {
                    switch (companyInformation.colophon.businessType) {
                      case 'Corporation':
                        return <ColophonCorporation colophon={companyInformation.colophon} />;
                      case 'Freelancer':
                        return <Fragment />;
                      case 'OneManBusiness':
                        return <Fragment />;
                      case 'Partnership':
                        return <Fragment />;
                    }
                  })()}
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
