import { Option } from '@/types/restaurant';
import React, { useState } from 'react';
import {
  Accordion,
  AccordionItem,
  Checkbox,
  CheckboxGroup
} from '@nextui-org/react';

interface Props {
  options: Array<Option>;
  selectedOptions: { [key: string]: string[] };
  setSelectedOptions: React.Dispatch<
    React.SetStateAction<{ [key: string]: string[] }>
  >;
  optionGroupId: string;
}

const MenuModalItemCheckboxGroup = ({
  options,
  selectedOptions,
  setSelectedOptions,
  optionGroupId
}: Props) => {
  return (
    <CheckboxGroup
      value={selectedOptions[optionGroupId]}
      onValueChange={(selectedValues) => {
        setSelectedOptions((prevData) => ({
          ...prevData,
          [optionGroupId]: selectedValues
        }));
      }}
    >
      {options.map((option, index) => {
        return (
          <Checkbox
            key={index}
            value={option.id}
          >
            {option.name}
            {option.prices.pickup > 0 ? (
              <>
                {' '}
                (+
                {option.prices.pickup / 100} €)
              </>
            ) : (
              ''
            )}
          </Checkbox>
        );
      })}
    </CheckboxGroup>
  );
};

const MenuModalItemExtras = ({
  options,
  selectedOptions,
  setSelectedOptions,
  optionGroupId
}: Props) => {
  return (
    <div className='flex flex-col gap-2'>
      <MenuModalItemCheckboxGroup
        options={options.filter((value, index1) => index1 < 4)}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
        optionGroupId={optionGroupId}
      />
      {options.length > 4 &&
        (() => {
          const [selectedKeys, setSelectedKeys] = useState<Set<string>|undefined>(undefined);

          return (
            <div>
              <Accordion
                selectedKeys={selectedKeys}
                itemClasses={{
                  base: 'px-0',
                  title: 'py-0 h-0',
                  trigger: 'px-0 py-0 hidden',
                  indicator: 'hidden',
                  content: 'px-0 py-0'
                }}
                className='px-0'
              >
                <AccordionItem key='1' aria-label='Accordion 1' title=''>
                  <MenuModalItemCheckboxGroup
                    options={options.filter((value, index1) => index1 >= 4)}
                    selectedOptions={selectedOptions}
                    setSelectedOptions={setSelectedOptions}
                    optionGroupId={optionGroupId}
                  />
                </AccordionItem>
              </Accordion>
              {selectedKeys === undefined ? (
                <div
                  className='mt-2 cursor-pointer text-base underline'
                  onClick={() => setSelectedKeys(new Set(['1']))}
                >
                  Zeige mehr...
                </div>
              ) : (
                <div
                  className='mt-2 cursor-pointer text-base underline'
                  onClick={() => setSelectedKeys(undefined)}
                >
                  Zeige weniger...
                </div>
              )}
            </div>
          );
        })()}
    </div>
  );
};

export default MenuModalItemExtras;
