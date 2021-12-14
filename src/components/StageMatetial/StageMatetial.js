import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import Table from "../Table";
import {actions} from '../../reducer';

const head = (
  <thead>
    <tr>
      <th style={{ width: 254 }}>Материалы</th>
      <th style={{ width: 154 }}>Единица измерения</th>
      <th style={{ width: 174 }}>Требуемое количество</th>
      <th style={{ width: 124 }}>Цена за единицу, руб</th>
      <th style={{ width: 154 }}>Сумма, руб.</th>
    </tr>
  </thead>
);

const initBody = [
  ["Компакт-диск CD-RW", "шт.", "2", "35", "70.00"],
  ["Тонер для лазерного принтера", "шт.", "1", "1000", "1000.00"],
  ["Бумага офисная", "пачка", "1", "130", "130.00"],
];

const initAddData = ["", "", "", "", ""];

const setting = [
  { width: 230, disabled: false },
  { width: 130, disabled: false },
  { width: 150, disabled: false, type: "number" },
  { width: 100, disabled: false, type: "number" },
  { width: 130, disabled: true, type: "number" },
];

const StageMatetial = () => {
  const [data, setData] = useState(initBody);
  const [addData, setAddData] = useState(initAddData);

  const dispatch = useDispatch()

  const onChange = (prevData, idxr, idxc, value) => {
    const row = idxr > -1 ? prevData[idxr] : prevData;

    row[idxc] = value;

    row[4] = (row[2] * row[3]).toFixed(2);

    prevData[idxr] = row;
    idxr > -1 ? setData(prevData.slice()) : setAddData(prevData.slice());
  };

  const onDelete = (idx) => {
    const temp = data.slice();
    temp.splice(idx, 1);

    setData(temp);
  };

  const onAdd = () => {
    setData((prev) => [...prev, addData]);
    setAddData(initAddData);
  };

  const znm = data.reduce((p, n) => p + Number(n[4]), 0).toFixed(2);

  useEffect(() => {
    dispatch(actions.setZNM(znm))
  }, [data])

  return (
    <div>
      <div className="box">
        <span className="has-text-weight-bold">Итого: </span>
        <span>{znm} руб.</span>
      </div>
      <Table
        head={head}
        body={data}
        addData={addData}
        createData={onAdd}
        updateData={onChange}
        deleteData={onDelete}
        setting={setting}
      />
    </div>
  );
};

export default StageMatetial;
