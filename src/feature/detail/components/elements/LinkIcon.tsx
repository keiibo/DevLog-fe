import React, { useRef, useState } from 'react';
import { styled } from 'styled-components';
import {
  mixinBgTextDark,
  mixinBorderRadius8px,
  mixinPadding8px
} from '../../../../style/Mixin';
import { Flex, Tooltip } from 'antd';
import {
  Icon,
  IconType,
  TIconType
} from '../../../../components/element/icon/Icon';
import { LinkIconSettingTooltip } from './LinkIconSettingTooltip';
import { TLinkIcon } from '../../types/TDetail';
import { useQueryClient } from '@tanstack/react-query';
import { QueryKey } from '../../../../constant/QueryKey';

type TProps = {
  type: TIconType;
  link?: string;
  name?: string;
  uuid: string;
  isInTooltip: boolean;
  linkIconList?: TLinkIcon[];
};

export const LinkIcon = ({
  type,
  isInTooltip,
  link,
  name,
  uuid,
  linkIconList
}: TProps): React.JSX.Element => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const iconRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const LONG_PRESS_DURATION = 500; // 長押しとみなす時間（ミリ秒）

  const cancelPressTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };
  const handleMouseDown = () => {
    timerRef.current = setTimeout(() => {
      setIsOpened(true);
    }, LONG_PRESS_DURATION);
  };

  const handleMouseUp = () => {
    cancelPressTimer();
    // 通常のクリックとして扱う
    if (!isOpened) {
      if (link) {
        window.open(link);
        return;
      }
      setIsOpened(!isOpened);
    }
  };
  const handleMouseLeave = () => {
    cancelPressTimer();
  };

  return (
    <LinkIconSettingTooltip
      linkIconList={linkIconList || []}
      setLinkIcon={{
        url: link || '',
        iconType: type || '',
        name: name || '',
        uuid: uuid || ''
      }}
      onOk={() => {
        queryClient.invalidateQueries({ queryKey: [QueryKey.PROJECT_DETAIL] });
        setIsOpened(false);
      }}
      isOpen={isOpened}
      setIsOpened={setIsOpened}
      hasDelete={type !== IconType.PLUS}
    >
      <Tooltip title={name}>
        <StyledBox ref={iconRef}>
          <StyledFlex
            justify="center"
            align="center"
            $isInTooltip={isInTooltip}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
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
