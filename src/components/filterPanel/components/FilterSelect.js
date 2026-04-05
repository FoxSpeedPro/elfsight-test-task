import { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { ReactComponent as ChevronUp } from '../../../assets/icons/chevron-up.svg';
import { ReactComponent as CrossIcon } from '../../../assets/icons/cross-icon.svg';

export function FilterSelect({ placeholder, value, options, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);
  // FYI: Была проблема - парсинг species ронял апи с Too many rquests, сначала решила добавить вот такую заглушку
  // но потом добавила фолбэк в DataProvider - заглушку оставила на всякий случай, хотя технически нужды в ней уже нет
  const isDisabled = !options.length;

  useEffect(() => {
    function handleOutsideClick(e) {
      if (!selectRef.current?.contains(e.target)) {
        setIsOpen(false);
      }
    }

    function handleEscapeClose(e) {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEscapeClose);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscapeClose);
    };
  }, []);

  function handleToggle() {
    if (!isDisabled) {
      setIsOpen((prevState) => !prevState);
    }
  }

  function handleSelect(option) {
    onChange(option);
    setIsOpen(false);
  }

  function handleClear(e) {
    e.stopPropagation();
    onChange('');
    setIsOpen(false);
  }

  return (
    <SelectWrapper ref={selectRef}>
      <SelectButton disabled={isDisabled} type="button" onClick={handleToggle}>
        <SelectText hasValue={Boolean(value)}>
          {value || placeholder}
        </SelectText>

        {value ? (
          <ClearButton role="button" onClick={handleClear}>
            <CrossIcon width={16} height={16} />
          </ClearButton>
        ) : (
          <StyledChevron $isOpen={isOpen} width={16} height={16} />
        )}
      </SelectButton>

      <OptionsList visible={isOpen}>
        {options.map((option) => (
          <OptionButton
            key={option}
            type="button"
            selected={option === value}
            onClick={() => handleSelect(option)}
          >
            {option}
          </OptionButton>
        ))}
      </OptionsList>
    </SelectWrapper>
  );
}

const SelectWrapper = styled.div`
  grid-column: span 2;
  position: relative;
`;

const SelectButton = styled.button`
  width: 100%;
  height: 40px;
  padding: 12px 16px;
  border: 1px solid rgb(131, 191, 70);
  border-radius: 8px;
  background: rgb(38, 55, 80);
  box-sizing: border-box;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  outline: none;

  &:hover,
  &:focus {
    background: ${({ disabled }) =>
      disabled ? 'rgb(38, 55, 80)' : 'rgb(51, 68, 102)'};
  }
`;

const SelectText = styled.span`
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: ${({ hasValue }) => (hasValue ? '#fff' : 'rgb(179, 179, 179)')};
`;

const StyledChevron = styled(ChevronUp)`
  color: #fff;
  transition: transform 0.3s ease;
  transform: rotate(${({ $isOpen }) => ($isOpen ? '0deg' : '180deg')});
`;

const ClearButton = styled.span`
  flex-shrink: 0;
  color: #fff;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: rgb(131, 191, 70);
  }
`;

const OptionsList = styled.div`
  position: absolute;
  z-index: 5;
  top: calc(100% + 4px);
  left: 0;
  width: 100%;
  max-height: 152px;
  overflow-y: auto;
  background: rgb(255, 255, 255);
  border-radius: 8px;
  border: 1px solid rgb(217, 217, 217);
  box-shadow: 0 1px 4px rgba(12, 12, 13, 0.05), 0 1px 4px rgba(12, 12, 13, 0.1);
  opacity: 0;
  visibility: hidden;
  pointer-events: none;

  ${({ visible }) =>
    visible &&
    css`
      opacity: 1;
      visibility: initial;
      pointer-events: all;
    `}

  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgb(217, 217, 217);
    border: 4px solid rgb(255, 255, 255);
    width: 4px;
    border-radius: 8px;
  }
`;

const OptionButton = styled.button`
  width: 100%;
  height: 30px;
  border: none;
  background: transparent;
  color: rgb(30, 30, 30);
  text-align: left;
  padding: 4px 8px;
  cursor: pointer;

  ${({ selected }) =>
    selected &&
    css`
      font-weight: 700;
    `}

  &:hover {
    background: rgba(131, 191, 70, 0.2);
  }
`;
