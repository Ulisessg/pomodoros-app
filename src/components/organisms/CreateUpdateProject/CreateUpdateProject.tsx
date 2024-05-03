import { Button, Form, Input } from "d-system";
import { FC } from "react";
import styled from "styled-components";
import useCreateUpdateProject from "./useCreateUpdateProject";

const CreateUpdateProject: FC<CreateUpdateProjectProps> = ({
	projectDescription,
	projectName,
}) => {
	const {
		actionMessage,
		onChange,
		onBlur,
		inputsErrors,
		inputsData,
		allowCreateUpdateProject,
		createUpdateProject,
	} = useCreateUpdateProject({
		projectDescription,
		projectName,
	});
	return (
		<CreateUpdateProjectContainer>
			<Form formTitle={actionMessage} onSubmit={(e) => e.preventDefault}>
				<Input
					required
					label="Nombre del proyecto"
					name="projectName"
					maxLength={50}
					minLength={3}
					onChange={onChange}
					onBlur={onBlur}
					inputInvalid={inputsErrors.projectName}
					value={inputsData.projectName}
				/>
				<Input
					name="projectDescription"
					label="Descripcion"
					acceptanceCriteria="(Opcional)"
					onChange={onChange}
					onBlur={onBlur}
					value={inputsData.projectDescription}
				/>
				<Button
					colorMessage="continue"
					size="large"
					text={actionMessage}
					disabled={!allowCreateUpdateProject}
					onClick={createUpdateProject}
				/>
			</Form>
		</CreateUpdateProjectContainer>
	);
};

const CreateUpdateProjectContainer = styled.div`
	width: 100%;
`;

interface CreateUpdateProjectProps {
	projectName?: string;
	projectDescription?: string;
}

export default CreateUpdateProject;
