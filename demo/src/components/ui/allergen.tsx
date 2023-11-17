import { Fragment } from 'react';

const allergens: {[index: string]:string} = {
  '1': 'mit Konservierungsstoff',
  '2': 'mit Farbstoff',
  '3': 'mit Antioxidationsmittel',
  '4': 'mit Süßungsmittel Saccharin',
  '5': 'mit Süßungsmittel Cyclamat',
  '6': 'mit Süßungsmittel Aspartam, enthält Phenylanunquelle',
  '7': 'mit Süßungsmittel Acesulfam',
  '8': 'mit Phosphat',
  '9': 'geschwefelt',
  '10': 'chininhaltig',
  '11': 'coffeinhaltig',
  '12': 'mit Geschmacksverstärker',
  '13': 'geschwärzt',
  '14': 'gewachst',
  '15': 'gentechnisch verändert',
  a: 'Glutenhaltiges Getreide',
  b: 'Krebstiere und daraus gewonnene Erzeugnisse',
  c: 'Eier und daraus gewonnene Erzeugnisse',
  d: 'Fische und daraus gewonnene Erzeugnisse',
  e: 'Erdnüsse und daraus gewonnene Erzeugnisse',
  f: 'Sojabohnen und daraus gewonnene Erzeugnisse',
  g: 'Milch und daraus gewonnene Erzeugnisse',
  h: 'Schalenfrüchte',
  i: 'Sellerie und daraus gewonnene Erzeugnisse',
  j: 'Senf und daraus gewonnene Erzeugnisse',
  k: 'Sesamsamen und daraus gewonnene Erzeugnisse',
  l: 'Schwefeldioxid und Sulphite',
  m: 'Lupinen und daraus gewonnene Erzeugnisse',
  n: 'Weichtiere und daraus gewonnene Erzeugnisse'
};

const Allergen = () => {
  return (
    <div className='mt-20 w-[90vw] max-w-[1170px] text-xs'>
      {Object.keys(allergens).map((value, index) => (
        <Fragment key={index}>
          <sup className='pr-0.5 font-bold'>{value}</sup>
          {Object.values(allergens)[index]}{' '}
        </Fragment>
      ))}
    </div>
  );
};

export { Allergen, allergens };
