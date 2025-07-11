'use client';

import { Image } from "@heroui/image";
import { Button } from "@heroui/button";
import {
  Card as HeroUICard,
  CardHeader,
  CardBody,
  CardFooter,
} from "@heroui/card";

export const Card = ({
  name,
  description,
  imgsrc,
  price,
  btnlabel,
  onclick,
}: {
  name: string;
  description: string;
  imgsrc: string;
  price: string;
  btnlabel: string;
  onclick: Function;
}) => {
  return (
    <HeroUICard className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">{name}</p>
        <small className="text-default-500">{description}</small>
        <h4 className="font-bold text-large">{price} SOL</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src={imgsrc}
          width={270}
        />
        <CardFooter className="justify-between before:bg-white/50 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-4 w-11/12 shadow-small z-10">
          <Button
            className="text-medium text-white bg-black/50"
            color="default"
            radius="lg"
            size="sm"
            variant="flat"
            onClick={onclick}
          >
            {btnlabel}
          </Button>
        </CardFooter>
      </CardBody>
    </HeroUICard>
  );
};
