import { Link } from "react-router-dom"
import { Flex, Input, Button, Text } from "@mantine/core"

const Register = () => {
  return (
    <Flex style={{height: '70vh'}} align='center' justify='center'>
    <form style={{width: 400}}>
      <Text size='xl' mb={20} ta='center'>Registration</Text>
      <Flex direction='column' gap={10}>
        <Input radius="md" placeholder="Enter last name" />
        <Input radius="md" placeholder="Enter your name" />
        <Input radius="md" type="email" placeholder="Enter last email" />
        <Input radius="md" type='password' placeholder="Enter your password" />
        <Text ml={10}>Already have an account <Link to='/login'>login</Link></Text>
      </Flex>
      <Button mt={20} style={{marginLeft: 'auto'}}>Submit</Button>
    </form>
  </Flex>
  )
} 

export default Register
