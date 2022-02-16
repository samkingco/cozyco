import { connectOptions } from "@cozy/utils/connectOptions";
import { fetcher } from "@cozy/utils/fetch";
import { useWallet } from "@gimmixorg/use-wallet";
import * as Popover from "@radix-ui/react-popover";
import { useState } from "react";
import styled from "styled-components";
import useSWR from "swr";
import { Button, buttonStyles } from "./Button";
import { ChevronDownIcon } from "./icons/ChevronDownIcon";
import { CoffeeIcon } from "./icons/CoffeeIcon";
import { DisconnectIcon } from "./icons/DisconnectIcon";
import withMargin from "./withMargin";

const ConnectButton = styled(Button)`
  &:hover:not(:disabled),
  &:focus-visible {
    background: ${(p) => p.theme.colors.bgMuted};
  }
`;

const DropdownList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  background: ${(p) => p.theme.colors.bgMuted};
  padding: 12px;
  margin-top: 4px;
  z-index: 100;
  border-radius: 12px;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.08);
`;

const DropdownItem = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: ${(p) => p.theme.colors.bgMuted};
  color: ${(p) => p.theme.colors.fgStrong};
  font-family: ${(p) => p.theme.fonts.body};
  font-size: ${(p) => p.theme.fontSizes.s};
  line-height: 1.25;
  font-weight: normal;
  cursor: pointer;
  text-decoration: none;
  text-align: left;
  -webkit-appearance: none;
  -moz-appearance: none;
  outline: none;
  overflow: hidden;
  cursor: pointer;
  transition: background-color 150ms ease;
  border-radius: 4px;
  padding: 8px 12px;

  &:hover {
    background: ${(p) => p.theme.colors.bgBase};
  }
`;

const DropdownTrigger = styled(Popover.Trigger)`
  position: relative;
  gap: 8px;
  ${buttonStyles};

  &:hover:not(:disabled),
  &:focus-visible {
    background: ${(p) => p.theme.colors.bgMuted};
  }

  ${withMargin};
`;

const AvatarWrapper = styled.div`
  width: 32px;
  height: 32px;
  margin: -4px 0 -4px -8px;
  border-radius: 4px;
  overflow: hidden;
`;

const FallbackAvatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: ${(p) => p.theme.colors.bgStrong};
  color: ${(p) => p.theme.colors.fgBase};
`;

interface ENSLookupResponse {
  address: string;
  name: string;
  displayName: string;
  avatar: string;
}

interface AdditionalOption {
  id: string;
  label: React.ReactNode;
  onClick: () => void;
}

interface Props {
  additionalOptions?: AdditionalOption[];
}

export function ConnectWalletButton({ additionalOptions = [] }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { account, connect, disconnect } = useWallet();
  const { data: ensAccount } = useSWR<ENSLookupResponse>(
    account ? `https://api.ensideas.com/ens/resolve/${account}` : null,
    fetcher
  );

  const avatar =
    ensAccount && ensAccount.avatar ? (
      <img src={ensAccount.avatar} width={32} height={32} />
    ) : (
      <FallbackAvatar>
        <CoffeeIcon />
      </FallbackAvatar>
    );

  return account ? (
    <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
      <DropdownTrigger>
        <AvatarWrapper>{avatar}</AvatarWrapper>
        {ensAccount ? ensAccount.displayName : "connecting…"}
        <ChevronDownIcon />
      </DropdownTrigger>
      <Popover.Content align="end">
        <DropdownList>
          <DropdownItem
            onClick={() => {
              disconnect();
              setIsOpen(false);
            }}
          >
            <DisconnectIcon />
            Disconnect wallet
          </DropdownItem>
          {additionalOptions.map(({ id, label, onClick }) => (
            <DropdownItem
              key={id}
              onClick={() => {
                onClick();
                setIsOpen(false);
              }}
            >
              {label}
            </DropdownItem>
          ))}
        </DropdownList>
      </Popover.Content>
    </Popover.Root>
  ) : (
    <ConnectButton onClick={() => connect(connectOptions)}>
      Connect wallet
    </ConnectButton>
  );
}
