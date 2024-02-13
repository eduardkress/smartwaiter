import { Option } from '@/types/restaurant2';
import React from 'react';
import { Radio, RadioGroup } from '@nextui-org/react';
import { EURO } from '@/utils/currencies';

interface Props {
  options: Array<Option>;
  handleOptionsChange: (optionGroupId: string, selectedOptions: string[]) => void;
  optionGroupId: string;
}

const MenuModalItemRadioGroup = ({ options, handleOptionsChange, optionGroupId }: Props) => {
  return (
    <RadioGroup
      //value={selectedOptions[optionGroupId] || { '': [] }}
      onValueChange={(selectedValue) => {
        handleOptionsChange(optionGroupId, [selectedValue]);
      }}
    >
      {options.map((option, index) => {
        return (
          <Radio key={index} value={option.id}>
            {option.name}
            {option.prices.onsite > 0 && EURO.formatCents(option.prices.onsite)}
            {option.prices.onsite > 0 ? (
              <>
                {' '}
                (+
                {option.prices.onsite / 100} €)
              </>
            ) : (
              ''
            )}
          </Radio>
        );
      })}
    </RadioGroup>
  );
};

// const MenuModalItemRadioGroupWithAccordion = ({ options, handleOptionsChange, optionGroupId }: Props) => {
//   const [selectedKeys, setSelectedKeys] = useState<Set<string> | undefined>(undefined);

//   return (
//     <div>
//       <Accordion
//         selectedKeys={selectedKeys}
//         itemClasses={{
//           base: 'px-0',
//           title: 'py-0 h-0',
//           trigger: 'px-0 py-0 hidden',
//           indicator: 'hidden',
//           content: 'px-0 py-0 overflow-hidden',
//         }}
//         className='px-0'
//       >
//         <AccordionItem key='1' aria-label='Accordion 1' title=''>
//           <MenuModalItemRadioGroup
//             options={options}
//             handleOptionsChange={handleOptionsChange}
//             optionGroupId={optionGroupId}
//           />
//         </AccordionItem>
//       </Accordion>
//       {selectedKeys === undefined ? (
//         <div className='mt-2 cursor-pointer text-base underline' onClick={() => setSelectedKeys(new Set(['1']))}>
//           Zeige mehr...
//         </div>
//       ) : (
//         <div className='mt-2 cursor-pointer text-base underline' onClick={() => setSelectedKeys(undefined)}>
//           Zeige weniger...
//         </div>
//       )}
//     </div>
//   );
// }

const MenuModalItemExtrasSingleWaiter = ({ options, handleOptionsChange, optionGroupId }: Props) => {
  return (
    <div className='flex flex-col gap-2'>
      <MenuModalItemRadioGroup
        options={options}
        handleOptionsChange={handleOptionsChange}
        optionGroupId={optionGroupId}
      />
    </div>
  );
};

export default MenuModalItemExtrasSingleWaiter;
