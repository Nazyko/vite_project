import { Button, Flex, Input, Text } from "@mantine/core"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { useState } from "react";
import { loginUser } from "../store/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.auth);

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(loginUser({ username, password }));
    if (loginUser.fulfilled.match(result)) {
        navigate('/carts'); 
    }
};
  
  return (
    <Flex style={{height: '60vh'}} align='center' justify='center'>
      <form style={{width: 400}}>
        <Text ta="center" size='xl' mb={20}>Authorization</Text>
        <Flex direction='column' gap={10}>
        	<Input 
				value={username}
				onChange={(e) => setUsername(e.target.value)}
		  		radius="md"
				placeholder="Enter email..." 
			/>
          	<Input 
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				radius="md" 
				 
				placeholder="Enter password..." 
			/>
          <Text ml={10}>or <Link to='/registration'>register</Link></Text>
        </Flex>
        <Button onClick={handleSubmit} mt={20}>Log in</Button>
		{error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </Flex>
  )
}

export default Login
