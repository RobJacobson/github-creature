"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  fetchGithubStats,
  generateCreatureImage,
  submitGithubForm,
} from "@/server/ai";

const formSchema = z.object({
  githubProfileUrl: z
    .string()
    .startsWith(
      "https://github.com/",
      "Please enter a valid GitHub profile URL",
    ),
});

export function BugReportForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      githubProfileUrl: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const result = await submitGithubForm(data.githubProfileUrl);
    toast("Github stats:", {
      description: (
        <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
          <code>{JSON.stringify(result, null, 2)}</code>
        </pre>
      ),
      position: "bottom-right",
      classNames: {
        content: "flex flex-col gap-2",
      },
      style: {
        "--border-radius": "calc(var(--radius)  + 4px)",
      } as React.CSSProperties,
    });
  }

  return (
    <Card className="w-full sm:max-w-lg">
      <CardContent>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="githubProfileUrl"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <div className="flex items-center gap-4">
                    <Input
                      {...field}
                      id="form-rhf-demo-github-profile-url"
                      aria-invalid={fieldState.invalid}
                      placeholder="https://github.com/username"
                      autoComplete="off"
                    />
                    <Button className="px-8" type="submit" form="form-rhf-demo">
                      Submit
                    </Button>
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
