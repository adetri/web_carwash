import React, { useEffect, useRef } from 'react';
import $ from 'jquery'; // Import jQuery

const DataTableComponent = () => {
  const tableRef = useRef(null);

  useEffect(() => {
    // Initialize DataTable
    $(tableRef.current).DataTable();
  }, []);

  return (
    <table ref={tableRef} className="display">
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Country</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>John Doe</td>
          <td>30</td>
          <td>USA</td>
        </tr>
        {/* Add more rows as needed */}
      </tbody>
    </table>
  );
};

export default DataTableComponent;
