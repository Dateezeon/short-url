import { Table as BootstrapTable } from "react-bootstrap";
import styled from "styled-components";

import { deleteUrl } from "../utils";

const TableStyles = styled.div`
  td {
    line-height: 40px;
  }

  i {
    font-size: 20px;
    color: red
  }

  a {
    color: var(--color);
    text-decoration: none;
  }
`;

const Table = ({ data, columns, setFetch }:any) => {
  const deleteAction = (slug:any) => {
    deleteUrl(slug, () => {
      setFetch(true);
    });
  };

  return (
    <TableStyles>
      <BootstrapTable striped hover responsive size="sm" borderless>
        <thead>
          <tr>
            {columns.map((column:any) => (
              <th data-test-id={`table-header-${column.id}`} key={column.id}>
                {column.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((element:any, index:any) => (
            <tr key={index}>
              {columns.map((column:any) =>
                column.id === "delete" ? (
                  <td
                    key={column.id}
                  >
                    <i data-test-id={`table-data-${column.id}-${index}`} onClick={() => deleteAction(element.slug)} className="bi bi-trash" />
                  </td>
                ) : (
                  <td
                    data-test-id={`table-data-${column.id}-${index}`}
                    key={column.id}
                  >
                    <a href={element[column.id]} target="_blank">{element[column.id]}</a>
                  </td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </BootstrapTable>
    </TableStyles>
  );
};

export default Table;