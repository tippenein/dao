import { useState, type JSX } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '@/components/ui/input';
import { truncateAddress } from '@/lib/utils';
import { useConnect } from '@stacks/connect-react';
import {
  StacksDevnet,
  StacksMocknet,
  StacksMainnet,
  StacksTestnet
} from '@stacks/network';
import { AnchorMode, cvToValue } from '@stacks/transactions';
import {
  callReadOnlyFunction,
  standardPrincipalCV
} from '@stacks/transactions';

export const MemberView: React.FC = () => {

  const onProposeClick = () => {
    console.log("proposal")
  }
  return (
    <Button onClick={onProposeClick}><span>Propose</span></Button>
  )
}
