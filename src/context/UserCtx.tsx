import UserFrontend from "@/models/user/UserFrontend";
import { Title } from "d-system";
import { FC, ReactNode, createContext, useEffect, useState } from "react";
import { useSessionContext } from "supertokens-auth-react/recipe/session";

const initialState: State = {
	userName: "",
	userInfoIsLoading: true,
	errorGettingUserInfo: false,
	userId: "",
};

export const UserCtx = createContext(initialState);

const User = new UserFrontend();

export const UserCtxProvider: FC<Props> = ({ children }) => {
	const session = useSessionContext();
	const [userName, setUsername] = useState<State["userName"]>(
		initialState.userName
	);
	const [userId, setUserId] = useState<State["userId"]>("");
	const [userInfoIsLoading, setUserInfoIsLoading] =
		useState<State["userInfoIsLoading"]>(true);
	const [errorGettingUserInfo, setErrorGettingUserInfo] =
		useState<boolean>(false);

	const getUser = async () => {
		try {
			const userInfo = await User.getUser();
			setUsername(userInfo.user_name);
			setUserId(userInfo.user_id);
			setErrorGettingUserInfo(false);
		} catch (error) {
			setErrorGettingUserInfo(true);
		} finally {
			setUserInfoIsLoading(false);
		}
	};

	useEffect(() => {
		if (!session.loading) {
			void getUser();
		}
	}, [session]);

	return (
		<UserCtx.Provider
			value={{
				errorGettingUserInfo,
				userInfoIsLoading,
				userName,
				userId,
			}}
		>
			{errorGettingUserInfo && (
				<Title>Ocurrió un error obteniendo la informacion del usuario</Title>
			)}
			{!errorGettingUserInfo && children}
		</UserCtx.Provider>
	);
};

interface Props {
	children: ReactNode;
}

interface State {
	userName: string;
	// From supertokens
	userId: string;
	userInfoIsLoading: boolean;
	errorGettingUserInfo: boolean;
}
