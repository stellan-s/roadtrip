import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { MetaFunction } from "@remix-run/node";
import { Form } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Roadtrip bingo" },
    { name: "description", content: "This is Roadtrip Bingo" },
  ];
};

export default function Index() {
  return (
    <div className="h-screen border flex items-center justify-center">
      <div className="m-auto px-2">
        <h1>Skriv in ett ord för att skapa din bingobricka</h1>
        <Form action="/bingo">
          <div className="flex flex-col space-y-2">
            <Input type="text" name="magicword" className="border" />
            <Button variant="default" type="submit">
              Kör!
            </Button>
          </div>
          <span className="text-xs">
            Använd samma ord om du vill återvända till en identisk bricka!
          </span>
        </Form>
      </div>
    </div>
  );
}
