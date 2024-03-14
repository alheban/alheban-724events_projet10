import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );

  const nextCard = () => {
    if (byDateDesc) {
      setIndex((idx) => (idx < byDateDesc.length - 1 ? idx + 1 : 0));
    }
  };
  const switchCard = (id) => {
    setIndex(id);
  };
  useEffect(() => {
    const timer = setInterval(() => {
      nextCard();
    }, 5000);
    return () => {
      clearInterval(timer);
    };
  }, [index, nextCard]);

  // console.log("byDateDesc:", byDateDesc); // Vérifiez les valeurs de byDateDesc
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div
          key={event.title}
          className={`SlideCard SlideCard--${
            index === idx ? "display" : "hide"
          }`}
        >
          <img
            src={event.cover}
            alt="forum"
          />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              {/* {console.log("Event date:", event.date)} */}
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc?.map((_, radioIdx) => (
            <input
              key={`${_.title}`}
              type="radio"
              name="radio-button"
              checked={index === radioIdx}
              onChange={() => switchCard(radioIdx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
