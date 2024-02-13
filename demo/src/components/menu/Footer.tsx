import AddressBook from '@/components/icons/AddressBook';

function Footer() {
  return (
    <div className='container mx-auto my-8'>
      {/*Impressum*/}
      <div className='flex flex-col justify-center gap-y-2'>
        <div className='flex flex-row flex-nowrap items-center gap-x-1'>
          <div className='h-6 w-6 fill-black'>
            <AddressBook />
          </div>
          <span className='font-bold'>Impressum</span>
        </div>
        <div className='flex flex-col flex-nowrap text-sm text-gray-400'>
          <span>Losteria GmbH</span>
          <span>Sesamstraße 123</span>
          <span>Vertretungsberechtigt: Max Mustermann</span>
          <span>Fax: 012123123123</span>
          <span className='mt-4'>Registergericht: Amtsgericht Paderborn</span>
          <span>Registernummer: HRB 1233123</span>
          <span className='mt-4'>MwSt-Nummer: DE311435310</span>
          <span className='mt-4'>
            Plattform der EU-Kommission zur Online-Streitbeilegung: https://ec.europa.eu/consumers/odr
          </span>
        </div>
      </div>
    </div>
  );
}

export default Footer;
