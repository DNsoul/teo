import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Table from "../Table";
import { actions } from "../../reducer";

const head = (
  <thead>
    <tr>
      <th style={{ width: 154 }}>Должность</th>
      <th style={{ width: 154 }}>Должностной оклад, руб.</th>
      <th style={{ width: 174 }}>Среднее количество рабочих дней в месяц</th>
      <th style={{ width: 124 }}>Средняя дневная ставка, руб.</th>
      <th style={{ width: 154 }}>Затраты на разработку, человекодней</th>
      <th style={{ width: 124 }}>ОЗП, руб</th>
    </tr>
  </thead>
);

const setting = [
  { width: 130, disabled: true },
  { width: 130, disabled: false, type: "number" },
  { width: 150, disabled: false, type: "number" },
  { width: 100, disabled: true, type: "number" },
  { width: 130, disabled: true, type: "number" },
  { width: 100, disabled: true, type: "number" },
];

const initBody = [
  ["Руководитель", "19000", "21", "904.76", "0", "17190.48"],
  ["Программист", "7000", "21", "333.33", "0", "38333.33"],
];

const StageDevelop = () => {
  const directorDay = useSelector((state) => state.directorDay);
  const progerDay = useSelector((state) => state.progerDay);

  const dispatch = useDispatch();

  const [data, setData] = useState(initBody);

  const onChange = (prevData, idxr, idxc, value) => {
    const row = prevData[idxr];

    row[idxc] = value;

    row[3] = (row[1] / row[2]).toFixed(2);
    row[5] = (row[3] * row[4]).toFixed(2);

    prevData[idxr] = row;
    setData(prevData.slice());
  };

  const ozp = data.reduce((p, n) => p + Number(n[5]), 0).toFixed(2);

  useEffect(() => {
    const newData = data.slice();

    newData[0][4] = directorDay;
    newData[1][4] = progerDay;

    newData[0][3] = (newData[0][1] / newData[0][2]).toFixed(2);
    newData[1][3] = (newData[1][1] / newData[1][2]).toFixed(2);
    newData[0][5] = (newData[0][3] * newData[0][4]).toFixed(2);
    newData[1][5] = (newData[1][3] * newData[1][4]).toFixed(2);

    setData(newData);
  }, []);

  useEffect(() => {
    dispatch(actions.setOZP(ozp));
  }, [data]);

  return (
    <div>
      <div className="box">
        <span className="has-text-weight-bold">
          Основная заработная плата:{" "}
        </span>
        <span>{ozp} руб.</span>
      </div>
      <Table head={head} body={data} updateData={onChange} setting={setting} />
    </div>
  );
};

export default StageDevelop;
