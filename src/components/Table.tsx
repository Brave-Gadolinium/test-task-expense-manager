import React, { useState } from 'react';
import  TableRow  from './TableRow.tsx';
import { useGetRowsQuery, useCreateRowMutation } from '../api/apiSlice';

interface Row {
  id: string;
  parentId: string | null;
  rowName: string;
  equipmentCosts: number;
  salary: number;
  overheads: number;
  estimatedProfit: number;
  machineOperatorSalary?: number;
  mainCosts?: number;
  materials?: number;
  mimExploitation?: number;
  supportCosts?: number;
  child?: Row[];
}

const Table: React.FC<{ eID: string }> = ({ eID }) => {
  const { data, isLoading, error, refetch } = useGetRowsQuery(eID);
  const [createRow] = useCreateRowMutation();
  const [tempRow, setTempRow] = useState<Row | null>(null);
  const [isError, setIsError] = useState(false); // Состояние для ошибки
    // Функция для добавления новой строки
    const handleAddRow = (parentId: string | null) => {
      setTempRow({
        id: '',
        parentId,
        rowName: '',
        equipmentCosts: 0,
        salary: 0,
        overheads: 0,
        estimatedProfit: 0,
        child: [],
    });
  };

  // Функция для создания новой строки
  const handleSaveTempRow = async () => {
    if (!tempRow || !tempRow.rowName.trim()) {
        setIsError(true); // Устанавливаем ошибку, если строка пустая
        return;
    }
      
    try {
      await createRow({
        eID,
        body: {
          parentId: tempRow.parentId,
          rowName: tempRow.rowName,
          equipmentCosts: tempRow.equipmentCosts,
          estimatedProfit: tempRow.estimatedProfit,
          machineOperatorSalary: 0,
          mainCosts: 0,
          materials: 0,
          mimExploitation: 0,
          overheads: tempRow.overheads,
          salary: tempRow.salary,
          supportCosts: 0,
        },
      });
      setTempRow(null);
      setIsError(false);
      refetch();
    } catch (error) {
      console.error('Ошибка при создании строки:', error);
    }
  };
    
  if (isLoading) return <div>Загрузка...</div>;
  if (error) {
    return <div>Ошибка загрузки: {(error as any)?.message || 'Неизвестная ошибка'}</div>;
  }
    
  const rows = data || [];

  return (
    <div className="content">
      <p className='content__label'>Строительно-монтажные работы</p>
      <table className="table">
        <thead>
        <tr>
            <th>Уровень</th>
            <th>Наименование работ</th>
            <th>Основная з/п</th>
            <th>Оборудование</th>
            <th>Накладные расходы</th>
            <th>Сметная прибыль</th>
          </tr>
        </thead>
        <tbody>
        {rows.map((row) => (
            <TableRow
                key={row.id}
                row={row}
                onAddChild={handleAddRow}
                level={0}
            />
            ))}
          {tempRow && (
            <tr>
                <td>
                    <button onClick={handleSaveTempRow} className='button__form__create__row'>
                        <img src="./assets/file.png" alt="Добавить потомка" />
                    </button>
                </td>
                <td>
                    <input
                        type="text"
                        value={tempRow.rowName}
                        onChange={(e) => {
                            const value = e.target.value;
                            setTempRow({ ...tempRow, rowName: value });
                            if (value.trim()) {
                                setIsError(false); // Сбрасываем ошибку, если строка не пустая
                            }
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSaveTempRow();
                        }}
                        className='input__change__save'
                    />
                    {isError && (
                        <div className="error-message">Строка не может быть пустой</div>
                    )}
                </td>
                <td><input
                        type="text"
                        value={tempRow.equipmentCosts}
                        onChange={(e) =>
                            setTempRow({ ...tempRow, equipmentCosts: parseFloat(e.target.value) || 0 })
                        }
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSaveTempRow();
                        }}
                        className='input__change__save input__change__save_type2'
                    /></td>
                <td><input
                        type="text"
                        value={tempRow.salary}
                        onChange={(e) =>
                            setTempRow({ ...tempRow, salary: parseFloat(e.target.value) || 0 })
                        }
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSaveTempRow();
                        }}
                        className='input__change__save input__change__save_type2'
                    /></td>
                <td><input
                        type="text"
                        value={tempRow.overheads}
                        onChange={(e) =>
                            setTempRow({ ...tempRow, overheads: parseFloat(e.target.value) || 0 })
                        }
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSaveTempRow();
                        }}
                        className='input__change__save input__change__save_type2'
                /></td>
                          <td><input
                        type="text"
                        value={tempRow.estimatedProfit}
                        onChange={(e) =>
                            setTempRow({ ...tempRow, estimatedProfit: parseFloat(e.target.value) || 0 })
                        }
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSaveTempRow();
                        }}
                        className='input__change__save input__change__save_type2'
                /></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;