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
        child?: Array<any>;
    }>;
  };
    onAddChild: (parentId: string | null) => void;
    level: number;
}

const TableRow: React.FC<RowProps> = ({ row, onAddChild, level }) => {
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
      <tr style={{ marginLeft: `${level * 25}px` }}>
        <td  style={{ width: `10%` }}>
          <td className="tree-line">
            {level > 0 && (
                <div className="tree-line-vertical" style={{ left: `${level * 25}px` }}></div>
            )}
            {level > 0 && (
                <div className="tree-line-horizontal" style={{ left: `${level * 25}px` }}></div>
            )}
          </td>        
          <div className="button-container" style={{ marginLeft: `${level * 28.5}px` }}>
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
      {row.child?.map((child) => (
        <TableRow
          key={child.id}
          row={child}
          onAddChild={onAddChild}
          level={level + 1} // Увеличиваем уровень
        />
      ))}
    </>
  );
};

export default TableRow;