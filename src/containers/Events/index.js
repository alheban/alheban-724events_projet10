import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  // Filtrer les événements en fonction du type sélectionné
  const filteredEvents = (
    (!type
      ? data?.events || [] // Afficher tous les événements si aucun type n'est sélectionné
      : data?.events.filter((event) => event.type === type)) || []
  );

  // Calculer le nombre total de pages
  const pageNumber = Math.ceil(filteredEvents.length / PER_PAGE);

  // Afficher la pagination uniquement si nécessaire
  const shouldDisplayPagination = filteredEvents.length > PER_PAGE;

  const changeType = (evtType) => {
    setCurrentPage(1); // Réinitialiser la page lors du changement de type
    setType(evtType);
  };
  return (
    <>

      {error && <div data-testid="errormessage" >An error occurred</div>}
      {data === null ? (
        "loading"
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={Array.from(new Set(data?.events.map((event) => event.type)))}
            onChange={(value) => (value ? changeType(value) : setType(null))}
          />
          <div id="events" className="ListContainer">
            {filteredEvents
              .slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE)
              .map((event) => (
                <Modal key={event.id} Content={<ModalEvent event={event} />}>
                  {({ setIsOpened }) => (
                    <EventCard
                      onClick={() => setIsOpened(true)}
                      imageSrc={event.cover}
                      title={event.title}
                      date={new Date(event.date)}
                      label={event.type}
                      
                    />
                  )}
                </Modal>
              ))}
          </div>
          {/* Afficher la pagination uniquement si nécessaire */}
          {shouldDisplayPagination && (
            <div className="Pagination">
              {[...Array(pageNumber)].map((_, n) => (
                <a
                key={`page-${n + 1}`}
                  href="#events"
                  onClick={() => setCurrentPage(n + 1)}
                  className={currentPage === (n + 1) ? 'active' : ''}
                >
                  {n + 1}
                </a>
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default EventList;