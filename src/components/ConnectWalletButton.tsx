import { connectOptions } from "@cozy/utils/connectOptions";
import { fetcher } from "@cozy/utils/fetch";
import { useWallet } from "@gimmixorg/use-wallet";
import { Menu, MenuButton, MenuItem, MenuList } from "@reach/menu-button";
import "@reach/menu-button/styles.css";
import styled from "styled-components";
import useSWR from "swr";
import { Button, buttonStyles } from "./Button";
import { ChevronDownIcon } from "./icons/ChevronDownIcon";
import { CoffeeIcon } from "./icons/CoffeeIcon";
import withMargin from "./withMargin";

const ConnectButton = styled(Button)`
  &:hover:not(:disabled),
  &:focus-visible {
    background: ${(p) => p.theme.colors.bgMuted};
  }
`;

const DropdownList = styled(MenuList)`
  &[data-reach-menu-list],
  &[data-reach-menu-items] {
    min-width: 100%;
    display: block;
    white-space: nowrap;
    border: none;
    background: ${(p) => p.theme.colors.bgMuted};
    padding: 12px;
    margin-top: 4px;
    font-size: inherit;
    position: relative;
    z-index: 100;
    border-radius: 12px;
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.08);
  }
`;

const DropdownItem = styled(MenuItem)`
  font-size: ${(p) => p.theme.fontSizes.s};
  border-radius: 4px;

  &[data-reach-menu-item] {
    padding: 8px 12px;
  }
  &[data-reach-menu-item][data-selected] {
    background: ${(p) => p.theme.colors.bgBase};
    color: inherit;
  }
`;

const DropdownTrigger = styled(MenuButton)`
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
  label: string;
  onSelect: () => void;
}

interface Props {
  additionalOptions?: AdditionalOption[];
}

export function ConnectWalletButton({ additionalOptions = [] }: Props) {
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
    <Menu>
      <DropdownTrigger>
        <AvatarWrapper>{avatar}</AvatarWrapper>
        {ensAccount ? ensAccount.displayName : "connecting…"}
        <ChevronDownIcon />
      </DropdownTrigger>
      <DropdownList>
        <DropdownItem onSelect={disconnect}>Disconnect wallet</DropdownItem>
        {additionalOptions.map(({ id, label, onSelect }) => (
          <DropdownItem key={id} onSelect={onSelect}>
            {label}
          </DropdownItem>
        ))}
      </DropdownList>
    </Menu>
  ) : (
    <ConnectButton onClick={() => connect(connectOptions)}>
      Connect wallet
    </ConnectButton>
  );
}
