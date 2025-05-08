"use client";

import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ASSExtractor } from "@models/mkv-ass-extraction/ass-extraction";

export function ASS_Extration_UI() {
  const form = useForm();
  const { click } = ASSExtractor();
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [suffix, setSuffix] = useState("");
  const defaultlanguage = "JP";
  const [language, setLanguage] = useState(defaultlanguage);
  const [logtext, setLogtext] = useState("");

  return (
    <Form {...form}>
      <form
        className="space-y-8"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <FormField
          control={form.control}
          name="输入信息"
          render={({ field }) => (
            <FormItem>
              <FormLabel>输入目录</FormLabel>
              <FormControl>
                <Input
                  placeholder="请输入原ass字幕所在的目录"
                  {...field}
                  onChange={(e) => setInput(e.target.value)}
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
              <FormLabel>输出目录</FormLabel>
              <FormControl>
                <Input
                  placeholder="请输入提取后的字幕的输出目录"
                  {...field}
                  onChange={(e) => setOutput(e.target.value)}
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
              <FormLabel>字幕后缀</FormLabel>
              <FormControl>
                <Input
                  placeholder="请输入提取字幕的后缀"
                  {...field}
                  onChange={(e) => setSuffix(e.target.value)}
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
              <RadioGroup
                className="flex flex-col space-y-1"
                onValueChange={(value) => setLanguage(value)}
              >
                <FormLabel className="font-normal">选择语言</FormLabel>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="chs" />
                  </FormControl>
                  <FormLabel className="font-normal">CHS</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="jp" />
                  </FormControl>
                  <FormLabel className="font-normal">JP</FormLabel>
                </FormItem>
              </RadioGroup>
            </FormItem>
          )}
        />
        <Button
          onClick={async () =>
            click(
              input,
              output,
              suffix,
              language,
              (log) => setLogtext((prev) => prev + log) // 实时更新日志
            )
          }
        >
          提交
        </Button>
        <FormField
          control={form.control}
          name="日志信息"
          render={({ field }) => (
            <FormItem>
              <FormLabel>日志</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="日志记录..."
                  className="logtext"
                  {...field}
                  value={logtext}
                  maxLength={10}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button onClick={() => setLogtext("")}>清空</Button>
      </form>
    </Form>
  );
}
