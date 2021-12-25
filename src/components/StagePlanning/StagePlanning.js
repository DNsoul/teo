import React, { useState, useEffect } from "react";
import Table from "../Table";
import { actions } from "../../reducer";
import { useSelector, useDispatch } from "react-redux";

const head = (
  <thead>
    <tr>
      <th style={{ width: 274 }} rowSpan={2}>
        Содержание работы
      </th>
      <th style={{ width: 174 }} rowSpan={2}>
        Исполнители
      </th>
      <th style={{ width: 124 }} rowSpan={2}>
        Длительность дни
      </th>
      <th style={{ width: 308 }} colSpan={2}>
        График работ
      </th>
    </tr>
    <tr>
      <th>Начало</th>
      <th>Конец</th>
    </tr>
  </thead>
);

const initBody = [
  ["1.1 Постановка задачи", "Руководитель", "1", "2013-01-21", "2013-01-21"],
  ["", "Программист", "3", "2013-01-21", "2013-01-21"],
  ["1.2 Сбор исходных данных", "Руководитель", "5", "2013-01-24", "2013-01-21"],
  ["", "Программист", "14", "2013-01-24", "2013-01-21"],
  [
    "1.3 Анализ существующих методов решения задачи и программных средств",
    "Руководитель",
    "0",
    "",
    "",
  ],
  ["", "Программист", "6", "2013-02-07", "2013-01-21"],
  [
    "1.4 Обоснование принципиальной необходимости разработки",
    "Руководитель",
    "1",
    "2013-02-13",
    "2013-01-21",
  ],
  ["", "Программист", "2", "2013-02-13", "2013-01-21"],
  [
    "1.5 Определение и анализ требований к программе",
    "Руководитель",
    "1",
    "2013-02-15",
    "2013-01-21",
  ],
  ["", "Программист", "3", "2013-02-15", "2013-01-21"],
  [
    "1.6 Определение структуры входных и выходных данных",
    "Руководитель",
    "1",
    "2013-02-18",
    "2013-01-21",
  ],
  ["", "Программист", "5", "2013-02-18", "2013-01-21"],
  [
    "1.7 Выбор технических средств и программных средств реализации",
    "Руководитель",
    "1",
    "2013-02-23",
    "2013-01-21",
  ],
  ["", "Программист", "3", "2013-02-23", "2013-01-21"],
  [
    "1.8 Согласование и утверждение технического задания",
    "Руководитель",
    "1",
    "2013-02-26",
    "2013-01-21",
  ],
  ["", "Программист", "3", "2013-02-26", "2013-01-21"],
  ["2.1 Проектирование программной архитектуры", "Руководитель", "0", "", ""],
  ["", "Программист", "3", "2013-03-01", "2013-01-21"],
  [
    "2.2 Техническое проектирование компонентов программы",
    "Руководитель",
    "0",
    "",
    "",
  ],
  ["", "Программист", "7", "2013-03-04", "2013-01-21"],
  [
    "3.1 Программирование модулей в выбранной среде программирования",
    "Руководитель",
    "0",
    "",
    "",
  ],
  ["", "Программист", "13", "2013-03-11", "2013-01-21"],
  ["3.2 Тестирование программных модулей", "Руководитель", "0", "", ""],
  ["", "Программист", "21", "2013-03-24", "2013-01-21"],
  [
    "3.3 Сборка и испытание программы",
    "Руководитель",
    "2",
    "2013-04-14",
    "2013-01-21",
  ],
  ["", "Программист", "5", "2013-04-14", "2013-01-21"],
  [
    "3.4 Анализ результатов испытаний",
    "Руководитель",
    "1",
    "2013-04-19",
    "2013-01-21",
  ],
  ["", "Программист", "5", "2013-04-19", "2013-01-21"],
  [
    "4.1 Проведение расчетов показателей безопасности жизнедеятельности",
    "Руководитель",
    "0",
    "",
    "",
  ],
  ["", "Программист", "3", "2013-04-24", "2013-01-21"],
  ["4.2 Проведение экономических расчетов", "Руководитель", "0", "", ""],
  ["", "Программист", "4", "2013-04-27", "2013-01-21"],
  [
    "4.3 Оформление пояснительной записки",
    "Руководитель",
    "5",
    "2013-05-01",
    "2013-01-21",
  ],
  ["", "Программист", "15", "2013-05-01", "2013-01-21"],
].map((row) => {
  const date = new Date(row[3]);
  date.setDate(date.getDate() + Number(row[2]));
  row[4] = date.toLocaleString("ru").slice(0, 10);

  if (row[2] == 0) {
    row[3] = row[4] = "";
  }
  return row;
});

const setting = [
  { width: 250, disabled: true, rowSpan: 2 },
  { width: 150, disabled: true },
  { width: 100, disabled: false, type: "number" },
  { width: 130, disabled: true, type: "date" },
  { width: 130, disabled: true, type: "date" },
];

const StagePlanning = () => {
  const [data, setData] = useState(initBody);
  const dispatch = useDispatch();
  const start = useSelector(state => state.startData)

  const setStart = (newState) => {
    dispatch(actions.setStartData(newState))
  }

  const onChangeDate = (inputData) => {
    const tempData = inputData ?? data
    let newData = [];
    const date = new Date(start)
    date.setDate(date.getDate() - 1);
    let prevDate = date.toISOString()
    tempData.forEach((prevData, index) => {
      if (![0,1].includes(index)) {
        const minusIndex = index % 2 ? 2 : 1
        const prevEndOne = newData?.[index - minusIndex]?.[4] ?? prevDate
        const prevEndTwo = newData?.[index - minusIndex - 1]?.[4] ?? prevDate
        if (prevEndOne >= prevEndTwo) {
          prevDate = prevEndOne
        } else {
          prevDate = prevEndTwo
        }
      }

      newData.push(prevData)
      if (newData[index][2] != 0) {
        const date = new Date(prevDate)
        date.setDate(date.getDate() + 1);
        newData[index][3] = date.toISOString()
        date.setDate(date.getDate() + Number(newData[index][2]-1));
        newData[index][4] = date.toISOString()
      } else {
        newData[index][3] = ''
        newData[index][4] = ''
      }
    })

    setData(newData)
  }

  useEffect(() => {
    onChangeDate()
  }, [start])

  const onChange = (prevData, idxr, idxc, value) => {
    const row = prevData[idxr];

    row[idxc] = value;

    if (!row[3]) {
      const tempDate = new Date(Date.now());
      row[3] = tempDate.toISOString().slice(0, 10);
    }

    const date = new Date(row[3]);
    date.setDate(date.getDate() + Number(row[2]) - 1);
    row[4] = date.toISOString()

    if (Number(row[2]) === 0) {
      row[3] = row[4] = "";
    }

    prevData[idxr] = row;
    onChangeDate(prevData.slice())
  };

  const director = data.reduce((p, n, i) => p + Number(!(i % 2) ? n[2] : 0), 0);
  const proger = data.reduce((p, n, i) => p + Number(i % 2 ? n[2] : 0), 0);

  useEffect(() => {
    dispatch(actions.setDirectorDay(director));
    dispatch(actions.setProgerDay(proger));
  }, [data]);

  return (
    <div>
      <div className="box">
        <span className="has-text-weight-bold">Итого:</span>
        <br />
        <span>Руководитель: </span>
        <span>{director} дней</span>
        <br />
        <span>Программист: </span>
        <span>{proger} дней</span>
        <br />
        <div style={{display: 'flex'}}>
          <span>Дата начала: </span>
          <input
            key={`key-qwe`}
            style={{width: 130, marginLeft: 10}}
            className="input is-small"
            type="date"
            onChange={(event) => setStart(event.target.value)}
            defaultValue={start.toLocaleString("ru").slice(0, 10)}
          />
        </div>
      </div>
      <Table
        head={head}
        height={50}
        body={data}
        updateData={onChange}
        setting={setting}
      />
    </div>
  );
};

export default StagePlanning;
