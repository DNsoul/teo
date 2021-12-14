import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Table from "../Table";
import { actions } from "../../reducer";

const head = (
  <thead>
    <tr>
      <th style={{ width: 374 }}>Название</th>
      <th style={{ width: 124 }}>Значение</th>
    </tr>
  </thead>
);

const setting = [
  { width: 350, disabled: true },
  { width: 100, disabled: false, type: "number" },
];

const initBody = [
  ["Балансовая стоимость оборудования в руб. (Проект)", "22500"],
  ["Количество оборудования (Проект)", "1"],
  ["Балансовая стоимость оборудования в руб. (Аналог)", "22500"],
  ["Количество оборудования (Аналог)", "1"],
  ["Мощность оборудования, кВт", "0.4"],
  ["Коэф. использования уставновленной мощности", "0.6"],
  ["Коэффицент отпускных", "0.1"],
  ["Районный коэффицент", "0.3"],
  ["Коэф. затрат на материалы", "0.01"],
  ["Норматив затрат на ремонт", "0.05"],
  ["Тариф на электроинергию, кВт/час", "2.6"],
  ["Норматив среднесуточной загрузки (час/день)", "8"],
  ["Норма годовых отлислений амортизации", "0.2"],
];

const StageExplotationCoff = () => {
  const dispatch = useDispatch();

  const [data, setData] = useState(initBody);
  const explCoff = useSelector(state => state.explCoff)

  const onChange = (prevData, idxr, idxc, value) => {
    const newPrevData = prevData.map((d) => [...d]);

    const row = newPrevData[idxr];

    row[idxc] = value;

    newPrevData[idxr] = row;
    setData(newPrevData.slice());
  };

  useEffect(() => {
    let newData = data.slice()

    explCoff.forEach((value, idx) => newData[idx][1] = value)

    setData(newData);
  }, [])

  useEffect(() => {
    dispatch(actions.setExplCoff(data.map(d => d[1])));
  }, [data]);

  return (
    <Table head={head} body={data} height={80} updateData={onChange} setting={setting} />
  );
};

export default StageExplotationCoff;
