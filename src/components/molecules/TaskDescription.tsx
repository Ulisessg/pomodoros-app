"use client";
import { theme, useInputs } from "d-system";
import React, { FC, useEffect, useId } from "react";
import styled from "styled-components";
import Markdown from "react-markdown";

const TaskDescription: FC<TaskDescriptionProps> = ({
  initialValue,
  controls,
  editor,
  resetValue,
}) => {
  const editorId = useId();
  const { inputsData, onChange, restartInputs, updateInput } = useInputs(
    {
      description: initialValue || "",
    },
    false
  );

  useEffect(() => {
    if (resetValue) {
      restartInputs("all");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetValue]);
  useEffect(() => {
    if (initialValue) {
      updateInput("description", initialValue);
    }
  }, [initialValue]);
  return (
    <Container controls={controls} editor={editor}>
      {editor && (
        <EditorContainer>
          <label htmlFor={editorId}>
            <LabelText>Descripcion. Puedes usar Markdown</LabelText>
          </label>
          <Editor
            name="description"
            onChange={onChange as any}
            value={inputsData.description}
            spellCheck={false}
            id={editorId}
          />
        </EditorContainer>
      )}
      <MarkDownContainer>
        {editor && <LabelText>Resultado</LabelText>}
        <Markdown>{inputsData.description}</Markdown>
      </MarkDownContainer>

      {controls && (
        <ControlsContainer>
          <p>Show controls</p>
        </ControlsContainer>
      )}
    </Container>
  );
};

const Container = styled.div<{ controls: boolean; editor: boolean }>`
  display: grid;
  max-width: 100%;
  padding: ${theme.spacing * 3}px;
  gap: ${theme.spacing * 3}px;
  height: ${theme.spacing * 40}px;
  overflow: scroll;
  //DEBUG
  border: 1px solid ${theme.colors.dark1};
  border-radius: ${theme.spacing}px;
  grid-template-areas: ${({ editor }) =>
    editor ? "'editor markdown'" : "'markdown'"};
  ${({ controls }) => controls && `'controls controls'`};
`;

const EditorContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Editor = styled.textarea`
  grid-area: editor;
  border-right: 1px solid ${theme.colors.dark1};
  resize: vertical;
  width: 100%;
  height: inherit;
`;

const MarkDownContainer = styled.section`
  grid-area: markdown;
`;

const ControlsContainer = styled.div`
  grid-area: controls;
`;

const LabelText = styled.p`
  font-weight: bold;
  margin-bottom: ${theme.spacing * 3}px;
`;

interface TaskDescriptionProps {
  initialValue?: string;
  // Show edit - update - cancel buttons
  controls: boolean;
  editor: boolean;
  // Execute useInputs.restartInputs('all')
  resetValue: boolean;
}

export default TaskDescription;
