import { Card } from "@/components/ui/card";

interface ProfileCardProps {
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  usageDays: number;
}

export const ProfileCard = ({ firstName, lastName, email, usageDays }: ProfileCardProps) => {
  return (
    <Card className="p-6">
      <div className="space-y-2">
        <p className="text-lg">Nome: {firstName} {lastName}</p>
        <p className="text-lg">Email: {email}</p>
        <p className="text-lg">Dias de uso: {usageDays}</p>
      </div>
    </Card>
  );
};