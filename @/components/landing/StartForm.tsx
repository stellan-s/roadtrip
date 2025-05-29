import { Form } from "@remix-run/react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export function StartForm({ lang }: { lang: "sv" | "en" | null }) {
  return (
    <div className="px-5 lg:px-80 3xl:px-96">
      <Form action="/bingo">
        <div className="flex flex-col space-y-2">
          <input type="hidden" value={lang ?? "sv"} name="language" />
          <Input
            type="text"
            name="magicword"
            className="border-none text-lg py-6"
            style={{ backgroundColor: "rgba(255,255,255,0.85)" }}
          />
          <Button
                variant="default"
                type="submit"
                className="py-7 space-x-1 font-bold text-base tracking-widest"
              >
            <span>Start</span>
            →
          </Button>
        </div>
      </Form>
    </div>
  );
}