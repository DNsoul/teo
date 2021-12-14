import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Table from "../Table";
import { actions } from "../../reducer";

const head = (
  <thead>
    <tr>
      <th style={{ width: 324 }}>Статьи затрат</th>
      <th style={{ width: 174 }}>Затраты на проект, руб.</th>
      <th style={{ width: 174 }}>Затраты на аналог,руб.</th>
    </tr>
  </thead>
);

const setting = [
  { width: 300, disabled: true },
  { width: 150, disabled: true, type: "number" },
  { width: 150, disabled: true, type: "number" },
];

const StageTotal = () => {
  const dispatch = useDispatch();

  const projPrice = Number(useSelector((state) => state.projPrice));
  const anlgPrice = Number(useSelector((state) => state.anlgPrice));
  const projDay = useSelector((state) => state.projDay);
  const anlgDay = useSelector((state) => state.anlgDay);
  const explCoff = useSelector((state) => state.explCoff);
  const impSpend = useSelector((state) => state.impSpend);

  const projHour = projDay * explCoff[11];
  const anlgHour = anlgDay * explCoff[11];

  const fondObr = explCoff[11] * impSpend[1];

  const amrtProj =
    (explCoff[0] * explCoff[12] * explCoff[1] * projHour) / fondObr;
  const anlgProj =
    (explCoff[2] * explCoff[12] * explCoff[3] * anlgHour) / fondObr;

  const projEnrg = explCoff[4] * explCoff[1] * projHour * explCoff[10];
  const anlgEnrg = explCoff[4] * explCoff[3] * projHour * explCoff[10];

  const projRem = Number(explCoff[9] * explCoff[0] * projHour) / fondObr;
  const anlgRem = Number(explCoff[9] * explCoff[0] * anlgHour) / fondObr;

  const projMtrl = Number(explCoff[0] * 0.01);
  const anlgMtrl = Number(explCoff[2] * 0.01);

  const projNR =
    Number(projPrice + amrtProj + projEnrg + projRem + projMtrl) * 0.2;
  const anlgNR =
    Number(anlgPrice + anlgProj + anlgEnrg + anlgRem + anlgMtrl) * 0.2;

  const projTotal =
    projPrice + amrtProj + projEnrg + projRem + projMtrl + projNR;
  const anlgotal =
    anlgPrice + anlgProj + anlgEnrg + anlgRem + anlgMtrl + anlgNR;

  const initBody = [
    [
      "Основная и дополнительная зарплата с отчислениями",
      projPrice.toFixed(2),
      anlgPrice.toFixed(2),
    ],
    ["Амортизационные отчисления", amrtProj.toFixed(2), anlgProj.toFixed(2)],
    ["Затраты на электроэнергию", projEnrg.toFixed(2), anlgEnrg.toFixed(2)],
    ["Затраты на текущий ремонт", projRem.toFixed(2), anlgRem.toFixed(2)],
    ["Затраты на материалы", projMtrl.toFixed(2), anlgMtrl.toFixed(2)],
    ["Накладные расходы", projNR.toFixed(2), anlgNR.toFixed(2)],
    ["Итого", projTotal.toFixed(2), anlgotal.toFixed(2)],
  ];

  dispatch(actions.setProjSeb(projTotal));
  dispatch(actions.setAnlgSeb(anlgotal));

  return <Table head={head} body={initBody} setting={setting} />;
};

export default StageTotal;
