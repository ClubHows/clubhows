import React from 'react';
import PropTypes from 'prop-types';

const renderHead = columns => {
  return columns.map(({ title, dataIndex, renderHeader, key }) => {
    return (
      <th key={key} className={`w-${columns.length === 2 ? 100 : 100 / columns.length}`}>
        {renderHeader ? renderHeader(title, dataIndex) : title}
      </th>
    );
  });
};

const renderBody = (columns, dataSource) => {
  return dataSource.map(entry => {
    return <tr key={entry.id}>{renderData(columns, entry)}</tr>;
  });
};

const renderData = (columns, entry) => {
  return columns.map(({ dataIndex, render, key }) => {
    return <td key={key}>{render ? render(entry[dataIndex], entry) : entry[dataIndex]}</td>;
  });
};

const Table = ({ dataSource, columns, ...props }) => {
  return (
    <table {...props}>
      <thead>
        <tr>{renderHead(columns)}</tr>
      </thead>
      <tbody>{renderBody(columns, dataSource)}</tbody>
    </table>
  );
};

Table.propTypes = {
  dataSource: PropTypes.array,
  columns: PropTypes.array
};

export default Table;
