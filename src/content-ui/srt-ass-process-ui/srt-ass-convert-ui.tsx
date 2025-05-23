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
import { SRTASSConvert } from "@models/srt-ass-process/srt-ass-convert";

export function Srt_Ass_Convert_UI() {
  const form = useForm();
  const { click } = SRTASSConvert();
  //获取输入框的目录地址
  const [input, setInput] = useState("");
  const [suffix, setSuffix] = useState("");
  const [output, setOutput] = useState("");
  const [style, setStyle] = useState("");
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
              <FormLabel>SRT输入目录</FormLabel>
              <FormControl>
                <Input
                  placeholder="请输入SRT字幕所在的目录"
                  {...field}
                  onChange={(e) => setInput(e.target.value)}
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
              <FormLabel>SRT后缀</FormLabel>
              <FormControl>
                <Input
                  placeholder="请输入SRT字幕的后缀，例如：.jp.srt"
                  {...field}
                  onChange={(e) => setSuffix(e.target.value)}
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
              <FormLabel>ASS字幕输出目录</FormLabel>
              <FormControl>
                <Input
                  placeholder="请输入转换后的ASS字幕的输出目录"
                  {...field}
                  onChange={(e) => setOutput(e.target.value)}
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
              <FormLabel>样式信息</FormLabel>
              <FormControl>
                <Input
                  placeholder="请输入目标样式"
                  {...field}
                  onChange={(e) => setStyle(e.target.value)}
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
            await click(input, suffix, output, style, (log) =>
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
