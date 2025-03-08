import React, { useState } from 'react';
import { useCreateRowMutation, useUpdateRowMutation, useDeleteRowMutation, useGetRowsQuery } from '../api/apiSlice';

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
  const eID = '148610';
  const { refetch } = useGetRowsQuery(eID);

  const handleSave = async () => {

    try {
        await updateRow({
          eID: eID,
          rID: row.id,
          body: formData,
        }).unwrap();
        setIsEditing(false);
        refetch();
    } catch (error) {
        console.error('Ошибка при обновлении:', error);
    }
  };

  const handleDelete = () => deleteRow({ eID: '148610', rID: row.id });
  const handleEdit = () => setIsEditing(true);
  const [formData, setFormData] = useState({
    rowName: row.rowName,
    equipmentCosts: row.equipmentCosts,
    salary: row.salary,
    overheads: row.overheads,
    estimatedProfit: row.estimatedProfit,
    machineOperatorSalary: 0,
    mainCosts: 0,
    materials: 0,
    mimExploitation: 0,
    supportCosts: 0
  });
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };
    
  return (
    <>
      <tr style={{ marginLeft: `${level * 25}px` }}>
        <td  style={{ width: `10%` }}>
          <div className="tree-line">
            {level > 0 && (
                <div className="tree-line-vertical" style={{ left: `${level * 25}px` }}></div>
            )}
            {level > 0 && (
                <div className="tree-line-horizontal" style={{ left: `${level * 25}px` }}></div>
            )}
          </div>   
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
        <td>
          {isEditing ? (
            <input
              className='input__isEditing__large'
              type="text"
              value={formData.rowName}
              onChange={(e) =>
                setFormData({ ...formData, rowName: e.target.value })
              }
              onKeyDown={handleKeyDown}
            />
          ) : (
            <span onDoubleClick={handleEdit}>{row.rowName}</span>
          )}
        </td>
        <td>
          {isEditing ? (
            <input
              className='input__isEditing__small'
              type="text"
              value={formData.equipmentCosts}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  equipmentCosts: parseFloat(e.target.value) || 0,
                })
              }
              onKeyDown={handleKeyDown}
            />
          ) : (
            formData.equipmentCosts
        )}
        </td>
        <td>
          {isEditing ? (
            <input
              className='input__isEditing__small'
                type="text"
                value={formData.salary}
                onChange={(e) =>
                  setFormData({ ...formData, salary: parseFloat(e.target.value) || 0 })
                }
                onKeyDown={handleKeyDown}
              />
            ) : (
              formData.salary
            )}
        </td>
        <td>
          {isEditing ? (
            <input
              className='input__isEditing__small'
              type="text"
              value={formData.overheads}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  overheads: parseFloat(e.target.value) || 0,
                })
              }
              onKeyDown={handleKeyDown}
            />
          ) : (
            formData.overheads
          )}
        </td>
        <td>
          {isEditing ? (
            <input
              className='input__isEditing__small'
              type="text"
              value={formData.estimatedProfit}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  estimatedProfit: parseFloat(e.target.value) || 0,
                })
              }
              onKeyDown={handleKeyDown}
            />
          ) : (
            formData.estimatedProfit
          )}
        </td>
      </tr>
      {row.child?.map((child) => (
        <TableRow
          key={child.id}
          row={child}
          onAddChild={onAddChild}
          level={level + 1}
          eID={eID}
        />
      ))}
    </>
  );
};

export default TableRow;