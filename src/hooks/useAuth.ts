import { useAppSelector } from "store/hook";


export const useAuth = () => {
    const users = useAppSelector(state => state.users.usersList)
    console.log(users);
        
}