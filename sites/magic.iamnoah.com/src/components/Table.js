import * as React from 'react';
import styled from 'styled-components';
import { Spacer } from '@magusn/react';

const px = (pixels) => `${pixels}px`;

const Container = styled.div`
  --data-font-size: var(--font-small);
  --data-line-height: var(--spacer-4);
  --cell-height: var(--spacer-6);

  margin: var(--spacer-4) 0 var(--spacer-2) 0;
`;

const Header = styled.div`
  font-weight: 300;
  font-size: var(--font-large);
`;

const TableContainer = styled.div`
  min-width: 320px;
  overflow-x: auto;
  border: 1px solid rgba(var(--font-color), 0.1);

  & table {
    border-collapse: collapse;
    width: 100%;
  }

  & table td {
    font-size: var(--data-font-size);
    padding: var(--spacer-1);
    white-space: pre;
  }

  & table tbody td {
    height: var(--cell-height);
    font-weight: 200;
    line-height: var(--spacer-4);
  }

  & table thead td {
    font-weight: 300;
  }

  & table td.icon {
    width: var(--spacer-6);
    /* for emojis */
    text-align: center;
    /* for images */
    display: flex;
    align-items: center;
    justify-content: center;
  }

  & table td.loading div {
    width: 80%;
    height: var(--data-font-size);
    background: rgba(var(--font-color), 0.15);
  }

  & table tr {
    border-bottom: 1px solid rgba(var(--font-color), 0.1);
  }

  & table tbody tr:last-child {
    border-bottom: none;
  }
`;

export default function Table({ header, columns = [], children, loading, loadingRows = 4, loadingWidths = [] }) {
  return (
    <Container>
      <Spacer vertical size={6} />
      <Header>{header}</Header>
      <Spacer vertical size={3} />

      <TableContainer>
        <table>
          <thead>
            <tr>
              {columns.map((column, i) => {
                return <td key={i}>{column}</td>;
              })}
            </tr>
          </thead>

          {loading ? (
            <tbody>
              {new Array(loadingRows).fill(1).map((_, i) => {
                return (
                  <tr key={i}>
                    {columns.map((_, i) => {
                      const colLoadingWidth = loadingWidths[i];
                      if (typeof colLoadingWidth === 'number' && colLoadingWidth !== 0) {
                        return <Table.LoadingColumn key={i} width={px(colLoadingWidth)} />;
                      }

                      return <td key={i} />;
                    })}
                  </tr>
                );
              })}
            </tbody>
          ) : (
            <tbody>{children}</tbody>
          )}
        </table>
      </TableContainer>
    </Container>
  );
}

Table.IconColumn = function TableIconColumn({ children }) {
  return <td className="icon">{children}</td>;
};

Table.LoadingColumn = function TableLoadingColumn({ width }) {
  return (
    <td className="loading">
      <div style={{ width }} />
    </td>
  );
};
