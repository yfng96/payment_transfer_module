import { BankType, RecipientOptionType } from '~/types';

export const RECIPIENT_OPTIONS: RecipientOptionType[] = [
  {
    name: 'Bank Account / E-Wallet Number',
    type: 1,
  },
  {
    name: 'Mobile Number',
    type: 2,
  },
];

export const BANK_OPTIONS: BankType[] = [
  {
    name: 'Alliance Bank',
    code: 'ALLIANCE',
  },
  {
    name: 'Hong Leong Berhad',
    code: 'HLB',
  },
  {
    name: 'TNG Wallet',
    code: 'TNG',
  },
];
