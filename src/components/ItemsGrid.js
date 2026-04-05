import { useState } from 'react';
import styled from 'styled-components';
import { Popup } from './popup';
import { useData } from './providers';
import { Card } from './card/Card';

export function ItemsGrid() {
  const { characters } = useData();
  const [popupContent, setPopupContent] = useState({});
  const [isPopupOpen, setPopupOpen] = useState(false);

  function closePopup() {
    setPopupOpen(false);
  }

  function cardOnClickHandler(props) {
    setPopupContent({ ...props });
    setPopupOpen(true);
  }

  if (!characters.length) {
    return null;
  }

  return (
    <Container>
      {characters.map((props) => (
        <Card
          key={props.id}
          onClickHandler={() => cardOnClickHandler(props)}
          {...props}
        />
      ))}

      <Popup content={popupContent} isOpen={isPopupOpen} onClose={closePopup} />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  justify-items: center;
  gap: 30px;
`;
