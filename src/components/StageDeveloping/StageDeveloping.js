import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Table from "../Table";
import { actions } from "../../reducer";

const head = (
  <thead>
    <tr>
      <th style={{ width: 300 }}>Название</th>
      <th style={{ width: 154 }}>Значение</th>
    </tr>
  </thead>
);

const setting = [
  { width: 300, disabled: true },
  { width: 100, disabled: false, type: "number" },
];

const initBodyDeveloping = [
  ["Коэффицент отчисления на социальные нужды", "0.3"],
  ["Коэффицент отпускных", "0.1"],
  ["Районный коэффицент", "0.9"],
  ["Коэффицент накладных расходов", "0.6"],
  ["Машинное время ПК (час/день)", "4"],
  ["Стоимость 1 часа работы ПК в руб.", "20"],
  ["Коэффицент мультипрограммности", "1"],
];

const initBodyImplementation = [
  ["Количество рабочих часов в день", "8"],
  ["Количество рабочих дней в году", "247"],
  ["Друдоемкость обработки информации в час", "6"],
  ["Количество дней на внедрение", "247"],
  ["Стоимость ПК в рублях", "22500"],
  ["Количество компьютеров", "1"],
];

const StageDeveloping = () => {
  const dispatch = useDispatch();

  const [dataDev, setDataDev] = useState(initBodyDeveloping);
  const [dataImp, setDataImp] = useState(initBodyImplementation);

  const onChange = (setData, prevData, idxr, idxc, value) => {
    const row = prevData[idxr];

    row[idxc] = value;

    prevData[idxr] = row;
    setData(prevData.slice());
  };

  useEffect(() => {
    dispatch(actions.setDevSpend(dataDev.map(dt => Number(dt[1]))))
    dispatch(actions.setImpSpend(dataImp.map(dt => Number(dt[1]))))
  }, [dataDev, dataImp])

  return (
    <div style={{ display: "flex" }}>
      <Table
        head={head}
        body={dataDev}
        updateData={(prevData, idxr, idxc, value) =>
          onChange(setDataDev, prevData, idxr, idxc, value)
        }
        setting={setting}
      />
      <Table
        head={head}
        body={dataImp}
        updateData={(prevData, idxr, idxc, value) =>
          onChange(setDataImp, prevData, idxr, idxc, value)
        }
        setting={setting}
      />
    </div>
  );
};

export default StageDeveloping;
