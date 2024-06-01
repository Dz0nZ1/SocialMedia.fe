import { AxiosResponse } from "axios";
import { Axios } from "@/data/httpClient";
import { API_ENDPOINTS } from "@/data/api-endpoints-backend";
import useSWR, { mutate } from "swr";
import { SWR_KEYS } from "@/data/swrKeys";
import { CreatePost, PostDetailsDto, UpdatePost } from "@/types/Post";
import { DeleteResponseDto } from "@/types/Common";

interface UseGetPostResponse {
    data: any;
    error: any;
    isLoading: boolean;
    revalidatePost: () => void;
  }
  
  interface UseGetAllPostsResponse {
    data : any;
    error: any;
    isLoading: boolean;
    revalidatePost: () => void;
  }


  export const useGetPost = (id?: string): UseGetPostResponse => {
    const getPostDetails = async (id: string): Promise<PostDetailsDto | undefined> => {
      try {
        const res: AxiosResponse<PostDetailsDto> = await Axios.get(`${API_ENDPOINTS.POST_GET}${id}`);
        return res.data;
      } catch (error) {
        console.error("Error fetching post details:", error);
        throw error;
      }
    };
  
    const revalidatePost = (): void => {
      mutate(`${SWR_KEYS.POST_GET_KEY}/${id}`);
    };
  
    const { data, error, isLoading } = useSWR(
      id ? `${SWR_KEYS.POST_GET_KEY}/${id}` : null,
      () => getPostDetails(id || ""),
      {
        refreshInterval: 90000,
        revalidateIfStale: true,
        revalidateOnFocus: true,
        revalidateOn: true,
        revalidateOnReconnect: true,
      }
    );
  
    return { data, error, isLoading, revalidatePost };
  };
  
  export const useGetAllPosts = () : UseGetAllPostsResponse => {
    const getAllPostDetials = async () : Promise<PostDetailsDto[]> => {
      try {
        const res: AxiosResponse<PostDetailsDto[]> = await Axios.get(`${API_ENDPOINTS.POST_GET_ALL}`)
        return res.data;
      }catch(error) {
        console.log("Error fetching post details list", error)
        throw error;
      }
    };
  
   const revalidatePost = () : void => {
    mutate(`${SWR_KEYS.POST_GET_ALL_KEY}`);
   }
  
   const { data, error, isLoading } = useSWR(
   `${SWR_KEYS.POST_GET_ALL_KEY}`,
    () => getAllPostDetials(),
    {
      refreshInterval: 90000,
      revalidateIfStale: true,
      revalidateOnFocus: true,
      revalidateOn: true,
      revalidateOnReconnect: true,
    }
  );
  return { data, error, isLoading, revalidatePost };
  }


  export const useCreatePost = () => {

    const createPostDetails = async (data: CreatePost): Promise<PostDetailsDto> => {
      try {
        const res: AxiosResponse<PostDetailsDto> = await Axios.post(`${API_ENDPOINTS.POST_CREATE}`, data);
        return res.data;
      } catch (error) {
        console.error("Error creating post", error);
        throw error;
      }
    };
  
    const revalidatePost = async (data: CreatePost): Promise<void> => {
      try {
        await createPostDetails(data);
        mutate(`${SWR_KEYS.POST_CREATE_KEY}`);
      } catch (error) {
        console.error("Error revalidating post", error);
        throw error;
      }
    };
  
    return { revalidatePost };
  };
  
  
  export const usePostUser = () => {
  
    const updatePostDetails = async (data: UpdatePost): Promise<PostDetailsDto> => {
      try {
        const res: AxiosResponse<PostDetailsDto> = await Axios.put(`${API_ENDPOINTS.POST_UPDATE}`, data);
        return res.data;
      } catch (error) {
        console.error("Error updating post", error);
        throw error;
      }
    };
  
    const revalidatePost = async (data: UpdatePost): Promise<void> => {
      try {
        await updatePostDetails(data);
        mutate(`${SWR_KEYS.POST_UPDATE_KEY}`);
      } catch (error) {
        console.error("Error revalidating post", error);
        throw error;
      }
    };
  
    return { revalidatePost };
  };
  
  
  export const useDeletPost = () => {
  
    const deletePostDetails = async (id : string): Promise<DeleteResponseDto> => {
      try {
        const res: AxiosResponse<DeleteResponseDto> = await Axios.delete(`${API_ENDPOINTS.POST_DELETE}/${id}`);
        return res.data;
      } catch (error) {
        console.error("Error deleting user", error);
        throw error;
      }
    };
  
    const revalidatePost = async (id : string): Promise<void> => {
      try {
        await deletePostDetails(id);
        mutate(`${SWR_KEYS.POST_DELETE_KEY}`);
      } catch (error) {
        console.error("Error revalidating post", error);
        throw error;
      }
    };
  
    return { revalidatePost };
  };