import React, { useRef, useState } from 'react';
import { styled } from 'styled-components';
import {
  mixinBgTextDark,
  mixinBorderRadius8px,
  mixinPadding8px
} from '../../../../style/Mixin';
import { Flex, Tooltip } from 'antd';
import { Icon, TIconType } from '../../../../components/element/icon/Icon';
import { LinkIconSettingTooltip } from './LinkIconSettingTooltip';
import { TLinkIconList } from '../../types/TDetail';
import { useQueryClient } from 'react-query';

type TProps = {
  type: TIconType;
  isInTooltip: boolean;
  link?: string;
  name?: string;
  linkIconList?: TLinkIconList[];
};

export const LinkIcon = ({
  type,
  isInTooltip,
  link,
  name,
  linkIconList
}: TProps): React.JSX.Element => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const iconRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (link) {
      window.open(link);
      return;
    }
    setIsOpened(!isOpened);
  };

  return (
    <LinkIconSettingTooltip
      linkIconList={linkIconList || []}
      onOk={() => {
        queryClient.invalidateQueries('projectDetail');
        setIsOpened(false);
      }}
      isOpen={isOpened}
    >
      <Tooltip title={name}>
        <StyledBox ref={iconRef}>
          <StyledFlex
            justify="center"
            align="center"
            onClick={handleClick}
            $isInTooltip={isInTooltip}
          >
            <Icon type={type} />
          </StyledFlex>
        </StyledBox>
      </Tooltip>
    </LinkIconSettingTooltip>
  );
};

const StyledBox = styled.div`
  position: relative;
`;

const StyledFlex = styled(Flex)<{ $isInTooltip: boolean }>`
  width: 64px;
  height: 64px;
  cursor: pointer;
  ${mixinBgTextDark}
  ${mixinBorderRadius8px}
  ${mixinPadding8px}
`;
