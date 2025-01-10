import React from "react";

const TableHead = ({ data }) => {
  return (
    <>
      {data &&
        data?.length > 0 &&
        data?.map((thead, index) => (
          <th
            key={index}
            className="fixed-width"
            // rowSpan={1}
            // colSpan={1}
          >
            <span className="text-truncate">{thead}</span>
          </th>
        ))}
    </>
  );
};

export default TableHead;
