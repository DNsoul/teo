import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Table from "../Table";
import { actions } from "../../reducer";

const head = (
  <thead>
    <tr>
      <th style={{ width: 324 }} rowSpan={2}>
        Показатели качества
      </th>
      <th style={{ width: 134 }} rowSpan={2}>
        Коэффициент весомости
      </th>
      <th style={{ width: 204 }} colSpan={2}>
        Проект
      </th>
      <th style={{ width: 204 }} colSpan={2}>
        Аналог
      </th>
      <th style={{ width: 50 }} rowSpan={2}></th>
    </tr>
    <tr>
      <th style={{ width: 104 }}>Экс. оц.</th>
      <th style={{ width: 104 }}>Качест.</th>
      <th style={{ width: 104 }}>Экс. оц.</th>
      <th style={{ width: 104 }}>Качест.</th>
    </tr>
  </thead>
);

const initBody = [
  ["Удобство работы", "0.14", "4", "0.56", "2", "0.28"],
  ["Новизна", "0.1", "4", "0.4", "3", "0.3"],
  [
    "Соответствие профилю деятельности заказчика",
    "0.2",
    "4",
    "0.8",
    "2",
    "0.4",
  ],
  ["Ресурсная эффективность", "0.05", "4", "0.2", "4", "0.2"],
  ["Надежность", "0.13", "3", "0.39", "3", "0.39"],
  ["Скорость доступа к данным", "0.1", "4", "0.4", "4", "0.4"],
  ["Гибкость настройки", "0.06", "3", "0.18", "3", "0.18"],
  ["Обучаемость персонала", "0.13", "5", "0.65", "1", "0.13"],
  ["Соотношение стоимость/возможности", "0.09", "4", "0.36", "2", "0.18"],
];

const setting = [
  { width: 300, disabled: false },
  { width: 110, disabled: false, type: "number" },
  { width: 80, disabled: false, type: "number" },
  { width: 80, disabled: true, type: "number" },
  { width: 80, disabled: false, type: "number" },
  { width: 80, disabled: true, type: "number" },
];

const initAddData = ["", "", "", "", "", ""];

const StageCompetitiveness = () => {
  const [data, setData] = useState(initBody);
  const [addData, setAddData] = useState(initAddData);

  const dispatch = useDispatch();

  const onChange = (prevData, idxr, idxc, value) => {
    const row = idxr > -1 ? prevData[idxr] : prevData;
    row[idxc] = value;
    row[3] = (row[1] * row[2]).toFixed(2);
    row[5] = (row[1] * row[4]).toFixed(2);
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

  const jp = data.reduce((p, n) => p + Number(n[3]), 0);
  const ja = data.reduce((p, n) => p + Number(n[5]), 0);
  const coff = data.reduce((p, n) => p + Number(n[1]), 0);

  useEffect(() => {
    dispatch(actions.setCoffTeck(jp / ja));
  }, [data]);

  return (
    <div>
      <div className="box">
        <span className="has-text-weight-bold">
          Суммарный коэффициент весомости
        </span>
        <span> {coff.toFixed(2)}</span>
        <br />
        {(coff > 1 || coff < 1) && (
          <>
            <span className="has-text-danger">Коэфицент должен быть равен единице</span>
            <br />
          </>
        )}
        <span className="has-text-weight-bold">
          Обобщенный показатель качества
        </span>
        <br />
        <span>Проекта: </span>
        <span>{jp.toFixed(2)}</span>
        <br />
        <span>Аналога: </span>
        <span>{ja.toFixed(2)}</span>
        <br />
        <span className="has-text-weight-bold">
          Коэффициент технического совершенства:{" "}
        </span>
        <span>{(jp / ja).toFixed(2)}</span>
        <br />
        <span className="has-text-weight-bold">Вывод: </span>
        <span>
          Разработка проекта с технической точки {jp / ja < 1 && "не"} зрения
          оправдана
        </span>
      </div>
      <Table
        head={head}
        body={data}
        height={45}
        addData={addData}
        createData={onAdd}
        updateData={onChange}
        deleteData={onDelete}
        setting={setting}
      />
    </div>
  );
};

export default StageCompetitiveness;
