import React, { useState } from "react";
import StageCompetitiveness from "../StageCompetitiveness";
import StagePlanning from "../StagePlanning";
import StageDevelop from "../StageDevelop";
import StageMatetial from "../StageMatetial";
import StageExpenses from "../StageExpenses";
import StageExploitation from "../StageExploitation";
import StageTotal from "../StageTotal";
import StageEffect from "../StageEffect";
import StageDeveloping from "../StageDeveloping";
import StageExplotationCoff from "../StageExplotationCoff";
import pdf from "./Spravka.pdf";

const MyModal = ({ open, setOpen }) => (
  <div class={`modal ${open && "is-active"}`}>
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">О программе</p>
        <button
          onClick={() => setOpen(false)}
          class="delete"
          aria-label="close"
        ></button>
      </header>
      <section class="modal-card-body">
        <p>
          Технико-экономическое обоснование (ТЭО) – это анализ, расчет, оценка
          экономической целесообразности осуществления предлагаемого проекта, в
          данном случае – проекта по разработке автоматизированной
          информационной системы. ТЭО основано на сопоставительной оценке затрат
          и результатов, установлении эффективности использования, срока
          окупаемости вложений. Технико-экономическое обоснование является
          необходимым для каждого инвестора исследованием, в ходе подготовки
          которого проводится ряд работ по изучению и анализу всех составляющих
          инвестиционного проекта и разработке сроков возврата вложенных в
          бизнес средств.
        </p>
        <br />
        <p>Лупашко Андрей</p>
        <p>449-2</p>
        <p>© "Lupashko", 2021</p>
      </section>
    </div>
  </div>
);

const App = () => {
  const [page, setPage] = useState(0);
  const [modal, setModal] = useState(false);

  const next = () => {
    setPage((prev) => prev + 1);
  };

  const prev = () => {
    setPage((prev) => prev - 1);
  };

  const pages = [
    {
      title: "Расчет показателя качества балльно-индексным методом",
      component: <StageCompetitiveness />,
    },
    {
      title: "Календарный график выполнения работ",
      component: <StagePlanning />,
    },
    {
      title: "Основная заработная плата разработчиков",
      component: <StageDevelop />,
    },
    { title: "Затраты на материалы", component: <StageMatetial /> },
    {
      title: "Коэффициенты для затрат на разработку",
      component: <StageDeveloping />,
    },
    { title: "Затраты на разработку", component: <StageExpenses /> },
    { title: "Коэффицент эксплуатации", component: <StageExplotationCoff /> },
    { title: "Данные о зарабатной плате", component: <StageExploitation /> },
    { title: "Годовые эксплуатационные затраты", component: <StageTotal /> },
    { title: "Итог", component: <StageEffect /> },
  ];

  const currPage = pages[page];

  return (
    <>
      <div className="app-container">
        <header
          style={{
            height: 50,
            display: "flex",
            justifyContent: "space-between",
            background: "white",
            borderRadius: 5,
            overflow: "hidden",
            alignItems: "center",
            marginBottom: 5,
            paddingLeft: 10,
            paddingRight: 5,
          }}
        >
          <span className="title is-5 m-0">
            Технико-экономическое обоснование проекта
          </span>
          <div>
            <button onClick={() => setModal(true)} className="button">
              О программе
            </button>
            <a
              className="button mh"
              rel="noreferrer"
              target="_blank"
              href="https://www.eulatemplate.com/live.php?token=CclCTuA5qci0mthoVg2WP3uKmqbeqXLo"
            >
              EULA
            </a>
            <a className="button" rel="noreferrer" target="_blank" href={pdf}>
              Справка
            </a>
          </div>
        </header>
        <header className="app-header">
          <button
            disabled={page === 0}
            onClick={prev}
            className="button is-link"
          >
            Назад
          </button>
          <h1 className="title is-5 m-0">{currPage.title}</h1>
          <button
            disabled={page === 9}
            onClick={next}
            className="button is-link"
          >
            Вперед
          </button>
        </header>
        {currPage.component}
      </div>
      <MyModal open={modal} setOpen={setModal} />
    </>
  );
};

export default App;
