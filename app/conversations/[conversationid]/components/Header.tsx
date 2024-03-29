'use client';

import Avatar from '@/app/_components/Avatar';
import useOtherUser from '@/app/hooks/useOtherUser';
import { Conversation, User } from '@prisma/client';
import Link from 'next/link';
import React, { useState } from 'react';
import { HiChevronLeft } from 'react-icons/hi';
import { HiEllipsisHorizontal } from 'react-icons/hi2';
import ProfileModal from './ProfileModal';

interface IConversationIdHeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}
const Header: React.FC<IConversationIdHeaderProps> = ({ conversation }) => {
  const [isProfileModal, setIsProfileModal] = useState(false);

  const otherUser = useOtherUser(conversation);

  const statusText = React.useMemo(() => {
    if (conversation?.isGroup) {
      return `${conversation.users.length} participants`;
    }
    return 'Active';
  }, [conversation]);

  return (
    <>
      <div className='bg-white w-full flex border-b-[1px] sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm'>
        <div className='flex gap-3 items-center'>
          <Link
            href='/conversations'
            className='lg:hidden block text-sk-500 hover:text-sky-600 transition cursor-pointer'
          >
            <HiChevronLeft size={32} />
          </Link>

          <Avatar user={otherUser!} />

          <div className='flex flex-col'>
            <div>{conversation?.name || otherUser?.name}</div>
            <div className='text-sm font-light text-neutral-500'>
              {statusText}
            </div>
          </div>
        </div>
        <HiEllipsisHorizontal
          onClick={() => setIsProfileModal(true)}
          size={32}
          className='text-sky-500 cursor-pointer hover:text-sky-600 transition'
        />
      </div>
      <ProfileModal
        data={conversation}
        isOpen={isProfileModal}
        onClose={() => setIsProfileModal(false)}
      />
    </>
  );
};

export default Header;
