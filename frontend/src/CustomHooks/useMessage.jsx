import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessages,setLoading } from "../features/messageSlice";


const useMessage = () => {
    const dispatch = useDispatch();
    const { selectedUser } = useSelector((state) => state.user);

    useEffect(()=>{
        const fetchMessages = async () => {
            dispatch(setLoading(true));
            if (selectedUser == null) {
                dispatch(setMessages([]));
                dispatch(setLoading(false));
                return;
            }
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/message/get/${selectedUser._id}`,{
                    withCredentials: true
                })
                dispatch(setMessages(res?.data?.messages));
                dispatch(setLoading(false));
            } catch (error) {
                console.error("Error fetching current user:", error);
                dispatch(setMessages([]));
                dispatch(setLoading(false));
            }
        }
        fetchMessages();
    },[selectedUser, dispatch]);
}

export default useMessage;