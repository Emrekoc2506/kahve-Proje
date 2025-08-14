import { useState } from 'react';
import styled from 'styled-components';

type FilterButtonsProps = {
  onCategorySelect: (category: string) => void;
};

const keywords = [
  "Caramel Macchiato", "Latte Macchiato", "Espresso Macchiato", "Flat White",
  "Espresso", "Espresso con Panna", "Americano", "Ristretto", "Caffe Latte"
];

const sidebar = ({ onCategorySelect }: FilterButtonsProps) => {
  const [active, setActive] = useState<string>("");

  const handleCategoryClick = (keyword: string) => {
    if (active === keyword) {
      // Aynı kategoriye tekrar tıklarsa iptal et
      setActive("");
      onCategorySelect(""); // tüm ürünleri göster
    } else {
      setActive(keyword);
      onCategorySelect(keyword);
    }
  };

  return (
    <StyledWrapper>
      <div className="tabs">
        {keywords.map((keyword, index) => (
          <div className="tab-group" key={index}>
            <input
              id={`tab${index}`}
              name="tab"
              type="checkbox"
              checked={active === keyword}
              onChange={() => handleCategoryClick(keyword)}
            />
            <label className="label-default" htmlFor={`tab${index}`}>
              <span>{keyword}</span>
            </label>
          </div>
        ))}
      </div>
    </StyledWrapper>
  );
}
const StyledWrapper = styled.div`
  /* min-height: 100vh;  <-- Bu satırı kaldırın veya yoruma alın */
  /* display: flex;     <-- Bu satırı kaldırın veya yoruma alın */
  /* justify-content: center; <-- Bu satırı kaldırın veya yoruma alın */
  /* align-items: center; <-- Bu satırı kaldırın veya yoruma alın */

  /* Yalnızca yatayda ortalamak isterseniz aşağıdaki gibi bırakabilirsiniz */
  display: flex;
  justify-content: center;
  /* align-items: flex-start;  // Veya eğer üste hizalamak isterseniz */

  /* İsteğe bağlı: Üstten boşluk bırakmak için margin-top ekleyebilirsiniz */
  margin-top: 20px; /* Örnek değer, header yüksekliğinize göre ayarlayın */

  .tabs {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }

  .tab-group input {
    appearance: none;
  }

  .tab-group label {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;
    height: 48px;
    line-height: 1.6;
    border: 1px solid #cccccc;
    border-radius: 12px;
    cursor: pointer;
    font-weight: 700;
    position: relative;
    background-color: transparent;
    transition: all 0.48s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .tab-group label::after {
    content: "";
    position: absolute;
    bottom: -32px;
    left: 50%;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #aa7015;
    transform: translateX(-50%);
    scale: 0;
    opacity: 0;
    z-index: -1;
    transition: all 0.48s 0.2s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .tab-group label::before {
    content: "";
    position: absolute;
    top: -24px;
    left: 50%;
    width: 200px;
    height: 48px;
    border-radius: 12px;
    background-color: #aa7015;
    transform: translate(-50%, -50%);
    z-index: -1;
    opacity: 0;
    scale: 0;
    transition: all 0.48s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .tab-group label:hover {
    border-color: #aa7015;
    color: #aa7015;
  }

  .tab-group input:checked + label {
    border-color: transparent;
    color: #ffffff;
    scale: 1.1;
  }

  .tab-group input:checked + label::after {
    bottom: -16px;
    opacity: 1;
    scale: 1;
    box-shadow:
      0rem 6px 13px rgba(10, 60, 255, 0.1),
      0rem 24px 24px rgba(10, 60, 255, 0.09),
      0rem 55px 33px rgba(10, 60, 255, 0.05),
      0rem 97px 39px rgba(10, 60, 255, 0.01),
      0rem 152px 43px rgba(10, 60, 255, 0);
  }

  .tab-group input:checked + label::before {
    opacity: 1;
    scale: 1;
    top: 50%;
    box-shadow:
      0rem 6px 13px rgba(10, 60, 255, 0.1),
      0rem 24px 24px rgba(10, 60, 255, 0.09),
      0rem 55px 33px rgba(10, 60, 255, 0.05),
      0rem 97px 39px rgba(10, 60, 255, 0.01),
      0rem 152px 43px rgba(10, 60, 255, 0);
  }
`;

export default sidebar;