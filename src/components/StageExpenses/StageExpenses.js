import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Table from "../Table";
import { actions } from "../../reducer";

const head = (
  <thead>
    <tr>
      <th style={{ width: 354 }}>Статьи затрат</th>
      <th style={{ width: 154 }}>Сумма, руб.</th>
    </tr>
  </thead>
);

const setting = [
  { width: 330, disabled: true },
  { width: 130, disabled: true, type: "number" },
];

const settingAnalog = [
  { width: 330, disabled: true },
  { width: 130, disabled: false, type: "number" },
];

const StageExpenses = () => {
  const dispatch = useDispatch();

  const devSpend = useSelector((state) => state.devSpend);
  const impSpend = useSelector((state) => state.impSpend);
  const progerDay = useSelector((state) => state.progerDay);

  const ozp = Number(useSelector((state) => state.ozp));
  const dzp = Number(ozp * (devSpend[0] + devSpend[1]));
  const osn = Number((Number(ozp) + Number(dzp)) * 0.302);
  const znm = Number(useSelector((state) => state.znm));
  const mv = Number(progerDay * devSpend[4] * devSpend[5] * devSpend[6]);
  const nro = Number(ozp * 0.6);
  const znr = ozp + dzp + osn + znm + mv + nro;

  const initBodyDevelop = [
    ["Основная заработная плата", ozp.toFixed(2)],
    ["Дополнительная зарплата", dzp.toFixed(2)],
    ["Отчисления на социальные нужды", osn.toFixed(2)],
    ["Затраты на материалы", znm.toFixed(2)],
    ["Затраты на машинное время", mv.toFixed(2)],
    ["Накладные расходы организации", nro.toFixed(2)],
  ];

  const initBodyAnalog = [
    ["Приобретение программного продукта", "37300"],
    ["Оплате услуг на установку и сопровождение продукта", "12000"],
    ["Основное и вспомогательное оборудование", "22500"],
    ["Подготовка пользователя", "9000"],
  ];

  const [data, setData] = useState(initBodyAnalog);

  const onChange = (prevData, idxr, idxc, value) => {
    const row = prevData[idxr];

    row[idxc] = value;

    prevData[idxr] = row;
    setData(prevData.slice());
  };

  const znr2 =
    (impSpend[2] * impSpend[3] * impSpend[4] * impSpend[5]) /
    (impSpend[0] * impSpend[1]);
  const kv = znr + znr2;
  const va = data.reduce((p, c) => p + Number(c[1]), 0);

  useEffect(() => {
    dispatch(actions.setProjDevSpend(kv));
    dispatch(actions.setAnlgDevSpend(va));
  }, [data]);

  return (
    <div>
      <div className="box">
        <span className="has-text-weight-bold">
          Итоговые затраты на разработку:{" "}
        </span>
        <span>{znr.toFixed(2)} руб.</span>
        <br />
        <span className="has-text-weight-bold">Затраты на реализацию: </span>
        <span>{znr2.toFixed(2)} руб.</span>
        <br />
        <span className="has-text-weight-bold">
          Cуммарные затраты на разработку проекта:{" "}
        </span>
        <span>{kv.toFixed(2)} руб.</span>
        <br />
        <span className="has-text-weight-bold">Внедрение аналога: </span>
        <span>{va.toFixed(2)} руб.</span>
        <br />
      </div>
      <div style={{ display: "flex" }}>
        <div className="mh">
          <Table head={head} body={initBodyDevelop} setting={setting} />
        </div>
        <div className="mh">
          <Table
            head={head}
            body={data}
            updateData={onChange}
            setting={settingAnalog}
          />
        </div>
      </div>
    </div>
  );
};

export default StageExpenses;
