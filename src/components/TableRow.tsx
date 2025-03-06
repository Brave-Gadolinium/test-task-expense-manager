import React, { useState } from 'react';
import { useCreateRowMutation, useUpdateRowMutation, useDeleteRowMutation } from '../api/apiSlice';

interface RowProps {
  row: {
    id: string;
    rowName: string;
    parentId: string | null;
    equipmentCosts: number;
    salary: number;
    overheads: number;
    estimatedProfit: number;
    child?: Array<{
      id: string;
      rowName: string;
      equipmentCosts: number;
      salary: number;
      overheads: number;
      estimatedProfit: number;
    }>;
  };
  onAddChild: (parentId: string | null) => void;
}

const TableRow: React.FC<RowProps> = ({ row, onAddChild }) => {
  const [isEditing, setIsEditing] = useState(!row.rowName);
  const [rowName, setRowName] = useState(row.rowName);
  const [createRow] = useCreateRowMutation();
  const [updateRow] = useUpdateRowMutation();
  const [deleteRow] = useDeleteRowMutation();

//   const handleEdit = () => setIsEditing(true);
    
  const handleSave = () => {
    updateRow({ eID: '148610', rID: row.id, body: { rowName } });
    setIsEditing(false);
  };

  const handleDelete = () => deleteRow({ eID: '148610', rID: row.id });

  return (
    <>
      <tr>
        <td>
          <div className="button-container">
            <button
              className="button__form__create__row"
              onClick={() => onAddChild(row.id)}
            >
              <img src="./assets/file.png" alt="Добавить потомка" />
            </button>
            <button className="button__form__delete__row" onClick={handleDelete}>
              <img src="./assets/TrashFill.png" alt="Удалить" />
            </button>
          </div>
        </td>
        <td>{row.rowName}</td>
        <td>{row.equipmentCosts}</td>
        <td>{row.salary}</td>
        <td>{row.overheads}</td>
        <td>{row.estimatedProfit}</td>
      </tr>
      {row.child.map((children) => (
        <tr>
        <td>
          <div className="button-container">
            <button
              className="button__form__create__row"
              onClick={() => onAddChild(children.id)}
            >
              <img src="./assets/file.png" alt="Добавить потомка" />
            </button>
            <button className="button__form__delete__row" onClick={handleDelete}>
              <img src="./assets/TrashFill.png" alt="Удалить" />
            </button>
          </div>
        </td>
        <td>{children.rowName}</td>
        <td>{children.equipmentCosts}</td>
        <td>{children.salary}</td>
        <td>{children.overheads}</td>
        <td>{children.estimatedProfit}</td>
      </tr>
      ))}

    </>
  );
};

export default TableRow;