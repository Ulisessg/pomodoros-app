import { IProject } from "@/models/project/Project";
import { FC } from "react";
import styled from "styled-components";
import Link from "next/link";
import { theme } from "d-system";

const Project: FC<ProjectProps> = ({project}) => {
  const projectHasDescription = Boolean(project.description.length > 0)
  return <ProjectContainer>
    <ProjectLink href="#">
      <ProjectData>
        <ProjectTitle>{project.name}{projectHasDescription && ':'}</ProjectTitle>
        {projectHasDescription && <ProjectDescription>
          {
          project
          .description
          .substring(0, 27)}{project.description.length > 27 && '...'}
        </ProjectDescription>}
      </ProjectData>
    </ProjectLink>
  </ProjectContainer >
}

export default Project


const backgroundColor = `background-color: ${theme.colors.dark2};`
const borderRadius = `border-radius: ${theme.spacing}px;`

const ProjectContainer = styled.div`
  width: 100%;
  ${borderRadius}
  font-size: ${theme.spacing * 3}px;
`

const ProjectLink = styled(Link)`
  ${backgroundColor}
  display: flex;
  align-content: center;
  height: ${theme.spacing * 15}px;
  width: 100%;
  color: white;
  ${borderRadius}
  text-decoration: none;
  :hover, :focus {
    box-shadow: ${theme.spacing * 2}px ${theme.spacing * 2}px ${theme.spacing * 2}px -1px rgba(0,0,0,0.1);
    outline: 2px solid ${theme.colors.dark1};
  }
`

const ProjectData = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  ${backgroundColor}
  ${borderRadius}
  padding: ${theme.spacing * 3}px;
  width: 100%;
  & > :hover {
    outline: none;
    box-shadow: none;
  }
`
const ProjectTitle = styled.p`
  font-weight: bold;
`

const ProjectDescription = styled.p`
  font-style: italic;
`

interface ProjectProps {
  project: IProject
}