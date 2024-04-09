import User, { IUser } from "./User";
import axiosInstance from "@/utils/axiosInstance";
import { GetUserResponse } from "@/app/api/user/route";

export default class UserFrontend extends User {
	addUser(): Promise<IUser> {
		throw new Error("Method not implemented.");
	}
	async getUser(): Promise<IUser> {
		try {
			const response = await axiosInstance.get<GetUserResponse>("/user");
			return response.data;
		} catch (error) {
			throw error;
		}
	}
}
