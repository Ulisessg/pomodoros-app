"use client";
import { ProjectsCtx } from "@/context/ProjectsCtx";
import { TaskCtx } from "@/context/TaskCtx";
import useGetProjectId from "@/hooks/useGetProjectId";
import useGetTaskDataFromUrl from "@/hooks/useGetTaskDataFromUrl";
import { IProject } from "@/models/project/Project";
import { Link, theme } from "d-system";
import { usePathname } from "next/navigation";
import React, { FC, use, useMemo } from "react";
import styled from "styled-components";

const Sitemap = () => {
  const path = usePathname();

  if (path === "/" || path.match(/^\/auth/g)) {
    return null;
  }
  if (path.match(/^\/project\/\d+$/g)) {
    return <ProjectSitemap />;
  }
  if (path.match(/^\/project\/\d+\/settings$/g)) {
    return <ProjectSettingsSitemap />;
  }

  if (path.match(/^\/project\/\d+\/settings\/edit-stages$/g)) {
    return <EditWorkFlowSitemap />;
  }
  if (path.match(/^\/task+/g)) {
    return <TaskSitemap />;
  }
  return <div>Sitemap</div>;
};

const ProjectSitemap = () => {
  const projectId = useGetProjectId();
  const { projects } = use(ProjectsCtx);
  const projectName = useMemo(() => {
    if (projects.length === 0) return "";
    return (projects.find((project) => project.id === projectId) as IProject)
      .name;
  }, [projectId, projects]);
  return (
    <LinksContainer>
      <SiteLink href="/" linkText="Proyectos" />
      <CurrentPageText>{projectName}</CurrentPageText>
    </LinksContainer>
  );
};

const TaskSitemap = () => {
  const { projectId, taskIndex, stageId } = useGetTaskDataFromUrl();
  const { projects } = use(ProjectsCtx);
  const { tasks } = use(TaskCtx);
  const projectName = useMemo(() => {
    if (projects.length === 0) return "";
    return (projects.find((project) => project.id === projectId) as IProject)
      .name;
  }, [projectId, projects]);
  const taskName = useMemo(() => {
    return tasks[stageId][taskIndex]?.name;
  }, [taskIndex, tasks, stageId]);

  return (
    <LinksContainer>
      <SiteLink href="/" linkText="Proyectos" />
      <SiteLink href={`/project/${projectId}`} linkText={`${projectName}`} />
      <CurrentPageText>{taskName}</CurrentPageText>
    </LinksContainer>
  );
};

const ProjectSettingsSitemap = () => {
  const projectId = useGetProjectId();
  const { projects } = use(ProjectsCtx);

  const projectName = useMemo(() => {
    if (projects.length === 0) return "";
    return (projects.find((project) => project.id === projectId) as IProject)
      .name;
  }, [projectId, projects]);
  return (
    <LinksContainer>
      <SiteLink href="/" linkText="Proyectos" />
      <SiteLink href={`/project/${projectId}`} linkText={`${projectName}`} />
      <CurrentPageText>Configuración</CurrentPageText>
    </LinksContainer>
  );
};

const EditWorkFlowSitemap = () => {
  const projectId = useGetProjectId();
  const { projects } = use(ProjectsCtx);

  const projectName = useMemo(() => {
    if (projects.length === 0) return "";
    return (projects.find((project) => project.id === projectId) as IProject)
      .name;
  }, [projectId, projects]);
  return (
    <LinksContainer>
      <SiteLink href="/" linkText="Proyectos" />
      <SiteLink href={`/project/${projectId}`} linkText={`${projectName}`} />
      <SiteLink
        href={`/project/${projectId}/settings`}
        linkText="Configuraciones"
      />
      <CurrentPageText>Editar flujo de trabajo</CurrentPageText>
    </LinksContainer>
  );
};

const SiteLink: FC<SiteLinkProps> = ({ linkText, href }) => {
  return (
    <SiteLinkContainer>
      <LinkStyles href={href} text={linkText} />
      <LinkDivisorStyles>{">"}</LinkDivisorStyles>
    </SiteLinkContainer>
  );
};

const LinksContainer = styled.div`
  width: 100%;
  margin-top: ${theme.spacing * 3}px;
  & a {
    color: blue;
  }
  display: flex;
`;

const linkFontSize = `${theme.spacing * 2}px`;

const SiteLinkContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LinkDivisorStyles = styled.p`
  color: blue;
  font-weight: bold;
  margin-right: ${theme.spacing}px;
  font-size: ${linkFontSize};
`;

const LinkStyles = styled(Link)`
  margin-right: ${theme.spacing}px;
  font-size: ${linkFontSize};
`;

const CurrentPageText = styled.p`
  align-self: center;
  font-size: ${linkFontSize};
`;

interface SiteLinkProps {
  href: string;
  linkText: string;
}

export default Sitemap;
