import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Table from "../Table";
import { actions } from "../../reducer";

const head = (
  <thead>
    <tr>
      <th style={{ width: 254 }} rowSpan={2}>
        Характеристика
      </th>
      <th style={{ width: 240 }} colSpan={2}>
        Значение
      </th>
    </tr>
    <tr>
      <th style={{ width: 124 }}>разрабатываемый продукт</th>
      <th style={{ width: 142 }}>продукт-аналог</th>
    </tr>
  </thead>
);

const headResul = (
  <thead>
    <tr>
      <th style={{ width: 254 }}>Характеристика проекта</th>
      <th style={{ width: 240 }}>Значение</th>
    </tr>
  </thead>
);

const setting = [
  { width: 230, disabled: true },
  { width: 100, disabled: true, type: "number" },
  { width: 120, disabled: true, type: "number" },
];

const settingEffert = [
  { width: 300, disabled: true },
  { width: 130, disabled: true, type: "number" },
];

const StageEffect = () => {
  const projSeb = useSelector((state) => state.projSeb);
  const anlgSeb = useSelector((state) => state.anlgSeb);
  const projDevSpend = useSelector((state) => state.projDevSpend);
  const anlgDevSpend = useSelector((state) => state.anlgDevSpend);
  const coffTeck = useSelector((state) => state.coffTeck);

  const [econEfct, setEconEfct] = useState(0.33);

  const projpner = projSeb + projDevSpend * econEfct;
  const anlgpner = anlgSeb + anlgDevSpend * econEfct;

  const econEffProj = anlgpner * 1.6 - projpner;

  const ocup = projDevSpend / econEffProj;

  const coffEcon = 1 / ocup;

  const initBody = [
    [
      "Себестоимость (текущие эксплуатационные затраты), руб.",
      projSeb.toFixed(2),
      anlgSeb.toFixed(2),
    ],
    [
      "Суммарные затраты, связанные с внедрением проекта, руб.",
      projDevSpend.toFixed(2),
      anlgDevSpend.toFixed(2),
    ],
    [
      "Приведенные затраты на единицу работ, руб.",
      projpner.toFixed(2),
      anlgpner.toFixed(2),
    ],
  ];

  const initBodyResult = [
    [
      "Затраты на разработку и внедрение проекта, руб.",
      projDevSpend.toFixed(2),
    ],
    ["Общие эксплуатационные затраты, руб.", projSeb.toFixed(2)],
    ["Экономический эффект, руб", econEffProj.toFixed(2)],
    ["Коэффициент экономической эффективности", coffEcon.toFixed(2)],
    ["Срок окупаемости, лет", ocup.toFixed(2)],
  ];

  return (
    <div>
      <div className="box">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>Коэффициент эффективности капитальных вложений:</span>
          <input
            className="input is-small"
            style={{ width: 100 }}
            type="number"
            value={econEfct}
            onChange={(e) => setEconEfct(e.target.value)}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>Коэффициент технического совершенства:</span>
          <span>{coffTeck.toFixed(2)}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>
            Экономический эффект от использования разрабатываемой системы, руб
          </span>
          <span>{econEffProj.toFixed(2)}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span className="has-text-weight-bold">
            Разработка и внедрение разрабатываемого продукта является{" "}
            {econEfct > coffEcon && "не"} эффективной.
          </span>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div className="mh">
          <div className="box m-0 p-0 has-text-centered">
            <span className="is-size-6">
              Данные по заработной плате специалистов (для проекта)
            </span>
          </div>
          <Table head={head} body={initBody} setting={setting} />
        </div>
        <div className="mh">
          <div className="box m-0 p-0 has-text-centered">
            <span className="is-size-6">
              Данные по заработной плате специалистов (для проекта)
            </span>
          </div>
          <Table
            head={headResul}
            body={initBodyResult}
            setting={settingEffert}
          />
        </div>
      </div>
    </div>
  );
};

export default StageEffect;
