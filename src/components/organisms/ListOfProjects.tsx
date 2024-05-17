import { ProjectsCtx } from "@/context/ProjectsCtx";
import { FC, Fragment, useContext } from "react";
import styled from "styled-components";
import { DetailCard, theme } from "d-system";

const ListOfProjects: FC = () => {
  const { projects } = useContext(ProjectsCtx);

  return (
    <ListOfProjectsContainer data-list-of-projects>
      {projects.map((proj) => (
        <Fragment key={proj.id}>
          <DetailCard
            link={`/project/${proj.id}`}
            title={proj.name}
            description={proj.description}
          />
        </Fragment>
      ))}
    </ListOfProjectsContainer>
  );
};

const ListOfProjectsContainer = styled.div`
  margin-bottom: ${theme.spacing * 8}px;
  display: grid;
  justify-content: center;
  height: 100%;
  gap: 20px;
  grid-template-columns: 1fr;
  justify-items: center;
  @media screen and (min-width: 769px) {
    grid-template-columns: 1fr 1fr;
  }
  @media screen and (min-width: 1201px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

export default ListOfProjects;
