import tw from 'twin.macro';
import {
  ArrowUpIcon,
  ArrowDownIcon,
  InfoIcon,
  PinIcon,
} from '@primer/octicons-react';
import { FilterValue, CategoryValue } from '../types';

interface HeaderProps {
  style: object;
  cellInfo: object;
  cellType: string;
  width?: number;
  columnName: string;
  activeSortDirection?: string;
  metadata?: string;
  originalData: any[];
  filteredData: any[];
  possibleValues?: CategoryValue[];
  filter?: FilterValue;
  focusedValue?: number;
  showFilters: boolean;
  isFirstColumn: boolean;
  isSticky: boolean;
  onFilterChange: Function;
  onSort: Function;
  onSticky: Function;
}
export function Header(props: HeaderProps) {
  const {
    style,
    columnName,
    activeSortDirection,
    width,
    metadata,
    originalData,
    filteredData,
    possibleValues,
    filter,
    cellType,
    cellInfo,
    focusedValue,
    showFilters,
    isFirstColumn,
    isSticky,
    onFilterChange,
    onSort,
    onSticky,
  } = props;

  // const popoverAnchorRef = React.createRef<HTMLDivElement>();

  // @ts-ignore
  const { filter: FilterComponent } = cellInfo;

  return (
    <div
      className="sticky-grid__header"
      tw="border-b border-r bg-white border-gray-200 flex-col"
      style={{ ...style }}
    >
      <div
        className="header"
        tw="relative border-b border-gray-200 bg-white flex items-center flex-shrink-0"
        style={{ height: 37 }}
        // ref={popoverAnchorRef}
      >
        <div
          className="header__title group"
          tw="absolute top-0 left-0 bottom-0 z-10 bg-gray-50 text-gray-600 shadow-md flex items-center"
        >
          <button
            className="pin"
            css={[
              tw`h-full p-2 border-indigo-100 focus:bg-indigo-100 hover:bg-indigo-100 appearance-none focus:opacity-100 group-hover:opacity-100 text-indigo-400 bg-indigo-50 focus:ring-indigo-300`,
              isSticky ? tw`opacity-100` : tw`opacity-0 -ml-6 shadow-md`,
            ]}
            onClick={() => onSticky()}
          >
            <PinIcon />
          </button>
          <button
            className="group"
            tw="flex justify-between items-center h-full p-2 border-white focus:bg-white hover:bg-white appearance-none flex-1 min-w-0"
            onClick={() =>
              onSort(columnName, activeSortDirection == 'asc' ? 'desc' : 'asc')
            }
          >
            <span
              css={[
                tw`text-sm font-medium truncate text-left`,
                ['integer', 'number'].includes(cellType) && tw`text-right`,
              ]}
              title={columnName}
              style={{ minWidth: 'calc(100% - 1.5em)' }}
            >
              {columnName}
              {!!metadata && (
                <span tw="pl-2 inline-block text-gray-300">
                  <InfoIcon />
                </span>
              )}
            </span>
            <div
              className="header__icon"
              css={[
                tw`flex items-center justify-center pl-1 pr-2 -mr-2`,
                activeSortDirection
                  ? tw`opacity-100`
                  : tw`opacity-0 group-hover:opacity-40`,
              ]}
            >
              {activeSortDirection == 'desc' ? (
                <ArrowDownIcon />
              ) : (
                <ArrowUpIcon />
              )}
            </div>
          </button>
          {!!metadata && (
            <div tw="text-sm absolute bottom-0 bg-white p-4 text-indigo-500 transform translate-y-full border border-indigo-300 py-3 shadow-md left-0 right-0 pointer-events-none opacity-0 group-hover:opacity-100">
              <div tw="pr-2 inline-block text-indigo-200">
                <InfoIcon />
              </div>
              {metadata}
            </div>
          )}
        </div>
      </div>
      {showFilters && (
        <div
          css={[
            tw`flex-1 flex flex-col p-2 justify-center items-start`,
            isFirstColumn && tw`pl-8`,
          ]}
        >
          <FilterComponent
            id={columnName}
            onChange={onFilterChange}
            originalData={originalData}
            filteredData={filteredData}
            value={filter}
            possibleValues={possibleValues}
            maxWidth={width}
            // @ts-ignore
            shortFormat={cellInfo.shortFormat}
            // @ts-ignore
            longFormat={cellInfo.format}
            focusedValue={focusedValue}
          />
        </div>
      )}
    </div>
  );
}
