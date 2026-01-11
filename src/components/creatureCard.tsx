import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { creatures } from "@/db/schema";

const CreatureCard = ({
  creature,
}: {
  creature: typeof creatures.$inferSelect & {
    image: string;
  };
}) => {
  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>{creature.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <Image
          src={creature.image}
          alt={creature.name}
          width={500}
          height={500}
        />
        <CardDescription>{creature.description}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default CreatureCard;
