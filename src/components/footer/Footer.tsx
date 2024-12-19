import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram } from '@tabler/icons-react'
import { ActionIcon } from '@mantine/core'
import { Flex } from '@mantine/core';

const Footer = () => {
  

  return (
    <Flex align='center' justify='center' w='100%'>
      <Flex w='90%' align='center' justify='space-around'>
        <div style={{fontFamily: 'Sans-serif', fontSize: 32}}>Dummy JSON</div>
        <Flex gap={10} justify='space-around'>
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandTwitter size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandYoutube size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandInstagram size={18} stroke={1.5} />
          </ActionIcon>
        </Flex>
      </Flex>
    </Flex>
    
  );
}

export { Footer }