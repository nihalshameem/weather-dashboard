import styled from "styled-components";

export const WeatherDashboardWrapper = styled.div`
  .input-group {
    box-shadow: 4px 4px 10px rgb(7 7 7);
  }
  .city-card {
    cursor: pointer;
    margin: 20px 0;
    transition: 0.3s;
    &:hover {
      transform: scale(1.03);
    }
  }
`;
