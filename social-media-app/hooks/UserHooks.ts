import { AxiosResponse } from "axios";
import { Axios } from "@/data/httpClient";
import { API_ENDPOINTS } from "@/data/api-endpoints-backend";
import useSWR, { mutate } from "swr";
import { SWR_KEYS } from "@/data/swrKeys";
import { CreateUser, UpdateUser, UserDetailsDto } from "@/types/User";
import { DeleteResponseDto } from "@/types/Common";

interface UseGetUserResponse {
  data: any;
  error: any;
  isLoading: boolean;
  revalidateUser: () => void;
}

interface UseGetAllUsersResponse {
  data : any;
  error: any;
  isLoading: boolean;
  revalidateUsers: () => void;
}

export const useGetUser = (id?: string): UseGetUserResponse => {
  const getUserDetails = async (id: string): Promise<UserDetailsDto | undefined> => {
    try {
      const res: AxiosResponse<UserDetailsDto> = await Axios.get(`${API_ENDPOINTS.USER_GET}${id}`);
      return res.data;
    } catch (error) {
      console.error("Error fetching user details:", error);
      throw error;
    }
  };

  const revalidateUser = (): void => {
    mutate(`${SWR_KEYS.USER_GET_KEY}/${id}`);
  };

  const { data, error, isLoading } = useSWR(
    id ? `${SWR_KEYS.USER_GET_KEY}/${id}` : null,
    () => getUserDetails(id || ""),
    {
      refreshInterval: 90000,
      revalidateIfStale: true,
      revalidateOnFocus: true,
      revalidateOn: true,
      revalidateOnReconnect: true,
    }
  );

  return { data, error, isLoading, revalidateUser };
};

export const useGetAllUsers = () : UseGetAllUsersResponse => {
  const getAllUserDetials = async () : Promise<UserDetailsDto[]> => {
    try {
      const res: AxiosResponse<UserDetailsDto[]> = await Axios.get(`${API_ENDPOINTS.USER_GET_ALL}`)
      return res.data;
    }catch(error) {
      console.log("Error fetching user details list", error)
      throw error;
    }
  };

 const revalidateUsers = () : void => {
  mutate(`${SWR_KEYS.USER_GET_ALL_KEY}`);
 }

 const { data, error, isLoading } = useSWR(
 `${SWR_KEYS.USER_GET_ALL_KEY}`,
  () => getAllUserDetials(),
  {
    refreshInterval: 90000,
    revalidateIfStale: true,
    revalidateOnFocus: true,
    revalidateOn: true,
    revalidateOnReconnect: true,
  }
);
return { data, error, isLoading, revalidateUsers };
}


export const useCreateUser = () => {

  const createUserDetails = async (data: CreateUser): Promise<UserDetailsDto> => {
    try {
      const res: AxiosResponse<UserDetailsDto> = await Axios.post(`${API_ENDPOINTS.AUTH_REGISTER}`, data);
      return res.data;
    } catch (error) {
      console.error("Error creating user", error);
      throw error;
    }
  };

  const revalidateUser = async (data: CreateUser): Promise<void> => {
    try {
      await createUserDetails(data);
      mutate(`${SWR_KEYS.USER_CREATE_KEY}`);
    } catch (error) {
      console.error("Error revalidating user", error);
      throw error;
    }
  };

  return { revalidateUser };
};


export const useUpdateUser = () => {

  const updateUserDetails = async (data: UpdateUser): Promise<UserDetailsDto> => {
    try {
      const res: AxiosResponse<UserDetailsDto> = await Axios.put(`${API_ENDPOINTS.USER_UPDATE}`, data);
      return res.data;
    } catch (error) {
      console.error("Error updating user", error);
      throw error;
    }
  };

  const revalidateUser = async (data: UpdateUser): Promise<void> => {
    try {
      await updateUserDetails(data);
      mutate(`${SWR_KEYS.USER_UPDATE_KEY}`);
    } catch (error) {
      console.error("Error revalidating user", error);
      throw error;
    }
  };

  return { revalidateUser };
};


export const useDeletUser = () => {

  const deleteUserDetails = async (id : string): Promise<DeleteResponseDto> => {
    try {
      const res: AxiosResponse<DeleteResponseDto> = await Axios.delete(`${API_ENDPOINTS.USER_DELETE}/${id}`);
      return res.data;
    } catch (error) {
      console.error("Error deleting user", error);
      throw error;
    }
  };

  const revalidateUser = async (id : string): Promise<void> => {
    try {
      await deleteUserDetails(id);
      mutate(`${SWR_KEYS.USER_DELETE_KEY}`);
    } catch (error) {
      console.error("Error revalidating user", error);
      throw error;
    }
  };

  return { revalidateUser };
};
