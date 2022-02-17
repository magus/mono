import * as React from 'react';
import styled from 'styled-components';

export function PokemonSizes(props) {
  const [isMetric, set_isMetric] = React.useState(false);

  if (!props.sizes) {
    return <Unavailable>Size data is not available.</Unavailable>;
  }

  return (
    <>
      <SizeTable>
        <tbody>
          <tr>
            <th></th>
            <th width="200px">Height</th>
            <th>Weight</th>
          </tr>

          {['Small', 'Average', 'Large', 'Alpha'].map((size, i) => {
            const height = props.sizes.heights[i];
            const weight = props.sizes.weights[i];

            return (
              <tr key={i}>
                <td width="200px">{size}</td>
                <td width="200px">
                  <Height height={height} metric={isMetric} />
                </td>
                <td width="200px">
                  <Weight weight={weight} metric={isMetric} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </SizeTable>

      <BelowTable>
        <MetricToggle onClick={() => set_isMetric((s) => !s)}>
          {isMetric ? 'Switch to ft/lbs' : 'Switch to m/kg'}
        </MetricToggle>
      </BelowTable>
    </>
  );
}

function Height(props) {
  const { height } = props;

  if (!height) return '—';

  if (props.metric) {
    return <NumberUnit value={height.m} unit="m" />;
  } else {
    return (
      <span>
        <NumberUnit value={height.ft} unit="ft" /> <NumberUnit value={height.in} unit="in" />
      </span>
    );
  }
}

function Weight(props) {
  const { weight } = props;

  if (!weight) return '—';

  if (props.metric) {
    return <NumberUnit value={weight.kg} unit="kg" />;
  } else {
    return <NumberUnit value={weight.lbs} unit="lbs" />;
  }
}

const NumberUnitContainer = styled.span`
  font-variant-numeric: tabular-nums;

  .unit {
    font-variant-numeric: normal;
    padding: 0 0 0 var(--spacer-d2);
    color: rgba(var(--gray), 1);
    font-size: 12px;
    font-weight: 600;
  }
`;

const numberFormatter = new Intl.NumberFormat();

function NumberUnit(props) {
  return (
    <NumberUnitContainer>
      <span>{numberFormatter.format(props.value)}</span>
      <span className="unit">{props.unit}</span>
    </NumberUnitContainer>
  );
}

const SizeTable = styled.table`
  padding: var(--spacer-2) 0;
  max-width: 100%;
  text-align: left;
  border-spacing: 0px;

  th,
  td:first-child {
    font-weight: 200;
    font-size: 14px;
    font-variant: small-caps;
  }
`;

const BelowTable = styled.div`
  padding: var(--spacer-2) 0 0 0;
  display: flex;
  justify-content: flex-start;
`;

const MetricToggle = styled.button`
  font-weight: 800;
  font-size: 14px;
  color: rgba(var(--main-color), 1);
`;

const Unavailable = styled.div`
  padding: var(--spacer-2) 0;
`;
