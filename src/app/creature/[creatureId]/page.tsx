import CreatureCard from "@/components/creatureCard";
import { getCreature } from "@/server/creatures";

type CreaturePageParams = Promise<{ creatureId: string }>;

const CreaturePage = async ({ params }: { params: CreaturePageParams }) => {
  const { creatureId } = await params;
  const creature = await getCreature(creatureId);
  if (!creature) {
    return <div>Creature not found</div>;
  }
  return (
    <div className="flex flex-col items-center justify-center pt-20">
      <CreatureCard creature={creature} />
    </div>
  );
};

export default CreaturePage;
