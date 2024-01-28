import React from 'react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User
} from '@nextui-org/react';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';

const UserDropdown = () => {
  const session = useSession({
    required: true
  });
  return (
    <Dropdown placement='bottom-start'>
      <DropdownTrigger>
        <User
          as='button'
          avatarProps={{
            isBordered: true,
            src: 'https://i.pravatar.cc/150?u=a042581f4e29026024d'
          }}
          className='transition-transform'
          description={session.data?.user?.email}
          name={session.data?.user?.name}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label='User Actions' variant='flat'>
        <DropdownItem key='profile' className='h-14 gap-2'>
          <p className='font-bold'>Signed in as</p>
          <p className='font-bold'>{session.data?.user?.name}</p>
        </DropdownItem>
        <DropdownItem key='logout' color='danger' onPress={() => signOut()}>
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default UserDropdown;
