import { IconHeart } from '@tabler/icons-react';
import { ActionIcon, Badge, Button, Card, Group, Image, Text } from '@mantine/core';
import classes from './CardItem.module.css';
import '@mantine/core/styles.css';


interface CardItemProps {
  id: number;
  title: string;
  price: number;
  discountPercentage: number;
  thumbnail: string;
  brand: string;
}

const CardItem: React.FC<CardItemProps> = ({ title, brand, discountPercentage, price, thumbnail }) => {

  return (
    <>
      <Card withBorder radius="md" p="md" shadow="sm" className={classes.card}>
        <Card.Section>
          <Image src={thumbnail} alt={title} width={250} height={180} />
        </Card.Section>

        <Card.Section className={classes.section} mt="md">
          <div style={{ height: 140 }}>
            <Group justify="apart">
              <Text fz="lg" fw={500}>
                {title}
              </Text>
              <Badge size="sm" variant="light">
                -{discountPercentage}%
              </Badge>
            </Group>
            <Text fz="sm" mt="xs">
              {brand}
            </Text>
            <Group gap={7} mt={1}>
              ${price}
            </Group>
          </div>
        </Card.Section>

        <Group mt="xs">
          <Button radius="md" style={{ flex: 1 }}>
            Show details
          </Button>
          <ActionIcon variant="default" radius="md" size={36}>
            <IconHeart className={classes.like} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Card>

    </>
  )
}

export { CardItem }


