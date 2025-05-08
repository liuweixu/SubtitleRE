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
import { ASS_StyleProcess } from "@models/ass-process/ass-style-process";

export function ASS_Style_UI() {
  const form = useForm();
  const { click } = ASS_StyleProcess();
  //获取输入框的目录地址
  const [input_dir, setInput_dir] = useState("");
  const [suffix, setSuffix] = useState("");
  const [stylename, setStyleName] = useState("");
  const [styleinformation, setStyleInformation] = useState("");
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
                  onChange={(e) => setInput_dir(e.target.value)}
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
              <FormLabel>后缀</FormLabel>
              <FormControl>
                <Input
                  placeholder="请输入ass字幕的后缀，例如：.sc.ass"
                  {...field}
                  onChange={(e) => setSuffix(e.target.value)}
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
              <FormLabel>样式名称</FormLabel>
              <FormControl>
                <Input
                  placeholder="请输入修改的样式名称"
                  {...field}
                  onChange={(e) => setStyleName(e.target.value)}
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
              <FormLabel>样式信息</FormLabel>
              <FormControl>
                <Input
                  placeholder="请输入修改后的字体名称"
                  {...field}
                  onChange={(e) => setStyleInformation(e.target.value)}
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          onClick={async () =>
            //必须使用异步函数，否则日志无法显示
            await click(input_dir, suffix, stylename, styleinformation, (log) =>
              setLogtext((prev) => prev + log)
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
