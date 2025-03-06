import React, { useState } from 'react';
import  TableRow  from './TableRow.tsx';
import { useGetRowsQuery, useCreateRowMutation } from '../api/apiSlice';

interface Row {
  id: string;
  title: string;
  parentId: string | null;
}

const Table: React.FC<{ eID: string }> = ({ eID }) => {
  const { data, isLoading, error, refetch } = useGetRowsQuery(eID);
    
  const [createRow] = useCreateRowMutation();
  const [tempRow, setTempRow] = useState<{
    parentId: string | null;
    rowName: string;
  } | null>(null);

  const handleAddRow = (parentId: string | null) => {
    setTempRow({ parentId, rowName: '' });
  };

  // Функция для создания новой строки
  const handleSaveTempRow = async () => {
    if (!tempRow) return;

    try {
      await createRow({
        eID,
        body: {
          parentId: tempRow.parentId,
          rowName: tempRow.rowName,
          equipmentCosts: 0,
          estimatedProfit: 0,
          machineOperatorSalary: 0,
          mainCosts: 0,
          materials: 0,
          mimExploitation: 0,
          overheads: 0,
          salary: 0,
          supportCosts: 0,
        },
      });
      console.log(tempRow.parentId)
      setTempRow(null); // Очищаем временную строку
      refetch(); // Обновляем данные
    } catch (error) {
      console.error('Ошибка при создании строки:', error);
    }
  };
    
  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка загрузки</div>;

  const rows = data || [];

  console.log(rows);
  return (
    <div className="content">
      <h2>Строительно-монтажные работы</h2>
      {/* <button onClick={handleAddRow} className="add-row-button">
        Добавить строку
      </button> */}
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
            <TableRow key={row.id} row={row} onAddChild={handleAddRow}/>
          ))}
          {tempRow && (
            <tr className="temp-row">
              <td colSpan={6}>
                <input
                  type="text"
                  value={tempRow.rowName}
                  onChange={(e) =>
                    setTempRow({ ...tempRow, rowName: e.target.value })
                  }
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSaveTempRow();
                  }}
                  autoFocus
                />
                <button onClick={handleSaveTempRow}>Сохранить</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;