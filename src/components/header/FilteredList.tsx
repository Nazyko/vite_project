import React from 'react'
import { Badge, Card, Group, Image, Text } from '@mantine/core';
import classes from './FilteredList.module.css';
import '@mantine/core/styles.css';

interface FilteredListProps {
  thumbnail: string;
  title: string;
  price: number;
  discountPercentage: number;
}

const FilteredList: React.FC<FilteredListProps> = ({thumbnail, title, price, discountPercentage}) => {

  return (
    <Card withBorder radius="md" className={classes.card}>
      <Card.Section className={classes.imageSection}>
        <Image src={thumbnail} alt={title} />
      </Card.Section>

      <Group mt="md">
        <div style={{height: 85}}>
          <Text fw={500}>{title}</Text>
          <Badge variant="outline">{discountPercentage}% off</Badge>
        </div>
      </Group>

      <Card.Section className={classes.section}>
        <Group gap={30}>
          <div>
            <Text fz="xl" fw={700} style={{ lineHeight: 1 }}>
              ${price}
            </Text>
          </div>
        </Group>
      </Card.Section>
    </Card>
    
  );
};


export { FilteredList } 