import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

interface ReviewCardProps {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  comment: string;
}

export default function ReviewCard({
  id,
  userName,
  userAvatar,
  rating,
  date,
  comment
}: ReviewCardProps) {
  const initials = userName.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <Card data-testid={`card-review-${id}`}>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Avatar>
            <AvatarImage src={userAvatar} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold" data-testid={`text-reviewer-${id}`}>
                {userName}
              </h4>
              <span className="text-sm text-muted-foreground" data-testid={`text-date-${id}`}>
                {date}
              </span>
            </div>
            <div className="flex items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-foreground" data-testid={`text-comment-${id}`}>
              {comment}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
