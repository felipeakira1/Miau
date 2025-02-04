

interface PageContainerProps {
    children: React.ReactNode;
}

export function PageContainer({children} : PageContainerProps) {
    return <Container>{children}</Container>
}

import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;

  .flex {
    display: flex;
    gap: 8px;
  }

  a {
    text-decoration: none;
  }
`;